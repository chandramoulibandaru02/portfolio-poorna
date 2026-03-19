import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// ============================================================
// ENTRY SCENE — Cinematic 3D Tech Universe
// Central glowing tech core + DNA helix + orbital rings +
// neural particle cloud + shooting stars
// ============================================================

export default function EntryScene({ onEnter }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    scene.fog = new THREE.FogExp2(0x000510, 0.018);

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 500);
    camera.position.set(0, 2, 22);
    camera.lookAt(0, 0, 0);

    // ============================================================
    // LIGHTS
    // ============================================================
    scene.add(new THREE.AmbientLight(0x0a0a30, 2));

    const coreLight = new THREE.PointLight(0x00d4ff, 12, 30);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 8, 25);
    purpleLight.position.set(-8, 6, 4);
    scene.add(purpleLight);

    const pinkLight = new THREE.PointLight(0xf72585, 6, 20);
    pinkLight.position.set(8, -4, 6);
    scene.add(pinkLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 1.5);
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    // ============================================================
    // 1. STARFIELD BACKGROUND
    // ============================================================
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3]     = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      starSizes[i] = Math.random() * 1.5 + 0.3;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ============================================================
    // 2. CENTRAL TECH CORE — Glowing Icosahedron
    // ============================================================
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner solid sphere
    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x001a3a,
        emissive: 0x003a6a,
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.95,
      })
    );
    coreGroup.add(innerSphere);

    // Holographic wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icosahedron);

    // Outer glowing dodecahedron
    const dodGeo = new THREE.DodecahedronGeometry(2.8);
    const dodMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const dodecahedron = new THREE.Mesh(dodGeo, dodMat);
    coreGroup.add(dodecahedron);

    // Core glow halo
    const haloGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.scale.setScalar(1.4);
    coreGroup.add(halo);

    // ============================================================
    // 3. ORBITAL RINGS
    // ============================================================
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringDefs = [
      { radius: 4.5,  tube: 0.018, color: 0x00d4ff, rotX: Math.PI / 2,  rotY: 0,              opacity: 0.8 },
      { radius: 5.5,  tube: 0.012, color: 0xa855f7, rotX: Math.PI / 4,  rotY: Math.PI / 6,    opacity: 0.6 },
      { radius: 6.5,  tube: 0.010, color: 0xf72585, rotX: Math.PI / 6,  rotY: Math.PI / 3,    opacity: 0.5 },
      { radius: 7.5,  tube: 0.008, color: 0x00ffaa, rotX: -Math.PI / 3, rotY: Math.PI / 5,    opacity: 0.4 },
    ];

    const rings = ringDefs.map(({ radius, tube, color, rotX, rotY, opacity }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 200);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      ringGroup.add(mesh);
      return mesh;
    });

    // Orbital nodes on rings
    const orbitalNodeGroup = new THREE.Group();
    scene.add(orbitalNodeGroup);

    ringDefs.forEach(({ radius, color }, ri) => {
      const nodeCount = 4 + ri * 2;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const nodeGeo = new THREE.SphereGeometry(0.06 + Math.random() * 0.04, 8, 8);
        const nodeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * (ri % 2 === 0 ? 0 : radius * 0.3),
          Math.sin(angle) * radius * (ri % 2 === 0 ? 1 : 0)
        );
        orbitalNodeGroup.add(node);
      }
    });

    // ============================================================
    // 4. DNA DOUBLE HELIX — Spinning around the core
    // ============================================================
    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    const helixSteps = 60;
    const helixRadius  = 3.4;
    const helixHeight  = 14;

    for (let i = 0; i < helixSteps; i++) {
      const t = i / helixSteps;
      const angle = t * Math.PI * 6;
      const y = (t - 0.5) * helixHeight;

      // Strand A (cyan)
      const sA = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 1.5 })
      );
      sA.position.set(Math.cos(angle) * helixRadius, y, Math.sin(angle) * helixRadius);
      helixGroup.add(sA);

      // Strand B (purple)
      const sB = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 1.5 })
      );
      sB.position.set(Math.cos(angle + Math.PI) * helixRadius, y, Math.sin(angle + Math.PI) * helixRadius);
      helixGroup.add(sB);

      // Crossbars (every 3 steps)
      if (i % 3 === 0) {
        const pA = sA.position.clone();
        const pB = sB.position.clone();
        const mid = pA.clone().lerp(pB, 0.5);
        const dist = pA.distanceTo(pB);
        const barGeo = new THREE.CylinderGeometry(0.02, 0.02, dist, 6);
        const barMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.copy(mid);
        bar.lookAt(pA);
        bar.rotateX(Math.PI / 2);
        helixGroup.add(bar);
      }
    }

    // ============================================================
    // 5. NEURAL PARTICLE CLOUD
    // ============================================================
    const neuralCount = 250;
    const neuralPositions = new Float32Array(neuralCount * 3);
    const neuralData = [];

    for (let i = 0; i < neuralCount; i++) {
      const r = 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      neuralPositions[i * 3]     = x;
      neuralPositions[i * 3 + 1] = y;
      neuralPositions[i * 3 + 2] = z;
      neuralData.push({ x, y, z, vx: (Math.random() - 0.5) * 0.01, vy: (Math.random() - 0.5) * 0.01, vz: (Math.random() - 0.5) * 0.01 });
    }

    const neuralGeo = new THREE.BufferGeometry();
    neuralGeo.setAttribute('position', new THREE.BufferAttribute(neuralPositions, 3));
    const neuralMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const neuralCloud = new THREE.Points(neuralGeo, neuralMat);
    scene.add(neuralCloud);

    // ============================================================
    // 6. FLOATING GEOMETRIC SHAPES (accent objects)
    // ============================================================
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);

    const floatDefs = [
      { geo: new THREE.TetrahedronGeometry(0.4),  color: 0x00d4ff, pos: [-9, 4, -3],  speed: 0.008 },
      { geo: new THREE.OctahedronGeometry(0.35),  color: 0xa855f7, pos: [8, -3, -4],  speed: 0.012 },
      { geo: new THREE.IcosahedronGeometry(0.3),  color: 0xf72585, pos: [-7, -4, 2],  speed: 0.010 },
      { geo: new THREE.TetrahedronGeometry(0.28), color: 0x00ffaa, pos: [9, 5, -2],   speed: 0.007 },
      { geo: new THREE.OctahedronGeometry(0.25),  color: 0xffd700, pos: [-5, 6, -5],  speed: 0.015 },
      { geo: new THREE.IcosahedronGeometry(0.22), color: 0x00d4ff, pos: [6, 5.5, 3],  speed: 0.009 },
    ];

    const floatMeshes = floatDefs.map(({ geo, color, pos, speed }) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: Math.random() > 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.userData = { speed, origin: new THREE.Vector3(...pos), phase: Math.random() * Math.PI * 2 };
      floatGroup.add(mesh);
      return mesh;
    });

    // ============================================================
    // 7. SHOOTING STARS / COMETS
    // ============================================================
    const cometGroup = new THREE.Group();
    scene.add(cometGroup);

    const comets = Array.from({ length: 6 }, () => {
      const geo = new THREE.BufferGeometry();
      const tailLen = 40;
      const pts = new Float32Array(tailLen * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, linewidth: 1 });
      const line = new THREE.Line(geo, mat);
      cometGroup.add(line);
      return {
        line,
        pts,
        active: false,
        t: 0,
        startPos: new THREE.Vector3(),
        dir: new THREE.Vector3(),
        speed: 0,
        tailLen,
      };
    });

    const spawnComet = (c) => {
      c.active = true;
      c.t = 0;
      const side = Math.random() > 0.5 ? 1 : -1;
      c.startPos.set(side * (18 + Math.random() * 10), 10 + Math.random() * 8, -5 + Math.random() * 10);
      c.dir.set(-side * (0.5 + Math.random() * 0.5), -(0.5 + Math.random() * 0.5), 0).normalize();
      c.speed = 0.3 + Math.random() * 0.4;
      c.line.material.opacity = 0.7 + Math.random() * 0.3;
    };

    comets.forEach((c, i) => setTimeout(() => spawnComet(c), i * 1800));

    // ============================================================
    // MOUSE PARALLAX
    // ============================================================
    let targetMouseX = 0, targetMouseY = 0;
    let currentMouseX = 0, currentMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ============================================================
    // ANIMATION LOOP
    // ============================================================
    let t = 0;
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.006;

      // Mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Core rotation
      coreGroup.rotation.y += 0.004;
      coreGroup.rotation.x = Math.sin(t * 0.3) * 0.08;
      icosahedron.rotation.x -= 0.008;
      icosahedron.rotation.z += 0.005;
      dodecahedron.rotation.y += 0.007;
      dodecahedron.rotation.z -= 0.004;

      // Core light pulse
      coreLight.intensity = 10 + Math.sin(t * 2.5) * 3;
      innerSphere.material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.4;

      // Rings
      rings.forEach((ring, i) => {
        ring.rotation.z += (i % 2 === 0 ? 1 : -1) * (0.003 + i * 0.001);
      });
      ringGroup.rotation.y += 0.002;

      // Orbital nodes
      orbitalNodeGroup.rotation.y += 0.003;

      // Helix spin
      helixGroup.rotation.y += 0.008;

      // Floating shapes
      floatMeshes.forEach((mesh) => {
        const { speed, origin, phase } = mesh.userData;
        mesh.position.y = origin.y + Math.sin(t * speed * 60 + phase) * 0.8;
        mesh.rotation.x += speed * 1.2;
        mesh.rotation.y += speed;
        mesh.rotation.z += speed * 0.8;
      });

      // Neural cloud drift
      neuralCloud.rotation.y += 0.0008;
      neuralCloud.rotation.x = Math.sin(t * 0.2) * 0.05;

      // Comets
      comets.forEach((c) => {
        if (!c.active) return;
        c.t += c.speed;
        const pos = c.startPos.clone().addScaledVector(c.dir, c.t);

        // Build tail by shifting positions
        for (let i = c.tailLen - 1; i > 0; i--) {
          c.pts[i * 3]     = c.pts[(i - 1) * 3];
          c.pts[i * 3 + 1] = c.pts[(i - 1) * 3 + 1];
          c.pts[i * 3 + 2] = c.pts[(i - 1) * 3 + 2];
        }
        c.pts[0] = pos.x; c.pts[1] = pos.y; c.pts[2] = pos.z;
        c.line.geometry.attributes.position.needsUpdate = true;

        if (c.t > 50) {
          c.active = false;
          c.line.material.opacity = 0;
          setTimeout(() => spawnComet(c), 1500 + Math.random() * 3000);
        }
      });

      // Camera parallax
      camera.position.x += (currentMouseX * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (currentMouseY * 1.5 + 2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // --- Key Enter ---
    const handleKey = (e) => { if (e.key === 'Enter') onEnter(); };
    window.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keydown', handleKey);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onEnter]);

  return (
    <div className="fixed inset-0 z-50" style={{ background: '#000510' }}>
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,5,16,0.75) 100%)',
          zIndex: 5,
        }}
      />

      {/* Top badge */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
      >
        <p
          className="text-xs tracking-[0.45em] uppercase"
          style={{ color: 'rgba(0,212,255,0.65)', fontFamily: 'Orbitron, Space Grotesk, sans-serif' }}
        >
          Welcome to the Portfolio of
        </p>
      </motion.div>

      {/* Center HUD */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 1.2, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1
            className="text-5xl md:text-7xl font-black mb-1 leading-none"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #f72585 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.6))',
            }}
          >
            POORNA SAI
          </h1>
          <h1
            className="text-5xl md:text-7xl font-black mb-5 leading-none"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              background: 'linear-gradient(135deg, #a855f7 0%, #f72585 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.6))',
            }}
          >
            MUKKA
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #00d4ff)' }} />
            <p
              className="text-sm md:text-base tracking-[0.28em] uppercase"
              style={{ color: 'rgba(148,200,255,0.85)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Computer Science Engineer
            </p>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(168,85,247,0.7)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            AI Enthusiast · Java Developer · Data Explorer
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="flex gap-6 mb-10"
        >
          {[
            { value: '2+', label: 'Projects' },
            { value: '3+', label: 'Certs' },
            { value: '98%', label: 'Top Grade' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(0,212,255,0.06)',
                border: '1px solid rgba(0,212,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                className="text-xl font-black"
                style={{
                  fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </div>
              <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(148,163,184,0.6)', fontFamily: 'Space Grotesk, sans-serif' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ delay: 2.6, duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-center pointer-events-auto"
        >
          <button
            onClick={onEnter}
            className="btn-neon text-sm md:text-base group relative overflow-hidden"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              letterSpacing: '0.18em',
              padding: '0.85rem 2.5rem',
              boxShadow: '0 0 30px rgba(0,212,255,0.3), 0 0 60px rgba(168,85,247,0.15)',
            }}
          >
            <span className="relative z-10">⬡ ENTER PORTFOLIO ⬡</span>
          </button>
          <p className="mt-3 text-xs" style={{ color: 'rgba(0,212,255,0.35)', letterSpacing: '0.25em', fontFamily: 'Space Grotesk, sans-serif' }}>
            OR PRESS ENTER
          </p>
        </motion.div>
      </div>

      {/* Corner brackets */}
      {[
        { pos: 'top-5 left-5',    borders: 'border-t-2 border-l-2' },
        { pos: 'top-5 right-5',   borders: 'border-t-2 border-r-2' },
        { pos: 'bottom-5 left-5', borders: 'border-b-2 border-l-2' },
        { pos: 'bottom-5 right-5',borders: 'border-b-2 border-r-2' },
      ].map(({ pos, borders }, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-10 h-10 ${borders} pointer-events-none z-20`}
          style={{ borderColor: 'rgba(0,212,255,0.35)' }}
        />
      ))}

      {/* Bottom scan-line decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none"
      >
        <div className="h-px w-64" style={{ background: 'linear-gradient(90deg, transparent, #00d4ff 30%, #a855f7 70%, transparent)' }} />
      </motion.div>
    </div>
  );
}
