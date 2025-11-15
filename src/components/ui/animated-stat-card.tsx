import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AnimatedStatCardProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  color?: string;
  maxValue?: number;
  delay?: number;
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  value,
  label,
  suffix = '+',
  duration = 2000,
  color = 'hsl(var(--rural-primary))',
  maxValue,
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setTimeout(() => {
              setIsVisible(true);
              hasAnimated.current = true;
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [isVisible, value, duration]);

  // Calculate percentage for chart
  const percentage = maxValue ? (value / maxValue) * 100 : 75;
  const chartData = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  return (
    <div
      ref={cardRef}
      className={`relative text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Circular Progress Chart */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              animationDuration={duration}
              animationBegin={0}
            >
              <Cell fill={color} className="drop-shadow-glow" />
              <Cell fill="rgba(255, 255, 255, 0.1)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl lg:text-4xl font-bold text-rural-primary">
            {displayValue.toLocaleString('pt-BR')}
            {suffix}
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-sm lg:text-base text-rural-text-light font-medium px-2">
        {label}
      </div>

      {/* Animated Background Glow */}
      <div
        className="absolute inset-0 -z-10 rounded-full blur-xl opacity-20 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};
