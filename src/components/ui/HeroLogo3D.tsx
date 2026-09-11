"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroLogo3DProps {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  mouseX: number; // Normalized -1 to 1
  mouseY: number; // Normalized -1 to 1
  activeServiceIndex: number | null;
}

export default function HeroLogo3D({
  isHovered,
  onHoverChange,
  mouseX,
  mouseY,
  activeServiceIndex,
}: HeroLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const ringMeshRef = useRef<THREE.Mesh | null>(null);
  const ringMesh2Ref = useRef<THREE.Mesh | null>(null);
  const limeLightRef = useRef<THREE.PointLight | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth physical variables for controlled front-facing tilt
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const currentScale = useRef(1);
  const currentZ = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 320;
    const height = containerRef.current.clientHeight || 320;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(4, 5, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const limeLight = new THREE.PointLight(0xc7ff3d, 4, 12);
    limeLight.position.set(-3, 2, 3);
    scene.add(limeLight);
    limeLightRef.current = limeLight;

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3.5, 12);
    purpleLight.position.set(3, -2, 3);
    scene.add(purpleLight);

    // 5. Logo Master Group
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // 6. Texture Loader for Ultra High-Res Website Walae Logo
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // --- A. FRONT FACE DISK (ALWAYS Facing Camera +Z) ---
      const frontGeo = new THREE.CircleGeometry(1.36, 64);
      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.2,
        metalness: 0.1,
      });
      const frontMesh = new THREE.Mesh(frontGeo, frontMat);
      frontMesh.position.z = 0.112;
      group.add(frontMesh);

      // --- B. METALLIC BEVEL RIM (Side Thickness) ---
      const cylinderGeo = new THREE.CylinderGeometry(1.38, 1.38, 0.22, 64, 1, true);
      const sideMat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        emissive: 0xc7ff3d,
        emissiveIntensity: 0.1,
      });
      const sideMesh = new THREE.Mesh(cylinderGeo, sideMat);
      sideMesh.rotation.x = Math.PI / 2;
      group.add(sideMesh);

      // --- C. BACK DISK ---
      const backGeo = new THREE.CircleGeometry(1.38, 64);
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.3,
        metalness: 0.8,
      });
      const backMesh = new THREE.Mesh(backGeo, backMat);
      backMesh.position.z = -0.112;
      backMesh.rotation.y = Math.PI;
      group.add(backMesh);
    });

    // 7. Futuristic Energy Rings
    const ringGeo = new THREE.TorusGeometry(1.75, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3d,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    group.add(ringMesh);
    ringMeshRef.current = ringMesh;

    const ring2Geo = new THREE.TorusGeometry(2.0, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ringMesh2.rotation.x = Math.PI / 3;
    group.add(ringMesh2);
    ringMesh2Ref.current = ringMesh2;

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth || 320;
      const h = containerRef.current.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Offscreen Pause Observer
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    // 9. Animation Loop with Strict Front-Facing Constraints
    let time = 0;

    const animate = () => {
      if (isVisible) {
        time += 0.015;

        if (group) {
          // Controlled pointer tilt interpolation (max ~5.7 degrees yaw/pitch)
          currentRotationX.current += (targetRotationX.current - currentRotationX.current) * 0.08;
          currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.08;

          // FRONT FACING GUARANTEE: rotation.y & rotation.x are strictly constrained to pointer tilt
          group.rotation.y = currentRotationY.current;
          group.rotation.x = currentRotationX.current;

          // Gentle breathing float on Y-axis
          group.position.y = Math.sin(time) * 0.06;

          // Z-axis movement on hover
          const targetZVal = isHovered ? 0.35 : activeServiceIndex !== null ? 0.2 : 0;
          currentZ.current += (targetZVal - currentZ.current) * 0.08;
          group.position.z = currentZ.current;

          // Scale animation on hover/service focus
          const targetScaleVal = isHovered ? 1.12 : activeServiceIndex !== null ? 1.06 : 1.0;
          currentScale.current += (targetScaleVal - currentScale.current) * 0.08;
          group.scale.set(currentScale.current, currentScale.current, currentScale.current);

          // Animate surrounding energy rings independently
          if (ringMesh) {
            ringMesh.rotation.z += 0.01;
            ringMesh.rotation.x = Math.sin(time * 0.8) * 0.15;
          }
          if (ringMesh2) {
            ringMesh2.rotation.z -= 0.008;
            ringMesh2.rotation.y = Math.cos(time * 0.6) * 0.2;
          }
        }

        // Boost lighting intensity on hover
        if (limeLightRef.current) {
          const targetLightInt = isHovered ? 7 : activeServiceIndex !== null ? 5.5 : 3.5;
          limeLightRef.current.intensity += (targetLightInt - limeLightRef.current.intensity) * 0.08;
        }

        renderer.render(scene, camera);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Mouse tilt parameters: Max +/- 0.10 rad (~5.7 degrees max tilt pitch/yaw)
  useEffect(() => {
    targetRotationX.current = -mouseY * 0.10;
    targetRotationY.current = mouseX * 0.10;
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] flex items-center justify-center cursor-pointer transition-transform duration-500 hover:drop-shadow-[0_0_45px_rgba(199,255,61,0.45)]"
    />
  );
}
