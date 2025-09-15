export type PieDatum = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: PieDatum[];
  size?: number; // px
  thickness?: number; // for donut style
  showTotal?: boolean;
};

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [`M`, start.x, start.y, `A`, r, r, 0, largeArc, 0, end.x, end.y, `L`, cx, cy, `Z`].join(' ');
}

export function PieChart({ data, size = 240, thickness = 32, showTotal = true }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  // Donut: draw full ring segments using strokes
  if (thickness > 0) {
    const circumference = 2 * Math.PI * (r - thickness / 2);
    let offset = 0;
    return (
      <div style={{ display: 'grid', placeItems: 'center', position: 'relative' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={r - thickness / 2} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const frac = total > 0 ? d.value / total : 0;
            const len = frac * circumference;
            const dashArray = `${len} ${circumference - len}`;
            const dashOffset = -offset;
            offset += len;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r - thickness / 2}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            );
          })}
        </svg>
        {showTotal && (
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#5FF281' }}>{total}</div>
            <div style={{ fontSize: 12, color: '#bbb' }}>Tổng</div>
          </div>
        )}
      </div>
    );
  }

  // Solid pie fallback
  let startAngle = 0;
  const paths = data.map((d, i) => {
    const angle = total > 0 ? (d.value / total) * 360 : 0;
    const endAngle = startAngle + angle;
    const path = arcPath(cx, cy, r, startAngle, endAngle);
    startAngle = endAngle;
    return <path key={i} d={path} fill={d.color} />;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths}
    </svg>
  );
}
