import { useCallback, useEffect, useMemo, useState } from 'react';
import { taskRepo } from './storage';

import type { Task } from './types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => taskRepo.list());

  useEffect(() => {
    // Sync across tabs using storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'nvaih.tasks.v1') setTasks(taskRepo.list());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addTask = useCallback((title: string, dueDate?: string, description?: string) => {
    const t = taskRepo.create({ title, dueDate, description });
    setTasks(prev => [...prev, t]);
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks(prev => {
      const cur = prev.find(t => t.id === id);
      if (!cur) return prev;
      const completedAt = cur.completedAt ? undefined : new Date().toISOString();
      const updated = taskRepo.update({ id, completedAt });
      if (!updated) return prev;
      return prev.map(t => (t.id === id ? updated : t));
    });
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => {
      const updated = taskRepo.update({ id, ...patch });
      if (!updated) return prev;
      return prev.map(t => (t.id === id ? updated : t));
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    taskRepo.delete(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    taskRepo.clearAll();
    setTasks([]);
  }, []);

  const seedDemo = useCallback(() => {
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const plusDays = (n: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + n);
      return fmt(d);
    };
    const samples: Array<{ title: string; dueDate?: string; description?: string }> = [
      { title: 'Ôn tập Giải tích', dueDate: plusDays(1), description: 'Chương 3: Tích phân' },
      { title: 'Chuẩn bị thuyết trình Nhập môn AI', dueDate: plusDays(3), description: 'Slide + demo nhỏ' },
      { title: 'Bài tập Lập trình Web', dueDate: plusDays(0), description: 'React hooks + form' },
      { title: 'Đăng ký học phần', dueDate: plusDays(7) },
      { title: 'Báo cáo Toán rời rạc', dueDate: plusDays(5), description: 'Đồ thị và cây' },
      { title: 'Luyện nói tiếng Anh', dueDate: plusDays(2), description: '30 phút shadowing' },
      { title: 'Tập gym', dueDate: plusDays(0), description: 'Full body 45 phút' },
      { title: 'Viết CV học bổng', dueDate: plusDays(10) },
      { title: 'Ôn thi Xác suất', dueDate: plusDays(6) },
      { title: 'Dọn phòng', dueDate: plusDays(1) },
      { title: 'Hẹn nhóm project', dueDate: plusDays(4), description: 'Chốt scope tuần này' },
      { title: 'Đọc chương 5 CNPM', dueDate: plusDays(8) },
    ];
    const created = samples.map(s => taskRepo.create(s));
    setTasks(prev => [...prev, ...created]);
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => !!t.completedAt).length;
    const pending = total - done;
    const overdue = tasks.filter(t => !t.completedAt && t.dueDate && new Date(t.dueDate) < new Date()).length;
    return { total, done, pending, overdue };
  }, [tasks]);

  return { tasks, addTask, toggleComplete, updateTask, deleteTask, clearAll, stats, seedDemo };
}

export function groupTasksByDate(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce((acc, t) => {
    const key = t.dueDate ?? 'No Due Date';
    acc[key] = acc[key] || [];
    acc[key].push(t);
    return acc;
  }, {} as Record<string, Task[]>);
}
