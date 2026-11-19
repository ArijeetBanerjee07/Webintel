"use client";

import React, { useEffect, useRef } from "react";
import { isLandCoordinate } from "./globeLandData";

interface GlobePoint {
  x: number;
  y: number;
  z: number;
  size: number;
  isLand: boolean;
}

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth * window.devicePixelRatio);
    let height = (canvas.height =
      container.clientHeight * window.devicePixelRatio);

    const updateSize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth * window.devicePixelRatio;
      height = canvas.height =
        container.clientHeight * window.devicePixelRatio;
    };

    window.addEventListener("resize", updateSize);

    // High-resolution sphere generation with fine continent details
    const points: GlobePoint[] = [];
    const numLat = 124; // 124 fine latitude rings for realistic geographic features

    for (let i = 0; i < numLat; i++) {
      const phi = (i / numLat) * Math.PI; // 0 to PI
      const lat = 90 - (i / numLat) * 180;
      // Density scaled by latitude circumference
      const count = Math.max(8, Math.floor(250 * Math.sin(phi)));

      for (let j = 0; j < count; j++) {
        const theta = (j / count) * 2 * Math.PI; // 0 to 2PI
        const lon = -180 + (j / count) * 360;
        const land = isLandCoordinate(lat, lon);

        if (land) {
          // Precise continental dot (smaller, dense, glowing)
          points.push({
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(theta),
            size: 0.9,
            isLand: true,
          });
        } else if (i % 4 === 0 && j % 4 === 0) {
          // Sparse micro dot in ocean to establish sphere depth
          points.push({
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(theta),
            size: 0.45,
            isLand: false,
          });
        }
      }
    }

    // Rotation state: Tilted view facing Europe & Africa
    let rotX = 0.38;
    let rotY = 1.18;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Slower, graceful, cinematic spin speed
    const autoRotateSpeed = 0.0009;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      rotX = Math.max(-0.8, Math.min(0.9, rotX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseX;
      const dy = e.touches[0].clientY - prevMouseY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      rotX = Math.max(-0.8, Math.min(0.9, rotX));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // Render loop
    const render = () => {
      if (!isDragging) {
        rotY += autoRotateSpeed;
      }

      const dpr = window.devicePixelRatio || 1;
      const currentRadius = Math.min(width, height) * 0.44;
      const centerX = width / 2;
      const centerY = height * 0.62;

      ctx.clearRect(0, 0, width, height);

      // Atmospheric radial emerald glow
      const ambientGrad = ctx.createRadialGradient(
        centerX,
        centerY - currentRadius * 0.2,
        currentRadius * 0.25,
        centerX,
        centerY,
        currentRadius * 1.35
      );
      ambientGrad.addColorStop(0, "rgba(5, 150, 105, 0.18)");
      ambientGrad.addColorStop(0.45, "rgba(4, 120, 87, 0.08)");
      ambientGrad.addColorStop(0.8, "rgba(2, 44, 34, 0.02)");
      ambientGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric outer perimeter limb ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.008, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.16)";
      ctx.lineWidth = 1.2 * dpr;
      ctx.stroke();

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Project points
      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        projected.push({
          x: centerX + x1 * currentRadius,
          y: centerY - y2 * currentRadius,
          z: z2,
          isLand: p.isLand,
          size: p.size,
        });
      }

      // Sort by Z for realistic depth
      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const depth = (pt.z + 1) / 2; // [0, 1]

        if (!pt.isLand) {
          // Ocean micro-dots (very subtle, non-intrusive)
          if (depth > 0.3) {
            ctx.fillStyle = `rgba(16, 185, 129, ${0.08 * depth})`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 0.6 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        // Continental land dots (smaller, sharp, detailed)
        if (depth < 0.25) {
          // Back hemisphere
          ctx.fillStyle = `rgba(4, 90, 48, ${0.18 * depth})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 0.65 * dpr, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Front hemisphere (luminous emerald)
          const brightness = Math.pow(depth, 1.4);
          const alpha = 0.45 + brightness * 0.55;
          const radius = (pt.size * dpr) * (0.65 + brightness * 0.45);

          if (brightness > 0.72) {
            ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.shadowColor = "rgba(0, 255, 136, 0.5)";
            ctx.shadowBlur = 3 * dpr;
          } else {
            ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] overflow-hidden select-none flex items-center justify-center"
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
}
