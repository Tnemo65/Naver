import type { FormEvent } from 'react';
import { useState } from 'react';

type Props = {
  onAdd: (title: string, dueDate?: string, description?: string) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Add subtle delay for button animation
    setTimeout(() => {
      onAdd(title.trim(), dueDate || undefined, description.trim() || undefined);
      setTitle('');
      setDueDate('');
      setDescription('');
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form onSubmit={submit} className="form">
      <input
        className="input"
        placeholder="Thêm nhiệm vụ mới..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={isSubmitting}
      />
      <input
        className="input"
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        disabled={isSubmitting}
      />
      <input
        className="input"
        placeholder="Mô tả (tuỳ chọn)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={isSubmitting}
      />
      <button 
        className={`btn ${isSubmitting ? 'submitting' : ''}`} 
        type="submit"
        disabled={isSubmitting || !title.trim()}
      >
        {isSubmitting ? 'Đang thêm...' : 'Thêm'}
      </button>
    </form>
  );
}
