"use client";

import React, { useEffect, useRef, useState } from "react";

interface GlobePoint {
  x: number;
  y: number;
  z: number;
  size: number;
  isLand?: boolean;
}

interface LocationMarker {
  id: string;
  name: string;
  lat: number;
  lon: number;
  active?: boolean;
}

const PRESET_LOCATIONS: LocationMarker[] = [
  { id: "nl", name: "Netherlands", lat: 52.3676, lon: 4.9041, active: true },
  { id: "de", name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
  { id: "us", name: "Silicon Valley", lat: 37.3861, lon: -122.0839 },
  { id: "sg", name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { id: "jp", name: "Tokyo", lat: 35.6762, lon: 139.6503 },
];

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationMarker>(
    PRESET_LOCATIONS[0]
  );
  const [markerScreenPos, setMarkerScreenPos] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

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

    // Generate 3D point cloud of a sphere with landmass density
    const points: GlobePoint[] = [];
    const numLat = 38;
    const numLon = 76;

    // Approximate continent boundaries for high-density emerald dots
    const isLandmass = (lat: number, lon: number): boolean => {
      // Europe & North Africa / Middle East
      if (lat >= 30 && lat <= 70 && lon >= -10 && lon <= 45) return true;
      // Africa
      if (lat >= -35 && lat < 30 && lon >= -18 && lon <= 50) return true;
      // North America
      if (lat >= 15 && lat <= 70 && lon >= -165 && lon <= -55) return true;
      // South America
      if (lat >= -55 && lat < 15 && lon >= -82 && lon <= -35) return true;
      // Asia
      if (lat >= 8 && lat <= 75 && lon >= 45 && lon <= 150) return true;
      // Australia / Oceania
      if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 155) return true;
      return false;
    };

    for (let i = 0; i < numLat; i++) {
      const phi = (i / numLat) * Math.PI; // 0 to PI
      const latDeg = 90 - (i / numLat) * 180;
      const count = Math.max(8, Math.floor(numLon * Math.sin(phi)));

      for (let j = 0; j < count; j++) {
        const theta = (j / count) * 2 * Math.PI; // 0 to 2PI
        const lonDeg = -180 + (j / count) * 360;
        const isLand = isLandmass(latDeg, lonDeg);

        // Density weighting: add more points if it's a continent
        const repeat = isLand ? 2 : 1;
        for (let r = 0; r < repeat; r++) {
          const jitterLat = isLand ? (Math.random() - 0.5) * 0.04 : 0;
          const jitterLon = isLand ? (Math.random() - 0.5) * 0.04 : 0;
          const currentPhi = phi + jitterLat;
          const currentTheta = theta + jitterLon;

          points.push({
            x: Math.sin(currentPhi) * Math.cos(currentTheta),
            y: Math.cos(currentPhi),
            z: Math.sin(currentPhi) * Math.sin(currentTheta),
            size: isLand ? 1.4 : 0.8,
            isLand,
          });
        }
      }
    }

    // Rotation state
    let rotX = 0.38; // Tilted towards viewer
    let rotY = 1.2; // Initial rotation facing Europe/Netherlands
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    const autoRotateSpeed = 0.0035;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      rotY += dx * 0.006;
      rotX += dy * 0.006;
      // Clamp vertical tilt
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
      rotY += dx * 0.006;
      rotX += dy * 0.006;
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

    // Convert lat/lon of selected location into 3D unit coordinates
    const getUnitVector = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -(Math.sin(phi) * Math.cos(theta)),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    };

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      if (!isDragging) {
        rotY += autoRotateSpeed;
      }

      const dpr = window.devicePixelRatio || 1;
      const currentRadius = Math.min(width, height) * 0.44;
      const centerX = width / 2;
      const centerY = height * 0.62; // Center lower so the top curves dramatically like Image 2

      ctx.clearRect(0, 0, width, height);

      // Ambient emerald horizon glow behind globe
      const ambientGrad = ctx.createRadialGradient(
        centerX,
        centerY - currentRadius * 0.2,
        currentRadius * 0.3,
        centerX,
        centerY,
        currentRadius * 1.3
      );
      ambientGrad.addColorStop(0, "rgba(5, 150, 105, 0.16)");
      ambientGrad.addColorStop(0.5, "rgba(4, 120, 87, 0.08)");
      ambientGrad.addColorStop(0.85, "rgba(2, 44, 34, 0.03)");
      ambientGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric limb glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.01, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.18)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Rotate and project points
      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Scale by radius
        const screenX = centerX + x1 * currentRadius;
        const screenY = centerY - y2 * currentRadius;

        projected.push({
          x: screenX,
          y: screenY,
          z: z2,
          isLand: p.isLand,
          size: p.size,
        });
      }

      // Sort by Z for proper depth rendering
      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];

        // Depth factor [-1, 1] mapped to [0, 1]
        const depth = (pt.z + 1) / 2;

        if (depth < 0.25) {
          // Deep back hemisphere (dim faint forest green)
          ctx.fillStyle = `rgba(5, 70, 40, ${0.12 * depth})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (pt.size * 0.7 * dpr), 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Front hemisphere (vibrant neon emerald)
          const brightness = Math.pow(depth, 1.6);
          const alpha = pt.isLand ? 0.35 + brightness * 0.65 : 0.15 + brightness * 0.4;
          const radius = (pt.isLand ? pt.size * 1.2 : pt.size * 0.9) * dpr * (0.6 + brightness * 0.7);

          if (brightness > 0.75 && pt.isLand) {
            ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.shadowColor = "rgba(0, 255, 136, 0.4)";
            ctx.shadowBlur = 4 * dpr;
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

      // Project Location Marker (e.g. Netherlands)
      const locVec = getUnitVector(
        selectedLocation.lat,
        selectedLocation.lon
      );

      const lx1 = locVec.x * cosY + locVec.z * sinY;
      const lz1 = -locVec.x * sinY + locVec.z * cosY;
      const ly2 = locVec.y * cosX - lz1 * sinX;
      const lz2 = locVec.y * sinX + lz1 * cosX;

      const markerScreenX = centerX + lx1 * currentRadius;
      const markerScreenY = centerY - ly2 * currentRadius;
      const isVisibleOnFront = lz2 > 0.1;

      if (isVisibleOnFront) {
        // Draw pulsating beacon rings on surface
        const pulse = (tick % 70) / 70;
        const ringRadius = (8 + pulse * 18) * dpr;
        const ringAlpha = (1 - pulse) * 0.75;

        ctx.strokeStyle = `rgba(0, 255, 136, ${ringAlpha})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(markerScreenX, markerScreenY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Pin core dot
        ctx.fillStyle = "#00ff88";
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur = 10 * dpr;
        ctx.beginPath();
        ctx.arc(markerScreenX, markerScreenY, 4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Stem connecting surface to floating badge
        ctx.strokeStyle = "rgba(0, 255, 136, 0.4)";
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([3 * dpr, 3 * dpr]);
        ctx.beginPath();
        ctx.moveTo(markerScreenX, markerScreenY);
        ctx.lineTo(markerScreenX, markerScreenY - 32 * dpr);
        ctx.stroke();
        ctx.setLineDash([]);

        setMarkerScreenPos({
          x: markerScreenX / dpr,
          y: (markerScreenY - 36 * dpr) / dpr,
          visible: true,
        });
      } else {
        setMarkerScreenPos((prev) => ({ ...prev, visible: false }));
      }

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
  }, [selectedLocation]);

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

      {/* Floating 3D Location Badge (Styled exactly as in Image 2) */}
      {markerScreenPos.visible && (
        <div
          className="absolute pointer-events-none transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-full"
          style={{
            left: `${markerScreenPos.x}px`,
            top: `${markerScreenPos.y}px`,
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#092212]/90 border border-emerald-400/40 text-white text-xs font-medium shadow-[0_0_24px_rgba(16,185,129,0.35)] backdrop-blur-md">
            <span className="text-emerald-400 text-sm">📍</span>
            <span className="tracking-wide text-white">{selectedLocation.name}</span>
          </div>
        </div>
      )}

      {/* Region Switcher Pills below or at bottom right */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#041007]/80 backdrop-blur-md border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs z-10">
        <span className="text-emerald-400/80 mr-1 hidden sm:inline">Active Edge:</span>
        {PRESET_LOCATIONS.map((loc) => {
          const isSelected = selectedLocation.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                isSelected
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  : "text-slate-400 hover:text-white hover:bg-emerald-500/10"
              }`}
            >
              {loc.name}
            </button>
          );
        })}
      </div>

      {/* Drag instruction hint */}
      <div className="absolute top-4 right-4 pointer-events-none text-[11px] text-emerald-400/50 bg-[#041007]/60 border border-emerald-500/10 px-2.5 py-1 rounded-full">
        Drag to rotate sphere
      </div>
    </div>
  );
}
