import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resizeObserver = new ResizeObserver(() => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(document.body);

    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      baseOpacity: number;
    }

    // Significantly reduced star count for a cleaner look
    const starCount = 60;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5, // range 0.5 to 2.0
        baseOpacity: Math.random() * 0.5 + 0.1,
        opacity: 0, // start at 0
        speed: Math.random() * 0.05 + 0.01,
      });
    }

    let time = 0;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.002;

      // --- Layer 1: Subtle Nebula Gradients (The "Premium" Feel) ---
      
      // Blue/Cyan Glow (Top Left moving)
      const x1 = width * 0.3 + Math.sin(time) * 100;
      const y1 = height * 0.3 + Math.cos(time * 0.8) * 50;
      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, width * 0.8);
      grad1.addColorStop(0, 'rgba(0, 212, 255, 0.03)');
      grad1.addColorStop(0.5, 'rgba(0, 212, 255, 0.01)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Purple/Pink Glow (Bottom Right moving)
      const x2 = width * 0.7 - Math.sin(time * 0.5) * 100;
      const y2 = height * 0.7 - Math.cos(time) * 50;
      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.8);
      grad2.addColorStop(0, 'rgba(176, 48, 255, 0.03)');
      grad2.addColorStop(0.5, 'rgba(176, 48, 255, 0.01)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // --- Layer 2: Stars ---
      stars.forEach((star) => {
        // Twinkle effect
        const twinkle = Math.sin((time * 50) + (star.x * 0.1));
        star.opacity = star.baseOpacity + (twinkle * 0.1); // subtle variation

        // Slow drift upwards
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Star color with slight tint
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        
        // Add soft glow to larger stars only
        if (star.size > 1.2) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarField;