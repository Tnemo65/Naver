import './App.css'
import { useState } from 'react'
import { useTasks } from './useTasks'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { CalendarView } from './components/CalendarView'
import { AnalyticsView } from './components/AnalyticsView'
import { EmptyState } from './components/EmptyState'

type Tab = 'list' | 'calendar' | 'analytics'

function App() {
  const { tasks, addTask, toggleComplete, updateTask, deleteTask, clearAll, stats, seedDemo } = useTasks()
  const [tab, setTab] = useState<Tab>('list')
  const [filter, setFilter] = useState<'all' | 'pending' | 'done' | 'overdue'>('all')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClearAll = () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true)
      setTimeout(() => setShowClearConfirm(false), 3000)
    } else {
      clearAll()
      setShowClearConfirm(false)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">Student Time Manager</div>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <nav className="side-nav">
            <button className={`side-link ${tab==='list'?'active':''}`} onClick={() => setTab('list')}>Danh sách</button>
            <button className={`side-link ${tab==='calendar'?'active':''}`} onClick={() => setTab('calendar')}>Lịch</button>
            <button className={`side-link ${tab==='analytics'?'active':''}`} onClick={() => setTab('analytics')}>Thống kê</button>
          </nav>
        </aside>

        <div className="page">
          {tab === 'list' && (
            <>
              <section className={`panel ${tasks.length === 0 ? 'compact' : ''}`} id="add-task">
                <TaskForm onAdd={addTask} />
              </section>
              <section className={`toolbar ${tasks.length === 0 ? 'compact' : ''}`}>
                <div className="filters">
                  <label>Lọc:</label>
                  <select value={filter} onChange={e => setFilter(e.target.value as any)}>
                    <option value="all">Tất cả</option>
                    <option value="pending">Chưa xong</option>
                    <option value="done">Đã xong</option>
                    <option value="overdue">Quá hạn</option>
                  </select>
                </div>
                <div className="spacer" />
                <div className="stats">
                  Tổng: {stats.total} • Đã xong: {stats.done} • Quá hạn: {stats.overdue}
                </div>
                {stats.total > 0 && (
                  <button 
                    className={`btn danger ${showClearConfirm ? 'confirm' : ''}`}
                    onClick={handleClearAll}
                  >
                    {showClearConfirm ? 'Xác nhận xoá?' : 'Xoá tất cả'}
                  </button>
                )}
              </section>
              <section>
                {tasks.length === 0 ? (
                  <EmptyState onSeed={seedDemo} />
                ) : (
                  <TaskList tasks={tasks} onToggle={toggleComplete} onUpdate={updateTask} onDelete={deleteTask} filter={filter} />
                )}
              </section>
            </>
          )}

          {tab === 'calendar' && (
            <section>
              <CalendarView tasks={tasks} />
            </section>
          )}

          {tab === 'analytics' && (
            <section>
              <AnalyticsView tasks={tasks} />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default App