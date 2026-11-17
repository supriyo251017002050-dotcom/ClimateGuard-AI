import React, { useEffect, useRef, useState } from 'react';

export default function RiskScoreGauge({ score = 80, level = 'High', size = 120 }) {
  const [animatedOffset, setAnimatedOffset] = useState(null);
  const mounted = useRef(false);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const finalOffset = circumference - (score / 100) * circumference;

  // Animate on mount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setAnimatedOffset(circumference);
      const timer = setTimeout(() => {
        setAnimatedOffset(finalOffset);
      }, 60);
      return () => clearTimeout(timer);
    }
    setAnimatedOffset(finalOffset);
  }, [score, circumference, finalOffset]);

  let strokeColor = 'var(--danger)';
  let badgeClass = 'badge-danger';

  if (score < 40) {
    strokeColor = 'var(--success)';
    badgeClass = 'badge-success';
  } else if (score < 60) {
    strokeColor = 'var(--warning)';
    badgeClass = 'badge-warning';
  } else if (score < 80) {
    strokeColor = '#c4880d';
    badgeClass = 'badge-warning';
  }

  // Tick marks
  const ticks = [];
  const tickCount = 20;
  for (let i = 0; i <= tickCount; i++) {
    const angle = (i / tickCount) * 360 - 90;
    const radian = (angle * Math.PI) / 180;
    const inner = radius - 3;
    const outer = radius + 3;
    const x1 = size / 2 + inner * Math.cos(radian);
    const y1 = size / 2 + inner * Math.sin(radian);
    const x2 = size / 2 + outer * Math.cos(radian);
    const y2 = size / 2 + outer * Math.sin(radian);
    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--border-color)"
        strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Tick marks */}
          <g className="transform rotate-90" style={{ transformOrigin: 'center' }}>
            {ticks}
          </g>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="fill-none"
            style={{ stroke: 'var(--bg-elevated)' }}
          />

          {/* Animated value arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset ?? finalOffset}
            strokeLinecap="round"
            className="fill-none"
            style={{
              transition: 'stroke-dashoffset 1s var(--ease-out-expo)',
              filter: `drop-shadow(0 0 4px ${strokeColor})`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-[22px] font-extrabold tracking-tight"
            style={{ color: 'var(--text-bright)', fontVariantNumeric: 'tabular-nums' }}
          >
            {score}
          </span>
          <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-[var(--text-muted)] -mt-0.5">
            / 100
          </span>
        </div>
      </div>

      <div className={`mt-2 badge ${badgeClass}`}>
        {level} risk
      </div>
    </div>
  );
}
