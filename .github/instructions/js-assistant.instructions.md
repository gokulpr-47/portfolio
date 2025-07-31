## 1 Core Principles

- Responsive + mobile-first
- Performance & memory safety first
- TypeScript everywhere
- Next.js 13 App Router: Server Components by default, Client only when necessary

## 2 Portfolio Standards

### 2.1 Component Structure

- Loading states & error boundaries
- ARIA / accessibility on all interactive elements
- SEO metadata on every page

### 2.2 Performance Targets

- Next/Image with correct `sizes`
- Pages pre-rendered with SSG
- Lazy-load non-critical code & assets
- ≤ 300 KB initial JS bundle

### 2.3 Responsive Rules

- Tailwind mobile-first utilities
- Breakpoints: 375 / 768 / 1024 +
- Tap targets ≥ 44 px
- Only GPU-friendly CSS transforms for animation

## 3 Three.js Rules

### 3.1 Memory Cleanup (critical)

// File: src/components/ThreeScene.tsx
// Place inside useEffect cleanup
geometry?.dispose();
material?.dispose();
texture?.dispose();
renderer?.dispose();

text

### 3.2 Mobile Detection

const isMobile = /Android|iPhone|iPad|iPod|…/.test(navigator.userAgent);
const renderer = new THREE.WebGLRenderer({
antialias: !isMobile,
powerPreference: isMobile ? 'low-power' : 'high-performance',
});
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2));

text

### 3.3 Performance Patterns

- `InstancedMesh` for repeats
- LOD for heavy models
- `mesh.frustumCulled = true`
- Merge small geometries
- Always use `BufferGeometry`

### 3.4 Next.js Integration

- `dynamic(() => import('./ThreeScene'), { ssr:false })`
- Wrap in `<Suspense>`
- Add `'use client'` at top of client files

### 3.5 Resize Handler

// File: src/components/ThreeScene.tsx Line 42
const handleResize = useCallback(() => {
const { innerWidth:w, innerHeight:h } = window;
camera.aspect = w / h;
camera.updateProjectionMatrix();
renderer.setSize(w, h);
}, [camera, renderer]);

useEffect(() => {
const r = throttle(handleResize, 100);
window.addEventListener('resize', r);
return () => window.removeEventListener('resize', r);
}, [handleResize]);

text

## 4 Code-Change Protocol

When Copilot suggests edits:

1. **Specify file & line numbers**
2. Show **existing lines** to replace
3. Show **new lines** to insert
4. Briefly explain _why_ (perf, bug-fix, a11y, etc.)

Example format:

File: src/components/ThreeScene.tsx
Lines: 15-18

// Replace
const scene = new THREE.Scene();

// With
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Improves contrast (#150)

text

Additions:

File: src/components/ThreeScene.tsx
Line: 58 (after last useEffect)

// Add cleanup to prevent memory leak
useEffect(() => {
return () => {
geometry?.dispose();
material?.dispose();
renderer?.dispose();
};
}, []);

text

## 5 Always Include

✓ TypeScript types  
✓ Mobile detection block  
✓ useEffect cleanup  
✓ Stats.js (dev only)  
✓ Progressive model / texture loading  
✓ File + line numbers in every suggestion

## 6 Never Include

✗ Memory leaks  
✗ Fixed viewport sizes  
✗ Blocking heavy loops on main thread  
✗ Uncompressed GLTF / textures  
✗ Suggestions without path/lines  
✗ Full rewrites when patch suffices

## 7 Testing Checklist

☐ 60 fps desktop / ≥ 30 fps mobile  
☐ Memory snapshots show stable usage  
☐ All breakpoints verified on devices  
☐ Core Web Vitals green  
☐ Accessibility audit passes

## 8 Optimization Checklist

- [ ] All Three.js objects disposed
- [ ] Mobile settings active
- [ ] Responsive across breakpoints
- [ ] Assets compressed
- [ ] Stats.js / Perf monitor hooked
- [ ] Error boundaries present
- [ ] Every suggestion cites file & line
