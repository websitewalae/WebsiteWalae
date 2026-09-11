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
  const logoMeshRef = useRef<THREE.Mesh | null>(null);
  const ringMeshRef = useRef<THREE.Mesh | null>(null);
  const ringMesh2Ref = useRef<THREE.Mesh | null>(null);
  const limeLightRef = useRef<THREE.PointLight | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth physical variables
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const currentScale = useRef(1);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clean container before appending canvas
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(4, 5, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const limeLight = new THREE.PointLight(0xc7ff3d, 4, 12);
    limeLight.position.set(-3, 2, 3);
    scene.add(limeLight);
    limeLightRef.current = limeLight;

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 12);
    purpleLight.position.set(3, -2, 3);
    scene.add(purpleLight);

    // 5. Group container for logo + rings
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // 6. Texture Loader for Website Walae Logo
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // Create a cylindrical coin/emblem mesh
      const radius = 1.35;
      const heightVal = 0.22;
      const cylinderGeo = new THREE.CylinderGeometry(radius, radius, heightVal, 64, 1);

      // Materials: 0=side bevel, 1=top face (logo), 2=bottom face (logo)
      const sideMat = new THREE.MeshPhysicalMaterial({
        color: 0x141414,
        metalness: 0.85,
        roughness: 0.25,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        emissive: 0xc7ff3d,
        emissiveIntensity: 0.08,
      });

      const faceMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.3,
        metalness: 0.2,
      });

      const materials = [sideMat, faceMat, faceMat];

      const logoMesh = new THREE.Mesh(cylinderGeo, materials);
      // Rotate cylinder so top face faces camera (cylinder default height is along Y)
      logoMesh.rotation.x = Math.PI / 2;
      logoMesh.castShadow = true;
      logoMesh.receiveShadow = true;

      group.add(logoMesh);
      logoMeshRef.current = logoMesh;
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

    // 8. Animation Loop
    let time = 0;

    const animate = () => {
      time += 0.015;

      if (group) {
        // Apply smooth tilt interpolation based on mouse coordinates (fixed upright base)
        currentRotationX.current += (targetRotationX.current - currentRotationX.current) * 0.08;
        currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.08;

        // FIXED UPRIGHT ROTATION: text stays front-facing and legible at all times
        group.rotation.y = currentRotationY.current;
        group.rotation.x = currentRotationX.current;

        // Gentle floating breathing motion on Y axis
        group.position.y = Math.sin(time) * 0.08;

        // Scale animation on hover/service activation
        const targetScaleVal = isHovered ? 1.15 : activeServiceIndex !== null ? 1.08 : 1.0;
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

      // Point Light intensity boost when hovered
      if (limeLightRef.current) {
        const targetLightInt = isHovered ? 7 : activeServiceIndex !== null ? 5.5 : 3.5;
        limeLightRef.current.intensity += (targetLightInt - limeLightRef.current.intensity) * 0.08;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update target tilt from props mouseX & mouseY (pitch up to ~8deg, yaw up to ~8deg)
  useEffect(() => {
    targetRotationX.current = -mouseY * 0.22; // ~12 degrees max tilt pitch
    targetRotationY.current = mouseX * 0.22;  // ~12 degrees max tilt yaw
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
