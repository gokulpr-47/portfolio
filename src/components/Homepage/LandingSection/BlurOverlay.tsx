import { useRef, useEffect } from "react";
import * as THREE from "three";

const BlurOverlay = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    console.log("BlurOverlay: Starting initialization");

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("BlurOverlay: WebGL not supported");
      return;
    }
    console.log("BlurOverlay: WebGL supported");

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    console.log("BlurOverlay: Canvas appended to mount");

    // Prevent wheel events from being captured by the canvas
    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener("wheel", preventWheel, {
      passive: false,
    });

    console.log("BlurOverlay: Wheel event listener added");

    // Shader uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
      u_scroll: { value: 0.0 },
    };

    // Blur overlay fragment shader
    const fragmentShader = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll;

      // Enhanced Gaussian blur function
      float gaussianBlur(vec2 uv, float blurRadius, float intensity) {
        float blur = 0.0;
        float totalWeight = 0.0;
        
        for (int i = -6; i <= 6; i++) {
          for (int j = -6; j <= 6; j++) {
            vec2 offset = vec2(float(i), float(j)) * blurRadius * 0.005 * intensity;
            float weight = exp(-(float(i*i + j*j)) / 18.0);
            blur += weight;
            totalWeight += weight;
          }
        }
        
        return blur / totalWeight;
      }

      // Radial blur effect
      float radialBlur(vec2 uv, vec2 center, float intensity) {
        vec2 dir = normalize(uv - center);
        float dist = length(uv - center);
        float blur = 0.0;
        
        for (int i = 0; i < 8; i++) {
          float t = float(i) / 8.0;
          vec2 samplePos = uv + dir * t * intensity * 0.02;
          blur += 1.0 / (1.0 + length(samplePos - center) * 10.0);
        }
        
        return blur / 8.0;
      }

      // Motion blur effect
      float motionBlur(vec2 uv, float time) {
        float blur = 0.0;
        vec2 motion = vec2(sin(time * 0.5), cos(time * 0.3)) * 0.01;
        
        for (int i = 0; i < 5; i++) {
          float t = float(i) / 5.0;
          vec2 samplePos = uv + motion * t;
          blur += 1.0 / (1.0 + length(samplePos) * 5.0);
        }
        
        return blur / 5.0;
      }

      // Main
      void main() {
        vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        float t = u_time * 0.3;
        vec2 mouse = (u_mouse / u_resolution) * 2.0 - 1.0;
        mouse.x *= u_resolution.x / u_resolution.y;
        float scroll = u_scroll * 0.001;

        // Base blur effect
        float baseBlur = gaussianBlur(uv, 1.0, 0.8 + 0.2 * sin(t));
        
        // Radial blur around mouse
        float mouseBlur = 0.0;
        if (length(mouse) > 0.01) {
          mouseBlur = radialBlur(uv, mouse, 0.5 + 0.3 * sin(t * 2.0));
        }
        
        // Motion blur effect
        float motionBlurEffect = motionBlur(uv, t);
        
        // Combine blur effects
        float totalBlur = baseBlur + mouseBlur * 0.3 + motionBlurEffect * 0.2;
        
        // Create blur overlay with subtle color
        vec3 blurColor = vec3(0.1, 0.2, 0.4); // Subtle blue tint
        float blurAlpha = 0.15 + 0.05 * sin(t * 1.5); // Animated opacity
        
        // Add some variation based on position
        float variation = 0.1 * sin(uv.x * 10.0 + t) * sin(uv.y * 8.0 + t * 0.7);
        blurAlpha += variation * 0.05;
        
        gl_FragColor = vec4(blurColor, blurAlpha * totalBlur);
      }
    `;

    // Plane with shader material
    const geometry = new THREE.PlaneGeometry(2, 2);

    try {
      const material = new THREE.ShaderMaterial({
        uniforms,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      console.log("BlurOverlay: Mesh added to scene");
    } catch (error) {
      console.error("BlurOverlay: Error creating shader material:", error);
      return;
    }

    // Responsive resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse interactivity
    let targetMouse = new THREE.Vector2(0, 0);
    let currentMouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = window.innerHeight - e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll interactivity
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    let running = true;
    const animate = () => {
      if (!running) return;
      uniforms.u_time.value = performance.now() / 1000;
      // Smooth mouse movement
      currentMouse.lerp(targetMouse, 0.05);
      uniforms.u_mouse.value.copy(currentMouse);
      uniforms.u_scroll.value = scrollY;
      renderer.render(scene, camera);

      // Log first few frames to confirm animation is running
      if (uniforms.u_time.value < 1) {
        console.log(
          "BlurOverlay: Animation frame rendered at",
          uniforms.u_time.value
        );
      }

      requestAnimationFrame(animate);
    };
    animate();

    console.log("BlurOverlay: Animation loop started");

    // Cleanup
    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      renderer.domElement.removeEventListener("wheel", preventWheel);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
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
        zIndex: 1, // Higher than background
        pointerEvents: "none", // Don't block interactions
      }}
    />
  );
};

export default BlurOverlay;
