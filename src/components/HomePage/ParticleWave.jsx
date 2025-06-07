// components/ParticleWave.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

const ParticleWave = () => {
    const containerRef = useRef();
    const wrapperRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        let camera, scene, renderer, particles = [];
        const SEPARATION = 100, AMOUNTX = 15, AMOUNTY = 15;
        let count = 0;

        const container = containerRef.current;

        // Setup Camera
        camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        // Particle material
        const spriteTexture = new THREE.TextureLoader().load(
            'https://threejs.org/examples/textures/sprites/disc.png'
        );
        const material = new THREE.SpriteMaterial({
            map: spriteTexture,
            color: 0xffffff
        });

        // Generate particles
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const particle = particles[i++] = new THREE.Sprite(material);
                particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                scene.add(particle);
            }
        }

        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Stats monitor
        const stats = new Stats();
        container.appendChild(stats.dom);

        // Resize listener
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);

        // Render loop
        const render = () => {
            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const particle = particles[i++];
                    particle.position.y =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;
                    particle.scale.x = particle.scale.y =
                        (Math.sin((ix + count) * 0.3) + 1) * 4 +
                        (Math.sin((iy + count) * 0.5) + 1) * 4;
                }
            }

            renderer.render(scene, camera);
            count += 0.1;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            render();
            stats.update();
        };

        animate();

        // ScrollSmoother
        const contentHeight = contentRef.current.offsetHeight;
        const maxOffset = contentHeight - window.innerHeight;
        const a = 1 / maxOffset;
        const b = 1 - a * maxOffset;

        ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1,
            onUpdate: self => {
                const progress = a * self.offset(self.wrapper(), 0) + b;
                camera.position.z = 1000 - progress * 1500;
                camera.position.y = Math.sin(progress * 4) * 100;
            }
        });

        return () => {
            window.removeEventListener('resize', onWindowResize);
            ScrollSmoother.get() && ScrollSmoother.get().kill();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            id="wrapper"
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                zIndex: 0
            }}
        >
            <section
                ref={contentRef}
                id="content"
                style={{
                    height: '200vh', // Enough to allow scrolling
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Add your real content here if needed */}
            </section>

            <div
                ref={containerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default ParticleWave;
