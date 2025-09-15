import type { Task, TaskUpdate } from './types';

const STORAGE_KEY = 'nvaih.tasks.v1';

function load(): Task[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const data = JSON.parse(raw);
		if (!Array.isArray(data)) return [];
		return data as Task[];
	} catch {
		return [];
	}
}

function save(tasks: Task[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const taskRepo = {
	list(): Task[] {
		return load();
	},
	create(input: Omit<Task, 'id' | 'createdAt'> & { title: string }): Task {
		const now = new Date().toISOString();
		const newTask: Task = {
			id: (crypto as any).randomUUID ? (crypto as any).randomUUID() : Math.random().toString(36).slice(2),
			createdAt: now,
			...input,
		};
		const tasks = load();
		tasks.push(newTask);
		save(tasks);
		return newTask;
	},
	update(patch: TaskUpdate): Task | undefined {
		const tasks = load();
		const idx = tasks.findIndex(t => t.id === patch.id);
		if (idx === -1) return undefined;
		const updated: Task = { ...tasks[idx], ...patch };
		tasks[idx] = updated;
		save(tasks);
		return updated;
	},
	delete(id: string): boolean {
		const tasks = load();
		const next = tasks.filter(t => t.id !== id);
		const changed = next.length !== tasks.length;
		if (changed) save(next);
		return changed;
	},
	clearAll() {
		save([]);
	},
};

export type { Task };

