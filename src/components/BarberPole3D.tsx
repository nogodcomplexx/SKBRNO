'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default function BarberPole3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 80;
    const height = container.clientHeight || 180;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Ambient Light - soft fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Directional Light 1 - Key light
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    // Directional Light 2 - Golden backlight/rim light for luxury look
    const dirLight2 = new THREE.DirectionalLight(0xD4AF37, 1.8);
    dirLight2.position.set(-5, 2, -5);
    scene.add(dirLight2);

    // Directional Light 3 - Soft blue glow from bottom for contrast
    const dirLight3 = new THREE.DirectionalLight(0x4285F4, 0.8);
    dirLight3.position.set(2, -6, 2);
    scene.add(dirLight3);

    // Load MTL and then OBJ
    let poleGroup: THREE.Group | null = null;

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/model/');
    
    // Load MTL
    mtlLoader.load('Barber_Shop_Pole_02.mtl', (materials) => {
      materials.preload();

      // Configure materials to look shiny and double-sided
      Object.keys(materials.materials).forEach((key) => {
        const mat = materials.materials[key];
        if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
          mat.side = THREE.DoubleSide;
          if (key.toLowerCase().includes('metal')) {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.metalness = 0.9;
              mat.roughness = 0.1;
            }
          }
        }
      });

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('/model/');
      
      // Load OBJ
      objLoader.load('Barber_Shop_Pole_02.obj', (object) => {
        poleGroup = object;
        
        // Compute bounding box to center object
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Shift geometry center to origin
        object.position.y = -center.y + 0.1;
        object.position.x = -center.x;
        object.position.z = -center.z;
        
        // Scale object to fit well inside the view
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 3.6 / maxDim;
        object.scale.set(targetScale, targetScale, targetScale);
        
        scene.add(object);
        setLoading(false);
      }, undefined, (err) => {
        console.error('Error loading OBJ:', err);
        setError(true);
        setLoading(false);
      });
    }, undefined, (err) => {
      console.error('Error loading MTL:', err);
      setError(true);
      setLoading(false);
    });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (poleGroup) {
        // Slow rotation to simulate a spinning barber pole
        poleGroup.rotation.y = clock.getElapsedTime() * 0.6;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <span className="text-[10px] uppercase tracking-wider text-rose-400/70 font-semibold mb-1">Model failed</span>
        <span className="text-[9px] text-[#A1A1AA]">Barber Pole</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 border border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
