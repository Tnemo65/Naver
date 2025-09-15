import { useMemo, useState } from 'react';
import type { Task } from '../types';

type Props = {
  tasks: Task[];
};

// Monthly calendar with navigation
export function CalendarView({ tasks }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth()); // 0-11

  const { cells, year, month, monthTaskCount } = useMemo(() => {
    const year = viewYear;
    const month = viewMonth;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay(); // 0=Sun
    const daysInMonth = lastDay.getDate();

    const cells: Array<{ date?: Date; items: Task[] }> = [];
    let monthTaskCount = 0;
    for (let i = 0; i < startWeekday; i++) cells.push({ date: undefined, items: [] });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const iso = date.toISOString().slice(0, 10);
      const items = tasks.filter(t => t.dueDate === iso);
      monthTaskCount += items.length;
      cells.push({ date, items });
    }
    while (cells.length % 7 !== 0) cells.push({ date: undefined, items: [] });
    return { cells, year, month, monthTaskCount };
  }, [tasks, viewYear, viewMonth]);

  const weekdayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const prevMonth = () => {
    setViewMonth(m => {
      if (m === 0) {
        setViewYear(y => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setViewMonth(m => {
      if (m === 11) {
        setViewYear(y => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="btn secondary" onClick={prevMonth}>Tháng trước</button>
        </div>
        <h3>
          Tháng {month + 1}/{year}
        </h3>
        <div className="calendar-nav" style={{ justifyContent: 'flex-end' }}>
          <button className="btn secondary" onClick={goToday}>Hôm nay</button>
          <button className="btn secondary" onClick={nextMonth} style={{ marginLeft: '.5rem' }}>Tháng sau</button>
        </div>
      </div>
      {monthTaskCount === 0 && (
        <div className="empty-callout" style={{ textAlign: 'center' }}>
          Chưa có nhiệm vụ nào trong tháng này. Hãy thêm nhiệm vụ ở trang Danh sách để hiển thị tại đây.
        </div>
      )}
      <div className="calendar-grid">
        {weekdayLabels.map(w => (
          <div key={w} className="cell head">{w}</div>
        ))}
        {cells.map((c, i) => (
          <div key={i} className={`cell ${c.date ? '' : 'empty'}`}>
            {c.date && (
              <>
                <div className="date-num">{c.date.getDate()}</div>
                <div className="mini-list">
                  {c.items.slice(0, 3).map(t => (
                    <div key={t.id} className={`mini-item ${t.completedAt ? 'done' : ''}`}>{t.title}</div>
                  ))}
                  {c.items.length > 3 && <div className="more">+{c.items.length - 3} nữa</div>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
