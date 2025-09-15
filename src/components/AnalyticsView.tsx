import type { Task } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { PieChart, type PieDatum } from './PieChart';

type Props = { tasks: Task[] };

function countBy<T extends string>(items: string[], keys: T[]): Record<T, number> {
  const res = Object.fromEntries(keys.map(k => [k, 0])) as Record<T, number>;
  for (const it of items) if (it in res) res[it as T]++;
  return res;
}

export function AnalyticsView({ tasks }: Props) {
  const [animatedStats, setAnimatedStats] = useState({ total: 0, done: 0, pending: 0, overdue: 0 });
  
  const total = tasks.length;
  const done = tasks.filter(t => t.completedAt).length;
  const pending = total - done;
  const overdue = tasks.filter(t => !t.completedAt && t.dueDate && new Date(t.dueDate) < new Date()).length;

  // Animate numbers on mount/change
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        total: Math.round(total * progress),
        done: Math.round(done * progress),
        pending: Math.round(pending * progress),
        overdue: Math.round(overdue * progress),
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({ total, done, pending, overdue });
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [total, done, pending, overdue]);

  // distribution by weekday of due date
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] as const;
  const weekdayOf = (t: Task) => (t.dueDate ? new Date(t.dueDate + 'T00:00:00').getDay() : -1);
  const weekdayLabels = tasks.map(t => {
    const d = weekdayOf(t);
    return d >= 0 ? weekdays[d] : 'N/A';
  });
  const weekdayCounts = countBy(weekdayLabels as string[], [...weekdays, 'N/A'] as const);

  // bars removed in favor of pie charts

  // Prepare pie data
  const statusData: PieDatum[] = useMemo(() => ([
    { label: 'Đang làm', value: pending, color: '#ffa726' },
    { label: 'Hoàn thành', value: done, color: '#5FF281' },
    { label: 'Quá hạn', value: overdue, color: '#ff6b6b' },
  ]), [pending, done, overdue]);

  const weekdayKeys = [...weekdays, 'N/A'] as const;
  const weekdayData: PieDatum[] = useMemo(() => (
    weekdayKeys.map((k, i) => ({
      label: k,
      value: weekdayCounts[k],
      color: ['#9CCC65','#FFD54F','#4FC3F7','#BA68C8','#FF8A65','#AED581','#F06292','#90A4AE'][i] || '#ccc',
    }))
  ), [weekdayCounts]);

  const EmptyAnalytics = () => (
    <div style={{
      textAlign: 'center',
      background: 'rgba(19, 19, 44, 0.6)',
      border: '1px solid rgba(42,42,64,0.6)',
      borderRadius: 16,
      padding: '2rem',
      backdropFilter: 'blur(10px)'
    }}>
      <h3 style={{ color: '#5FF281', marginBottom: '.6rem' }}>Chưa có dữ liệu thống kê</h3>
      <p style={{ color: '#bbb' }}>Hãy thêm nhiệm vụ ở trang Danh sách hoặc dùng "Tạo dữ liệu mẫu" để xem thống kê trực quan tại đây.</p>
    </div>
  );

  return (
    <div className="analytics">
      <div className="cards">
        <div className="card" style={{ animationDelay: '0.1s' }}>
          <div className="n">{animatedStats.total}</div>
          <div className="lbl">Tổng cộng</div>
        </div>
        <div className="card" style={{ animationDelay: '0.2s' }}>
          <div className="n">{animatedStats.pending}</div>
          <div className="lbl">Đang làm</div>
        </div>
        <div className="card" style={{ animationDelay: '0.3s' }}>
          <div className="n">{animatedStats.done}</div>
          <div className="lbl">Hoàn thành</div>
        </div>
        <div className="card" style={{ animationDelay: '0.4s' }}>
          <div className="n">{animatedStats.overdue}</div>
          <div className="lbl">Quá hạn</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="pie-card">
          <div className="pie-title">Tỷ lệ trạng thái</div>
          <div className="pie-wrap">
            <PieChart data={statusData} size={240} thickness={36} />
            <div className="pie-legend">
              {statusData.map(d => (
                <div className="legend-item" key={d.label}>
                  <span className="dot" style={{ background: d.color }} />
                  <span className="name">{d.label}</span>
                  <span className="val">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pie-card">
          <div className="pie-title">Phân bố theo thứ</div>
          <div className="pie-wrap">
            <PieChart data={weekdayData} size={260} thickness={36} showTotal={false} />
            <div className="pie-legend">
              {weekdayData.map(d => (
                <div className="legend-item" key={d.label}>
                  <span className="dot" style={{ background: d.color }} />
                  <span className="name">{d.label}</span>
                  <span className="val">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {total === 0 ? (
        <EmptyAnalytics />
      ) : (
        <div className="insights" style={{ 
          background: 'rgba(19, 19, 44, 0.6)', 
          padding: '1.5rem', 
          borderRadius: '16px', 
          backdropFilter: 'blur(10px)',
          marginTop: '1rem'
        }}>
          <h3 style={{ color: '#5FF281', marginBottom: '1rem' }}>Thông tin thống kê</h3>
          <div style={{ display: 'grid', gap: '0.5rem', color: '#bbb' }}>
            <div>• Tỷ lệ hoàn thành: <strong style={{color: '#5FF281'}}>{Math.round((done/total)*100)}%</strong></div>
            <div>• Hiệu suất: {overdue === 0 ? 'Xuất sắc! Không có việc quá hạn.' : `Có ${overdue} việc cần chú ý.`}</div>
            <div>• Xu hướng: {pending > done ? 'Đang tích cực thêm việc mới' : 'Đang tập trung hoàn thành'}</div>
          </div>

        </div>
      )}
    </div>
  );
}
