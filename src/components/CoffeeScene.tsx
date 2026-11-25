
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function CoffeeCup() {
  const cupRef = useRef<THREE.Group>(null);
  const floatingRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Group>(null);

  const scrollRotation = useRef(0);
  const mousePosition = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current.x =
      (event.clientX / window.innerWidth) * 2 - 1;

    mousePosition.current.y =
      -(event.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);

  const { viewport } = useThree();

const isMobile = viewport.width < 4;

const heroX = isMobile ? 0.15 : viewport.width * 0.28;
const coffeeX = isMobile ? 0.15 : viewport.width * 0.29;
const menuX = isMobile ? 0.15 : viewport.width * 0.32;
const storyX = isMobile ? 0.15 : viewport.width * 0.29;

  // Create the cup geometry
  const cupGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, -1.3),
      new THREE.Vector2(0.58, -1.3),
      new THREE.Vector2(0.62, -1.25),
      new THREE.Vector2(0.85, 1.05),
      new THREE.Vector2(0.88, 1.12),
      new THREE.Vector2(0.78, 1.12),
      new THREE.Vector2(0.75, 1.02),
      new THREE.Vector2(0.55, -1.12),
      new THREE.Vector2(0, -1.12),
    ];

    const geometry = new THREE.LatheGeometry(points, 128);

    // Add subtle vertical ribs
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const y = positions.getY(i);

      const angle = Math.atan2(z, x);
      const height = (y + 1.3) / 2.5;
      const rib = Math.sin(angle * 38) * 0.012 * (0.5 + height * 0.5);

      const factor = 1 + rib;

      positions.setX(i, x * factor);
      positions.setZ(i, z * factor);
    }

    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Create the white lid
  const lidGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 1.1),
      new THREE.Vector2(0.72, 1.1),
      new THREE.Vector2(0.88, 1.13),
      new THREE.Vector2(0.92, 1.18),
      new THREE.Vector2(0.89, 1.23),
      new THREE.Vector2(0.78, 1.25),
      new THREE.Vector2(0, 1.25),
    ];

    return new THREE.LatheGeometry(points, 128);
  }, []);

  // Create the Costa logo texture
  const logoTexture = useMemo(() => {
    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 256;

    const context = canvas.getContext("2d");

    if (context) {
      context.clearRect(0, 0, 512, 256);

      context.fillStyle = "#ffffff";
      context.textAlign = "center";

      context.font = "bold 100px Georgia";
      context.fillText("COSTA", 256, 125);

      context.font = "bold 35px Arial";
      context.letterSpacing = "12px";
      context.fillText("COFFEE", 256, 180);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }, []);

// Scroll-based animation




useEffect(() => {
  const cup = cupRef.current;

  if (!cup) return;

  const getProgress = (selector: string) => {
    const section = document.querySelector(selector);

    if (!section) return 0;

    const maxScroll = Math.max(
      1,
      ScrollTrigger.maxScroll(window)
    );

    const top =
      section.getBoundingClientRect().top +
      window.scrollY;

    return gsap.utils.clamp(0, 1, top / maxScroll);
  };

  const coffeeProgress = getProgress("#coffee");
  const menuProgress = getProgress("#menu");
  const storyProgress = getProgress("#story");

const initialScale = isMobile ? 0.27 : 0.58;
const menuScale = isMobile ? 0.24 : 0.36;
const storyScale = isMobile ? 0.26 : 0.5;

  const ctx = gsap.context(() => {

    // INITIAL STATE
   gsap.set(cup.position, {
  x: heroX,
  y: isMobile ? -0.55 : 0,
  z: 0,
});

    gsap.set(cup.rotation, {
      x: 0,
      z: 0,
    });

    gsap.set(cup.scale, {
      x: initialScale,
      y: initialScale,
      z: initialScale,
    });

    // MASTER TIMELINE
    const journey = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => `+=${ScrollTrigger.maxScroll(window)}`,
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // CONTINUOUS ROTATION
    journey.to(
      scrollRotation,
      {
        current: Math.PI * 2,
        duration: 1,
        ease: "none",
      },
      0
    );


// HERO -> OUR COFFEE
journey.to(
  cup.position,
  {
    x: coffeeX,
    y: isMobile ? -2.8 : 0.12,
    duration: coffeeProgress,
    ease: "power1.inOut",
  },
  0
);

    journey.to(
      cup.rotation,
      {
        x: -0.15,
        z: 0.1,
        duration: coffeeProgress,
        ease: "power1.inOut",
      },
      0
    );

    // OUR COFFEE -> MENU
    journey.to(
      cup.position,
      {
        x: menuX,
        y: -0.08,
        duration: Math.max(0.001, menuProgress - coffeeProgress),
        ease: "power1.inOut",
      },
      coffeeProgress
    );

    journey.to(
      cup.rotation,
      {
        x: 0.05,
        z: -0.12,
        duration: Math.max(0.001, menuProgress - coffeeProgress),
        ease: "power1.inOut",
      },
      coffeeProgress
    );

    journey.to(
      cup.scale,
      {
        x: menuScale,
        y: menuScale,
        z: menuScale,
        duration: Math.max(0.001, menuProgress - coffeeProgress),
        ease: "power1.inOut",
      },
      coffeeProgress
    );

    // MENU -> OUR STORY
    journey.to(
      cup.position,
      {
        x: storyX,
        y: 0.08,
        duration: Math.max(0.001, storyProgress - menuProgress),
        ease: "power1.inOut",
      },
      menuProgress
    );

    journey.to(
      cup.scale,
      {
        x: storyScale,
        y: storyScale,
        z: storyScale,
        duration: Math.max(0.001, storyProgress - menuProgress),
        ease: "power1.inOut",
      },
      menuProgress
    );

    journey.to(
      cup.rotation,
      {
        x: 0,
        z: 0,
        duration: Math.max(0.001, storyProgress - menuProgress),
        ease: "power1.inOut",
      },
      menuProgress
    );

    // FINAL POSITION
    journey.to(
      cup.position,
      {
        y: 0,
        duration: Math.max(0.001, 1 - storyProgress),
        ease: "power1.inOut",
      },
      storyProgress
    );

  });

  return () => {
    ctx.revert();
  };

}, [heroX, coffeeX, menuX, storyX, isMobile]);



  // Continuous animation
 

useFrame((state, delta) => {
  const cup = cupRef.current;
  const floating = floatingRef.current;

  if (!cup || !floating) return;

  // Synchronize shadow with the cup
if (shadowRef.current && cupRef.current) {
  shadowRef.current.position.x = cupRef.current.position.x;
}

  // Rotation controlled by scrolling
  cup.rotation.y =
    scrollRotation.current +
    state.clock.elapsedTime * 0.18;

  // Floating animation
  const floatY =
    Math.sin(state.clock.elapsedTime * 1.2) * 0.045;

  floating.position.y = THREE.MathUtils.damp(
    floating.position.y,
    floatY,
    3,
    delta
  );

  // Mouse interaction
  const targetRotationX = mousePosition.current.y * 0.07;
  const targetRotationZ = -mousePosition.current.x * 0.08;

  floating.rotation.x = THREE.MathUtils.damp(
    floating.rotation.x,
    targetRotationX,
    3,
    delta
  );

  floating.rotation.z = THREE.MathUtils.damp(
    floating.rotation.z,
    targetRotationZ,
    3,
    delta
  );
});



return (
  <>
    {/* Main cup group */}
    <group ref={cupRef}>
      <group ref={floatingRef}>

        {/* Main cup body */}
        <mesh
          geometry={cupGeometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#8f1d3c"
            roughness={0.32}
            metalness={0.02}
          />
        </mesh>

        {/* White plastic lid */}
        <mesh geometry={lidGeometry} castShadow>
          <meshStandardMaterial
            color="#f7f5f0"
            roughness={0.22}
          />
        </mesh>

        {/* Costa logo */}
        <mesh position={[0, 0.05, 0.79]}>
          <planeGeometry args={[0.95, 0.48]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>

      </group>
    </group>

    {/* Synchronized shadow */}
    <group ref={shadowRef}>
      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.3}
        scale={3}
        blur={2}
        far={3}
      />
    </group>
  </>
);
}

export default function CoffeeScene() {
  return (
    <div className="coffee-scene">
      <Canvas
        camera={{
          position: [0, 0, 5.5],
          fov: 35,
        }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[3, 5, 5]}
          intensity={2.5}
          castShadow
        />

        <pointLight
          position={[-3, 1, 2]}
          intensity={1.5}
          color="#ffb8c8"
        />

        <CoffeeCup />

      </Canvas>
    </div>
  );
}
