import React, { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import SunCalc from 'suncalc';

interface ClockProps {
  timezone: string;
  city: string;
  size?: number;
  latitude: number;
  longitude: number;
  isCurrentTimezone?: boolean;
}

const ClockVisual: React.FC<ClockProps> = ({
  timezone,
  city,
  size = 240,
  latitude,
  longitude,
  isCurrentTimezone = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const updateDaytimeStatus = () => {
      const now = DateTime.now().setZone(timezone).toJSDate();
      const sunTimes = SunCalc.getTimes(now, latitude, longitude);

      const sunrise = DateTime.fromJSDate(sunTimes.sunrise).setZone(timezone);
      const sunset = DateTime.fromJSDate(sunTimes.sunset).setZone(timezone);

      setIsDaytime(now >= sunrise.toJSDate() && now <= sunset.toJSDate());
    };

    updateDaytimeStatus();
    const interval = setInterval(updateDaytimeStatus, 60000);

    return () => clearInterval(interval);
  }, [timezone, latitude, longitude]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    canvas.width = size;
    canvas.height = size;

    const radius = (Math.min(canvas.width, canvas.height) * 0.95) / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // draw static part
    const drawStaticPart = () => {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 1;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = isDaytime ? '#ffffff' : '#333333';
      ctx.fill();
      ctx.restore();

      // draw clock ticks (1-12)
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const x1 = centerX + (radius - size * 0.03) * Math.cos(angle);
        const y1 = centerY + (radius - size * 0.03) * Math.sin(angle);
        const x2 = centerX + (radius - size * 0.1) * Math.cos(angle);
        const y2 = centerY + (radius - size * 0.1) * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#869AC0';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // draw text label
      ctx.font = `${size * 0.06}px 'Figtree Variable'`;
      ctx.fillStyle = '#869AC0';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(city, centerX, centerY + radius * 0.3);
    };

    const drawDynamicPart = () => {
      const now = DateTime.now().setZone(timezone);
      const hours = now.hour % 12;
      const minutes = now.minute;
      // const seconds = now.second;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawStaticPart();

      const drawHand = (
        angle: number,
        length: number,
        lineWidth: number,
        color: string
      ) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + length * Math.cos(angle - Math.PI / 2),
          centerY + length * Math.sin(angle - Math.PI / 2)
        );
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      // hour hand
      const hourAngle = ((hours + minutes / 60) * Math.PI) / 6;
      drawHand(
        hourAngle,
        radius * 0.5,
        size * 0.02,
        isCurrentTimezone ? '#0C8AD6' : '#D81E5B'
      );

      // minute hand
      const minuteAngle = (minutes * Math.PI) / 30;
      drawHand(
        minuteAngle,
        radius * 0.7,
        size * 0.02,
        isCurrentTimezone ? '#0C8AD6' : '#D81E5B'
      );

      // second hand
      // const secondAngle = (seconds * Math.PI) / 30;
      // drawHand(secondAngle, radius * 0.9, size * 0.01, 'red');

      // draw clock center
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.03, 0, 2 * Math.PI);
      ctx.fillStyle = '#B9CEDB';
      ctx.fill();
    };

    drawStaticPart();
    drawDynamicPart();

    const interval = setInterval(drawDynamicPart, 10000);

    return () => {
      // release canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
      clearInterval(interval);
    };
  }, [timezone, size, city, isDaytime, isCurrentTimezone]);

  return <canvas ref={canvasRef}></canvas>;
};

export default ClockVisual;
