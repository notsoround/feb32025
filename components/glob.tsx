import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AbstractBallProps {
  perlinTime?: number;
  perlinMorph?: number;
  perlinDNoise?: number;
  chromaRGBr?: number;
  chromaRGBg?: number;
  chromaRGBb?: number;
  chromaRGBn?: number;
  chromaRGBm?: number;
  sphereWireframe?: boolean;
  spherePoints?: boolean;
  spherePsize?: number;
  cameraSpeedY?: number;
  cameraSpeedX?: number;
  cameraZoom?: number;
  cameraGuide?: boolean;
}

const AbstractBall: React.FC<AbstractBallProps> = ({
  perlinTime = 25.0,
  perlinMorph = 25.0,
  perlinDNoise = 0.0,
  chromaRGBr = 7.5,
  chromaRGBg = 5.0,
  chromaRGBb = 7.0,
  chromaRGBn = 1.0,
  chromaRGBm = 1.0,
  sphereWireframe = false,
  spherePoints = false,
  spherePsize = 1.0,
  cameraSpeedY = 0.0,
  cameraSpeedX = 0.0,
  cameraZoom = 150,
  cameraGuide = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Store dynamic parameters in refs so we can change them without reinitializing
  const paramsRef = useRef({
    perlinTime,
    perlinMorph,
    perlinDNoise,
    chromaRGBr,
    chromaRGBg,
    chromaRGBb,
    chromaRGBn,
    chromaRGBm,
    sphereWireframe,
    spherePoints,
    spherePsize,
    cameraSpeedY,
    cameraSpeedX,
    cameraZoom,
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const pointRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const uniformsRef = useRef<any>({
    time: { value: 0.0 },
    RGBr: { value: chromaRGBr / 10 },
    RGBg: { value: chromaRGBg / 10 },
    RGBb: { value: chromaRGBb / 10 },
    RGBn: { value: chromaRGBn / 100 },
    RGBm: { value: chromaRGBm },
    morph: { value: perlinMorph },
    dnoise: { value: perlinDNoise },
    psize: { value: spherePsize }
  });

  // Initial Scene Setup (run only once)
  useEffect(() => {
    const width = mountRef.current!.clientWidth;
    const height = mountRef.current!.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, width / height, 1, 1000);
    camera.position.set(0, 10, paramsRef.current.cameraZoom);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.pointerEvents = 'none';

    mountRef.current!.appendChild(renderer.domElement);

    // Geometry and Material
    const geometry = new THREE.IcosahedronGeometry(20, 20);

    const vertexShader = document.getElementById('noiseVertexShader')?.textContent || '';
    const fragmentShader = document.getElementById('fragmentShader')?.textContent || '';

    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader,
      wireframe: paramsRef.current.sphereWireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    const point = new THREE.Points(geometry, material);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.geometry.morphTargetsRelative = true;

    scene.add(mesh);
    scene.add(point);

    // Save references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    materialRef.current = material;
    meshRef.current = mesh;
    pointRef.current = point;

    const animate = () => {
      const p = paramsRef.current;

      // Increment time
      uniformsRef.current.time.value += p.perlinTime / 10000;
      uniformsRef.current.morph.value = p.perlinMorph;
      uniformsRef.current.dnoise.value = p.perlinDNoise;
      uniformsRef.current.RGBr.value = p.chromaRGBr / 10;
      uniformsRef.current.RGBg.value = p.chromaRGBg / 10;
      uniformsRef.current.RGBb.value = p.chromaRGBb / 10;
      uniformsRef.current.RGBn.value = p.chromaRGBn / 100;
      uniformsRef.current.RGBm.value = p.chromaRGBm;
      uniformsRef.current.psize.value = p.spherePsize;

      if (meshRef.current && pointRef.current) {
        meshRef.current.rotation.y += p.cameraSpeedY / 100;
        meshRef.current.rotation.z += p.cameraSpeedX / 100;
        pointRef.current.rotation.y = meshRef.current.rotation.y;
        pointRef.current.rotation.z = meshRef.current.rotation.z;

        materialRef.current!.wireframe = p.sphereWireframe;
        meshRef.current.visible = !p.spherePoints;
        pointRef.current.visible = p.spherePoints;
      }

      cameraRef.current!.lookAt(scene.position);
      rendererRef.current!.render(scene, cameraRef.current!);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = mountRef.current!.clientWidth;
      const h = mountRef.current!.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
    };
  }, []);

  // Update parameters and camera position whenever props change
  useEffect(() => {
    // Update ref values to the new props
    paramsRef.current = {
      perlinTime,
      perlinMorph,
      perlinDNoise,
      chromaRGBr,
      chromaRGBg,
      chromaRGBb,
      chromaRGBn,
      chromaRGBm,
      sphereWireframe,
      spherePoints,
      spherePsize,
      cameraSpeedY,
      cameraSpeedX,
      cameraZoom
    };

    // Use GSAP to update camera and uniforms if needed
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 2,
        z: 300 - cameraZoom
      });
    }

    gsap.to(uniformsRef.current.RGBr, { duration: 1, value: Math.random() * 10 });
    gsap.to(uniformsRef.current.RGBg, { duration: 1, value: Math.random() * 10 });
    gsap.to(uniformsRef.current.RGBb, { duration: 1, value: Math.random() * 10 });
    gsap.to(uniformsRef.current.RGBn, { duration: 1, value: Math.random() * 2 });
    gsap.to(uniformsRef.current.RGBm, { duration: 1, value: Math.random() * 5 });

  }, [
    perlinTime,
    perlinMorph,
    perlinDNoise,
    chromaRGBr,
    chromaRGBg,
    chromaRGBb,
    chromaRGBn,
    chromaRGBm,
    sphereWireframe,
    spherePoints,
    spherePsize,
    cameraSpeedY,
    cameraSpeedX,
    cameraZoom
  ]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '500px' }} className='rounded-2xl mt-2'>
    </div>
  );
};

export default AbstractBall;