import type { Task } from '../types';
import { useState } from 'react';

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  filter?: 'all' | 'pending' | 'done' | 'overdue';
};

export function TaskList({ tasks, onToggle, onUpdate, onDelete, filter = 'all' }: Props) {
  const now = new Date();
  const filtered = tasks.filter(t => {
    if (filter === 'pending') return !t.completedAt;
    if (filter === 'done') return !!t.completedAt;
    if (filter === 'overdue') return !t.completedAt && t.dueDate && new Date(t.dueDate) < now;
    return true;
  });

  return (
    <div className="list">
      {filtered.map((task, index) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
          index={index}
        />
      ))}
      {filtered.length === 0 && (
        <div className="muted">
          {filter === 'all' ? 'Chưa có nhiệm vụ nào. Hãy thêm nhiệm vụ đầu tiên.' 
           : filter === 'done' ? 'Chưa có nhiệm vụ hoàn thành.' 
           : filter === 'overdue' ? 'Không có nhiệm vụ quá hạn.'
           : 'Không có nhiệm vụ đang chờ.'}
        </div>
      )}
    </div>
  );
}

function TaskItem({ task, onToggle, onUpdate, onDelete, index }: {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  index: number;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate ?? '');
  const [description, setDescription] = useState(task.description ?? '');
  const [isDeleting, setIsDeleting] = useState(false);

  const save = () => {
    onUpdate(task.id, { 
      title: title.trim() || task.title, 
      dueDate: dueDate || undefined, 
      description: description.trim() || undefined 
    });
    setEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 200);
  };

  const isOverdue = !task.completedAt && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div 
      className={`item ${task.completedAt ? 'done' : ''} ${isDeleting ? 'deleting' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {editing ? (
        <div className="edit-row">
          <input 
            className="input" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <input 
            className="input" 
            type="date" 
            value={dueDate} 
            onChange={e => setDueDate(e.target.value)} 
          />
          <input 
            className="input" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Mô tả" 
          />
          <button className="btn" onClick={save}>Lưu</button>
          <button className="btn secondary" onClick={() => setEditing(false)}>Huỷ</button>
        </div>
      ) : (
        <div className="view-row">
          <input 
            type="checkbox" 
            checked={!!task.completedAt} 
            onChange={() => onToggle(task.id)} 
          />
          <div className="main">
            <div className="title">{task.title}</div>
            {task.description && <div className="desc">{task.description}</div>}
          </div>
          <div className="meta">
            {task.dueDate && (
              <span className={`due ${isOverdue ? 'overdue' : ''}`}>
                {isOverdue ? 'Quá hạn: ' : 'Hạn: '}{task.dueDate}
              </span>
            )}
            {task.completedAt && <span className="badge">Đã xong</span>}
          </div>
          <div className="actions">
            <button className="btn secondary" onClick={() => setEditing(true)}>Sửa</button>
            <button className="btn danger" onClick={handleDelete}>Xoá</button>
          </div>
        </div>
      )}
    </div>
  );
}
