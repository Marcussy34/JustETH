"use client";

import React, { useEffect, useRef, useState } from "react";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return mousePosition;
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

const Particles = ({ className = "", quantity = 100, ease = 50, color = "#ffffff" }) => {
  const canvasRef = useRef(null);
  const context = useRef(null);
  const mousePosition = useMousePosition();
  const particles = useRef([]);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = canvasRef.current;
      if (canvas) {
        context.current = canvas.getContext("2d");
      }
      initCanvas();
      createParticles();
      animate();
      window.addEventListener("resize", initCanvas);

      return () => {
        window.removeEventListener("resize", initCanvas);
      };
    }
  }, [color]);

  const initCanvas = () => {
    if (canvasRef.current && context.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.current.scale(dpr, dpr);
    }
  };

  // Create particles and store them in the particles array
  const createParticles = () => {
    particles.current = [];
    for (let i = 0; i < quantity; i++) {
      particles.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 1, // Size between 1 and 5
        speedX: Math.random() * 2 - 1, // Speed between -1 and 1
        speedY: Math.random() * 2 - 1, // Speed between -1 and 1
        color: hexToRgb(color),
      });
    }
  };

  const drawParticles = () => {
    if (!context.current) return;

    context.current.clearRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);

    particles.current.forEach((particle) => {
      context.current.beginPath();
      context.current.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.current.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, 0.7)`;
      context.current.fill();
      context.current.closePath();

      // Update particle position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around screen edges
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.y < 0) particle.y = window.innerHeight;
      if (particle.y > window.innerHeight) particle.y = 0;
    });
  };

  const animate = () => {
    drawParticles();
    window.requestAnimationFrame(animate);
  };

  return <canvas ref={canvasRef} className={`${className} w-full h-full`} />;
};

export default Particles;
