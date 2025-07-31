import { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#12002a"); // deep dark purple

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 120;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Prevent wheel events from being captured by the canvas
    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener("wheel", preventWheel, {
      passive: false,
    });

    // Responsive resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Create organic, spread-out nodes (spheres) in 3D space
    const nodes: THREE.Mesh[] = [];
    const glows: THREE.Mesh[] = [];
    const nodeCount = 48;
    const spread = 80;
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: "#00eaff" });
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: "#a259ff",
      transparent: true,
      opacity: 0.18,
    });
    const nodeData: {
      basePos: THREE.Vector3;
      orbitAxis: THREE.Vector3;
      orbitSpeed: number;
      phase: number;
    }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      // Random position in a 3D sphere
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = spread * (0.5 + Math.random() * 0.5);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      // Main node
      const geometry = new THREE.SphereGeometry(1.2, 20, 20);
      const node = new THREE.Mesh(geometry, nodeMaterial.clone());
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);
      // Glow effect (bigger, more transparent sphere)
      const glowGeometry = new THREE.SphereGeometry(2.5, 20, 20);
      const glow = new THREE.Mesh(glowGeometry, glowMaterial.clone());
      glow.position.set(x, y, z);
      scene.add(glow);
      glows.push(glow);
      // Orbit data
      nodeData.push({
        basePos: new THREE.Vector3(x, y, z),
        orbitAxis: new THREE.Vector3(
          Math.random(),
          Math.random(),
          Math.random()
        ).normalize(),
        orbitSpeed: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    // Connect nodes with lines if close enough
    const lines: THREE.Line[] = [];
    const lineMaterials: THREE.LineBasicMaterial[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 32) {
          const points = [nodes[i].position, nodes[j].position];
          const lineMaterial = new THREE.LineBasicMaterial({
            color: "#a259ff",
            opacity: 0.12,
            transparent: true,
          });
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
          lines.push(line);
          lineMaterials.push(lineMaterial);
        }
      }
    }

    // Animation loop (pulsing, color shift, orbit)
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      // Animate nodes
      nodes.forEach((node, idx) => {
        // Orbit motion
        const { basePos, orbitAxis, orbitSpeed, phase } = nodeData[idx];
        const angle = t * orbitSpeed + phase;
        const q = new THREE.Quaternion().setFromAxisAngle(orbitAxis, angle);
        const pos = basePos.clone().applyQuaternion(q);
        node.position.copy(pos);
        glows[idx].position.copy(pos);
        // Pulse scale
        const scale = 1 + 0.18 * Math.sin(t * 1.5 + idx);
        node.scale.set(scale, scale, scale);
        glows[idx].scale.set(scale * 1.7, scale * 1.7, scale * 1.7);
        // Color shift (purple <-> cyan)
        const colorPhase = 0.5 + 0.5 * Math.sin(t * 0.7 + idx);
        const nodeColor = new THREE.Color().lerpColors(
          new THREE.Color("#00eaff"), // cyan
          new THREE.Color("#a259ff"), // purple
          colorPhase
        );
        (node.material as THREE.MeshBasicMaterial).color.copy(nodeColor);
        (glows[idx].material as THREE.MeshBasicMaterial).color.copy(
          new THREE.Color().lerpColors(
            new THREE.Color("#a259ff"),
            new THREE.Color("#00eaff"),
            colorPhase
          )
        );
      });
      // Animate lines (color/opacity pulse)
      lineMaterials.forEach((mat, idx) => {
        const pulse = 0.1 + 0.08 * Math.sin(t * 1.2 + idx);
        mat.opacity = pulse;
        const colorPhase = 0.5 + 0.5 * Math.sin(t * 0.7 + idx);
        mat.color.copy(
          new THREE.Color().lerpColors(
            new THREE.Color("#a259ff"),
            new THREE.Color("#00eaff"),
            colorPhase
          )
        );
      });
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("wheel", preventWheel);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      mount.removeChild(renderer.domElement);
      renderer.dispose();

      // Dispose geometries and materials
      nodes.forEach((node) => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      glows.forEach((glow) => {
        glow.geometry.dispose();
        (glow.material as THREE.Material).dispose();
      });
      lines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none", // Don't block interactions
      }}
    />
  );
};

export default ThreeBackground;
