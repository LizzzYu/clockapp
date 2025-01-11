import { useEffect, useRef } from 'react';
import { DateTime } from 'luxon';

interface SimpleClockProps {
  timezone: string;
  size?: number;
}

const ClockVisualSimple = ({ timezone, size = 110 }: SimpleClockProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    canvas.width = size;
    canvas.height = size;

    const drawClock = () => {
      const now = DateTime.now().setZone(timezone);
      const hours = now.hour % 12;
      const minutes = now.minute;

      const radius = (size * 0.9) / 2;
      const centerX = size / 2;
      const centerY = size / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 1;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // draw hour hand
      const hourAngle = ((hours + minutes / 60) * Math.PI) / 6;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * 0.5 * Math.cos(hourAngle - Math.PI / 2),
        centerY + radius * 0.5 * Math.sin(hourAngle - Math.PI / 2)
      );
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.stroke();

      // draw minute hand
      const minuteAngle = (minutes * Math.PI) / 30;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * 0.7 * Math.cos(minuteAngle - Math.PI / 2),
        centerY + radius * 0.7 * Math.sin(minuteAngle - Math.PI / 2)
      );
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawClock();
    const interval = setInterval(drawClock, 60000);

    // release canvas
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
      clearInterval(interval);
    };
  }, [timezone, size]);

  return <canvas ref={canvasRef}></canvas>;
};

export default ClockVisualSimple;
