"use client";

import React, { useEffect, useRef } from "react";

interface GlobePoint {
  x: number;
  y: number;
  z: number;
  size: number;
  isLand: boolean;
}

// Accurate continental boundary polygons
function pointInPoly(lat: number, lon: number, poly: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const yi = poly[i][0], xi = poly[i][1];
    const yj = poly[j][0], xj = poly[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

const AFRICA = [
  [37, -6], [37, 10], [31, 25], [31, 32], [28, 34], [22, 37], [15, 42],
  [11, 51], [2, 46], [-5, 40], [-15, 41], [-26, 33], [-34, 26], [-35, 20],
  [-34, 18], [-22, 14], [-6, 12], [4, 9], [5, 2], [5, -2], [4, -8],
  [7, -12], [11, -15], [15, -17], [21, -17], [28, -13], [35, -6], [37, -6],
];

const MADAGASCAR = [
  [-12, 49], [-16, 50], [-25, 47], [-26, 44], [-16, 44], [-12, 49],
];

const IBERIA = [
  [36, -9], [44, -9], [43, -2], [43, 3], [36, -5], [36, -9],
];

const EUROPE_CORE = [
  [43, -2], [47, -3], [50, 1], [53.5, 4.5], [53.5, 7.2], [54, 14],
  [59, 26], [55, 38], [48, 38], [45, 29], [40, 26], [36, 22], [37, 15],
  [44, 13], [41, 16], [38, 16], [37, 13], [44, 8], [43, 3], [43, -2],
];

const SCANDINAVIA = [
  [55, 8], [58, 6], [62, 5], [71, 26], [68, 30], [60, 24], [56, 14], [55, 8],
];

const BRITISH_ISLES = [
  [50, -5], [52, -5], [56, -6], [58, -5], [58, -2], [54, 0], [51, 1], [50, -1], [50, -5],
];

const ARABIA = [
  [30, 33], [32, 36], [30, 48], [24, 57], [17, 55], [12, 44], [15, 42], [27, 34], [30, 33],
];

const ANATOLIA = [
  [36, 26], [42, 27], [42, 42], [37, 43], [36, 36], [36, 26],
];

const ASIA_RUSSIA = [
  [45, 30], [55, 38], [60, 30], [70, 31], [75, 40], [77, 105], [73, 140],
  [66, 170], [60, 163], [52, 141], [43, 132], [50, 90], [50, 50], [45, 30],
];

const INDIA = [
  [25, 68], [34, 74], [28, 88], [22, 89], [16, 82], [8, 77], [13, 74], [21, 70], [25, 68],
];

const CHINA_EAST_ASIA = [
  [20, 100], [22, 114], [30, 122], [40, 124], [43, 131], [45, 120], [45, 90], [30, 80], [20, 100],
];

const SE_ASIA = [
  [22, 98], [21, 108], [10, 107], [1, 104], [14, 98], [22, 98],
];

const JAPAN = [
  [31, 130], [36, 136], [41, 141], [45, 142], [43, 145], [35, 140], [31, 130],
];

const NORTH_AMERICA = [
  [70, -165], [72, -130], [70, -95], [60, -64], [47, -53], [44, -66],
  [41, -71], [30, -81], [25, -80], [29, -89], [26, -97], [19, -96],
  [15, -93], [8, -78], [14, -87], [20, -105], [30, -114], [34, -120],
  [48, -125], [58, -137], [60, -150], [65, -168], [70, -165],
];

const SOUTH_AMERICA = [
  [12, -72], [10, -62], [5, -52], [-3, -40], [-8, -35], [-23, -42],
  [-35, -55], [-55, -67], [-53, -75], [-40, -74], [-18, -71], [-4, -81],
  [5, -77], [12, -72],
];

const AUSTRALIA = [
  [-11, 131], [-11, 142], [-23, 151], [-33, 152], [-38, 147], [-35, 117],
  [-22, 114], [-15, 125], [-11, 131],
];

const ALL_LAND = [
  AFRICA, MADAGASCAR, IBERIA, EUROPE_CORE, SCANDINAVIA, BRITISH_ISLES,
  ARABIA, ANATOLIA, ASIA_RUSSIA, INDIA, CHINA_EAST_ASIA, SE_ASIA, JAPAN,
  NORTH_AMERICA, SOUTH_AMERICA, AUSTRALIA,
];

function isLand(lat: number, lon: number): boolean {
  for (let i = 0; i < ALL_LAND.length; i++) {
    if (pointInPoly(lat, lon, ALL_LAND[i])) return true;
  }
  return false;
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
    const numLat = 116; // 116 fine latitude rings

    for (let i = 0; i < numLat; i++) {
      const phi = (i / numLat) * Math.PI; // 0 to PI
      const lat = 90 - (i / numLat) * 180;
      // Density scaled by latitude circumference
      const count = Math.max(8, Math.floor(230 * Math.sin(phi)));

      for (let j = 0; j < count; j++) {
        const theta = (j / count) * 2 * Math.PI; // 0 to 2PI
        const lon = -180 + (j / count) * 360;
        const land = isLand(lat, lon);

        if (land) {
          // Precise continental dot (smaller, dense, glowing)
          points.push({
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(theta),
            size: 0.95,
            isLand: true,
          });
        } else if (i % 4 === 0 && j % 4 === 0) {
          // Sparse micro dot in ocean to establish sphere depth
          points.push({
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(theta),
            size: 0.5,
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
