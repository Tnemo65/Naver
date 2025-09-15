type Props = {
  onSeed: () => void;
};

export function EmptyState({ onSeed }: Props) {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('add-task');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="empty-state">
      <div className="hero">
        <h1 className="hero-title">Quản lý thời gian học tập thông minh</h1>
        <p className="hero-subtitle">
          Tổ chức việc học, deadline, và mục tiêu cá nhân trong một nơi. Chuyển giữa Danh sách, Lịch, và Thống kê để làm chủ tuần học của bạn.
        </p>
        <div className="hero-actions">
          <button className="btn" onClick={onSeed}>Tạo dữ liệu mẫu</button>
          <a className="btn secondary" href="#add-task" onClick={scrollToForm}>Tạo nhiệm vụ mới</a>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Danh sách</h3>
          <p>Quản lý nhiệm vụ nhanh chóng với sửa trực tiếp, đánh dấu xong, và lọc theo trạng thái.</p>
        </div>
        <div className="feature-card">
          <h3>Lịch</h3>
          <p>Nhìn tổng quan tuần/tháng, lên kế hoạch theo hạn chót rõ ràng và trực quan.</p>
        </div>
        <div className="feature-card">
          <h3>Thống kê</h3>
          <p>Theo dõi tiến độ, tỷ lệ hoàn thành và phân bố công việc theo ngày trong tuần.</p>
        </div>
      </div>
    </div>
  );
}
