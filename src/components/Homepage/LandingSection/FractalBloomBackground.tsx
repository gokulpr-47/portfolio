import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const FractalBloomBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Detect device capabilities
    const checkDeviceCapabilities = () => {
      const isMobileDevice = window.innerWidth < 768;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Check for low-end devices
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memoryInfo = (navigator as any).deviceMemory || 4;

      console.log("Device capabilities:", {
        isMobileDevice,
        isTouchDevice,
        hardwareConcurrency,
        memoryInfo,
        windowWidth: window.innerWidth,
      });

      setIsMobile(isMobileDevice || isTouchDevice);
      // Temporarily disable performance restrictions for debugging
      setIsLowPerformance(false); // Changed from: hardwareConcurrency < 4 || memoryInfo < 4
    };

    checkDeviceCapabilities();
    window.addEventListener("resize", checkDeviceCapabilities);

    return () => window.removeEventListener("resize", checkDeviceCapabilities);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    console.log("FractalBloomBackground: Starting initialization");
    console.log(
      "FractalBloomBackground: isMobile:",
      isMobile,
      "isLowPerformance:",
      isLowPerformance
    );

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("FractalBloomBackground: WebGL not supported");
      return;
    }
    console.log("FractalBloomBackground: WebGL supported");

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable antialiasing on mobile
      powerPreference: "high-performance",
    });

    console.log("FractalBloomBackground: Renderer created");

    // Optimize renderer settings
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2)); // Limit pixel ratio on mobile
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    console.log("FractalBloomBackground: Canvas appended to mount");

    // Prevent wheel events from being captured by the canvas
    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener("wheel", preventWheel, {
      passive: false,
    });

    console.log("FractalBloomBackground: Wheel event listener added");

    // Shader uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
      u_scroll: { value: 0.0 },
      u_performance: { value: isLowPerformance ? 0.5 : 1.0 }, // Performance factor
    };

    // Optimized fragment shader with reduced complexity
    const fragmentShader = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll;
      uniform float u_performance;

      // Simplified hash function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      // Simplified atmospheric blur
      float atmosphericBlur(vec2 uv, vec2 pos, float depth) {
        float dist = length(uv - pos);
        float blurIntensity = 0.3 + 0.2 * sin(depth * 5.0);
        return exp(-dist * blurIntensity * 1.5);
      }

      // Simplified shape functions
      float techHexagon(vec2 uv, float radius, float depth) {
        float r = length(uv);
        float angle = atan(uv.y, uv.x);
        float hexagon = cos(floor(0.5 + 6.0 * angle / 6.2831) * 6.2831 / 6.0 - angle) * r;
        float hexShape = smoothstep(radius, radius - 0.02, hexagon);
        float node = smoothstep(0.08, 0.06, r);
        return hexShape + node * 0.3;
      }
      
      float digitalSquare(vec2 uv, float radius, float depth) {
        float square = smoothstep(radius, radius - 0.02, max(abs(uv.x), abs(uv.y)));
        float r = length(uv);
        float corners = 0.0;
        for (int i = 0; i < 4; i++) {
          float angle = float(i) * 3.14159 / 2.0;
          vec2 cornerPos = vec2(cos(angle), sin(angle)) * radius * 0.8;
          float corner = smoothstep(0.04, 0.02, length(uv - cornerPos));
          corners += corner;
        }
        return square + corners * 0.2;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        float t = u_time * 0.3; // Slower animation
        vec2 mouse = (u_mouse / u_resolution) * 2.0 - 1.0;
        mouse.x *= u_resolution.x / u_resolution.y;
        float scroll = u_scroll * 0.001;

        vec3 color = vec3(0.0, 0.05, 0.2);
        float bloom = 0.0;

        // Reduced number of shapes based on performance
        int numShapes = int(6.0 * u_performance);
        
        for (int i = 0; i < 8; i++) {
          if (i >= numShapes) break;
          
          float id = float(i);
          float speed = 0.6 + 0.3 * sin(id * 0.5);
          float offset = id * 0.785;
          
          vec2 pos = vec2(
            sin(t * speed + offset) * 1.6,
            cos(t * speed * 0.7 + offset) * 1.2
          );
          
          // Simplified movement
          pos += vec2(
            sin(t * 0.8 + id * 1.5) * 0.2,
            cos(t * 0.6 + id * 1.2) * 0.2
          );
          
          float pulse = 1.0 + 0.3 * sin(t * 1.5 + id * 0.5);
          float depth = 0.5 + 0.3 * sin(t + id);
          
          float shapeVal = 0.0;
          vec3 shapeColor = vec3(0.0);
          float baseSize = 0.08 + 0.04 * u_performance;
          
          if (mod(id, 2.0) < 1.0) {
            shapeVal = techHexagon(uv - pos, (baseSize + 0.03 * sin(t + id)) * pulse, depth);
            shapeColor = vec3(0.0, 0.3, 0.8);
          } else {
            shapeVal = digitalSquare(uv - pos, (baseSize + 0.025 * sin(t + id)) * pulse, depth);
            shapeColor = vec3(0.0, 0.2, 0.7);
          }
          
          float atmosphericEffect = atmosphericBlur(uv, pos, depth);
          float blurredShape = shapeVal * atmosphericEffect;
          
          color += shapeColor * blurredShape * 0.6;
          bloom += blurredShape;
        }

        color = clamp(color, 0.0, 0.7);
        float alpha = 0.3 + 0.15 * smoothstep(0.0, 1.0, bloom);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Plane with shader material
    const geometry = new THREE.PlaneGeometry(2, 2);

    try {
      const material = new THREE.ShaderMaterial({
        uniforms,
        fragmentShader,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      console.log("FractalBloomBackground: Mesh added to scene");
    } catch (error) {
      console.error(
        "FractalBloomBackground: Error creating shader material:",
        error
      );
      return;
    }

    // Optimized resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, isMobile ? 1 : 2)
        );
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Throttled mouse interactivity
    let targetMouse = new THREE.Vector2(0, 0);
    let currentMouse = new THREE.Vector2(0, 0);
    let mouseMoveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        targetMouse.x = e.clientX;
        targetMouse.y = window.innerHeight - e.clientY;
      }, 16); // ~60fps
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Throttled scroll handler
    let scrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollY = window.scrollY;
      }, 16);
    };
    window.addEventListener("scroll", handleScroll);

    // Frame rate limiting for performance
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    // Animation loop with frame rate limiting
    let running = true;
    const animate = (currentTime: number) => {
      if (!running) return;

      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        uniforms.u_time.value = currentTime / 1000;
        currentMouse.lerp(targetMouse, 0.05); // Slower mouse tracking
        uniforms.u_mouse.value.copy(currentMouse);
        uniforms.u_scroll.value = scrollY;
        renderer.render(scene, camera);
        lastFrameTime = currentTime;

        // Log first few frames to confirm animation is running
        if (lastFrameTime < 1000) {
          console.log(
            "FractalBloomBackground: Animation frame rendered at",
            currentTime
          );
        }
      }

      requestAnimationFrame(animate);
    };
    animate(0);

    console.log("FractalBloomBackground: Animation loop started");

    // Cleanup
    return () => {
      running = false;
      clearTimeout(resizeTimeout);
      clearTimeout(mouseMoveTimeout);
      clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      renderer.domElement.removeEventListener("wheel", preventWheel);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isMobile, isLowPerformance]);

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

export default FractalBloomBackground;
