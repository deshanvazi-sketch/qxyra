'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Smartphone3D, PHONE_COLORS } from './PhoneModel3D';
import { RotateCw, Maximize2, Sparkles, Smartphone, Camera, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneViewer3DProps {
  phoneName: string;
  colors?: string[];
  initialColor?: string;
  onColorChange?: (color: string) => void;
  className?: string;
  showControls?: boolean;
}

export function PhoneViewer3D({
  phoneName,
  colors = [],
  initialColor,
  onColorChange,
  className = '',
  showControls = true,
}: PhoneViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<string>(initialColor || colors[0] || 'Voyage Black');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeView, setActiveView] = useState<'front' | 'back' | 'side' | 'isometric'>('isometric');

  const phoneModelRef = useRef<Smartphone3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Smooth camera animation target
  const targetCamPos = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (initialColor && initialColor !== activeColor) {
      setActiveColor(initialColor);
      phoneModelRef.current?.setColor(initialColor);
    }
  }, [initialColor]);

  const handleColorSelect = (color: string) => {
    setActiveColor(color);
    phoneModelRef.current?.setColor(color);
    onColorChange?.(color);
  };

  const setCameraView = useCallback((view: 'front' | 'back' | 'side' | 'isometric') => {
    setActiveView(view);
    setIsAutoRotating(false);

    if (view === 'front') {
      targetCamPos.current = new THREE.Vector3(0, 0, 11);
    } else if (view === 'back') {
      targetCamPos.current = new THREE.Vector3(0, 0, -11);
    } else if (view === 'side') {
      targetCamPos.current = new THREE.Vector3(10.5, 0, 0);
    } else {
      targetCamPos.current = new THREE.Vector3(5.5, 2.8, 8.5);
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(5.5, 2.8, 8.5);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5.5;
    controls.maxDistance = 15;
    controls.enablePan = false;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 1.4;
    controlsRef.current = controls;

    // 5. Studio Multi-point Lighting
    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cool Blue Fill Light
    const fillLight = new THREE.DirectionalLight(0xbad7ff, 1.6);
    fillLight.position.set(-6, -3, 6);
    scene.add(fillLight);

    // Rim / Edge Specular Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // Subtle Ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // 6. Ground Studio Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const radGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    radGrad.addColorStop(0, 'rgba(0,0,0,0.45)');
    radGrad.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlaneGeom = new THREE.PlaneGeometry(6, 6);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeom, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.4;
    scene.add(shadowPlane);

    // 7. Add 3D Phone Model
    const phone = new Smartphone3D(phoneName, activeColor);
    phoneModelRef.current = phone;
    scene.add(phone.group);

    // Floating animation offset
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle floating hover
      phone.group.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Smooth camera interpolation towards target angle preset
      if (targetCamPos.current) {
        camera.position.lerp(targetCamPos.current, 0.06);
        if (camera.position.distanceTo(targetCamPos.current) < 0.05) {
          targetCamPos.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [phoneName]);

  // Sync auto-rotation state with controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  return (
    <div className={cn("relative w-full h-full flex flex-col items-center select-none", className)}>
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-full flex-grow cursor-grab active:cursor-grabbing touch-none relative" 
      />

      {/* Floating 3D Interaction Hint Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: '6s' }} />
        <span>Drag to rotate 360°</span>
      </div>

      {/* Top Right Controls: Auto-Spin & Reset */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-md border transition-all flex items-center gap-1.5 shadow-md cursor-pointer",
            isAutoRotating 
              ? "bg-brand-gold text-brand-black border-brand-gold font-semibold" 
              : "bg-black/60 text-white border-white/15 hover:bg-black/80"
          )}
          title="Toggle Cinematic 360° Auto Spin"
        >
          <RotateCw className={cn("w-3.5 h-3.5", isAutoRotating && "animate-spin")} style={{ animationDuration: '4s' }} />
          <span>{isAutoRotating ? 'Spinning' : 'Auto Spin'}</span>
        </button>
      </div>

      {showControls && (
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-10 flex flex-col gap-2.5">
          {/* Preset Camera Angles */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCameraView('front')}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md border transition-all flex items-center gap-1 cursor-pointer",
                activeView === 'front' && !isAutoRotating
                  ? "bg-white text-black font-semibold border-white shadow-md"
                  : "bg-black/60 text-white border-white/10 hover:bg-black/80"
              )}
            >
              <Smartphone className="w-3 h-3 text-brand-gold" />
              <span>Front</span>
            </button>
            <button
              onClick={() => setCameraView('back')}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md border transition-all flex items-center gap-1 cursor-pointer",
                activeView === 'back' && !isAutoRotating
                  ? "bg-white text-black font-semibold border-white shadow-md"
                  : "bg-black/60 text-white border-white/10 hover:bg-black/80"
              )}
            >
              <Camera className="w-3 h-3 text-brand-gold" />
              <span>Camera</span>
            </button>
            <button
              onClick={() => setCameraView('side')}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md border transition-all flex items-center gap-1 cursor-pointer",
                activeView === 'side' && !isAutoRotating
                  ? "bg-white text-black font-semibold border-white shadow-md"
                  : "bg-black/60 text-white border-white/10 hover:bg-black/80"
              )}
            >
              <Compass className="w-3 h-3 text-brand-gold" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setCameraView('isometric')}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-medium backdrop-blur-md border transition-all flex items-center gap-1 cursor-pointer",
                activeView === 'isometric' && !isAutoRotating
                  ? "bg-white text-black font-semibold border-white shadow-md"
                  : "bg-black/60 text-white border-white/10 hover:bg-black/80"
              )}
            >
              <span>3D Angle</span>
            </button>
          </div>

          {/* Color Palette Switcher */}
          {colors.length > 0 && (
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-black/70 backdrop-blur-lg border border-white/15 max-w-fit mx-auto shadow-2xl">
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1 pr-1 hidden sm:inline">
                Color:
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-[280px] sm:max-w-md py-0.5">
                {colors.map((color) => {
                  const cfg = PHONE_COLORS[color] || { bodyColor: '#333333' };
                  const isSelected = activeColor.toLowerCase() === color.toLowerCase();

                  return (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={cn(
                        "group relative flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap border",
                        isSelected
                          ? "bg-white/20 border-brand-gold text-white font-medium shadow-sm ring-1 ring-brand-gold/60"
                          : "border-transparent text-gray-300 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm shrink-0"
                        style={{ backgroundColor: cfg.bodyColor }}
                      />
                      <span className="text-[11px]">{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
