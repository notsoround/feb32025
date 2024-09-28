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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const pointRef = useRef<THREE.Points | null>(null);

  const uniformsRef = useRef({
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

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, width / height, 1, 1000);
    camera.position.set(0, 10, cameraZoom);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(20, 20);
    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      side: THREE.DoubleSide,
      vertexShader: document.getElementById('noiseVertexShader')?.textContent || '',
      fragmentShader: document.getElementById('fragmentShader')?.textContent || '',
      wireframe: sphereWireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    const point = new THREE.Points(geometry, material);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.geometry.morphTargetsRelative = true;

    scene.add(mesh);
    scene.add(point);

    const animate = () => {
      uniformsRef.current.time.value += perlinTime / 10000;
      uniformsRef.current.morph.value = perlinMorph;
      uniformsRef.current.dnoise.value = perlinDNoise;
      uniformsRef.current.RGBr.value = chromaRGBr / 10;
      uniformsRef.current.RGBg.value = chromaRGBg / 10;
      uniformsRef.current.RGBb.value = chromaRGBb / 10;
      uniformsRef.current.RGBn.value = chromaRGBn / 100;
      uniformsRef.current.RGBm.value = chromaRGBm;
      uniformsRef.current.psize.value = spherePsize;

      mesh.rotation.y += cameraSpeedY / 100;
      mesh.rotation.z += cameraSpeedX / 100;

      point.rotation.y = mesh.rotation.y;
      point.rotation.z = mesh.rotation.z;

      material.wireframe = sphereWireframe;
      mesh.visible = !spherePoints;
      point.visible = spherePoints;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    materialRef.current = material;
    meshRef.current = mesh;
    pointRef.current = point;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [perlinTime, perlinMorph, perlinDNoise, chromaRGBr, chromaRGBg, chromaRGBb, chromaRGBn, chromaRGBm, sphereWireframe, spherePoints, spherePsize, cameraSpeedY, cameraSpeedX, cameraZoom]);

  useEffect(() => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 2,
        z: 300 - cameraZoom
      });

      gsap.to(uniformsRef.current.RGBr, { duration: 1, value: Math.random() * 10 });
      gsap.to(uniformsRef.current.RGBg, { duration: 1, value: Math.random() * 10 });
      gsap.to(uniformsRef.current.RGBb, { duration: 1, value: Math.random() * 10 });
      gsap.to(uniformsRef.current.RGBn, { duration: 1, value: Math.random() * 2 });
      gsap.to(uniformsRef.current.RGBm, { duration: 1, value: Math.random() * 5 });
    }
  }, [cameraZoom]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default AbstractBall;