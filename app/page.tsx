"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import * as THREE from "three";

const projects = [
  {
    title: "Nocturne — Brand Reel",
    type: "Commercial Edit",
    video:
      "https://cdn.coverr.co/videos/coverr-editing-videos-on-computer-1579/1080p.mp4",
  },
  {
    title: "Pulse — Music Narrative",
    type: "Music Video",
    video: "https://cdn.coverr.co/videos/coverr-woman-in-neon-light-8384/1080p.mp4",
  },
  {
    title: "Frame Zero — Documentary Cut",
    type: "Documentary",
    video:
      "https://cdn.coverr.co/videos/coverr-man-working-on-a-computer-1576/1080p.mp4",
  },
];

const steps = [
  "Discovery & script sync",
  "Assembly & scene rhythm",
  "Color, sound, and cinematic polish",
  "Final delivery & platform optimization",
];

const services = [
  "Cinematic Brand Films",
  "Music Video Editing",
  "Commercial Social Reels",
  "Documentary Post-Production",
];

const testimonials = [
  {
    name: "A. Karim, Studio Founder",
    quote:
      "Every frame felt intentional. The edit elevated our story into something people remember.",
  },
  {
    name: "Luna Apparel",
    quote:
      "Luxury pacing, perfect sound design, and seamless transitions. Exactly the premium look we needed.",
  },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
    reveals.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 86%" },
        }
      );
    });

    gsap.to("[data-parallax='slow']", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const points = 450;
    const positions = new Float32Array(points * 3);
    for (let i = 0; i < points * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 12;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.02, color: "#c9a66b" });
    const particleField = new THREE.Points(geometry, material);
    scene.add(particleField);

    const ambient = new THREE.AmbientLight("#ffffff", 0.4);
    const keyLight = new THREE.PointLight("#89a8ff", 1.5, 24);
    keyLight.position.set(2, 1, 4);
    scene.add(ambient, keyLight);

    const animate = () => {
      particleField.rotation.y += 0.0007;
      particleField.rotation.x += 0.0002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY, active: true });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070709] text-[#ece7dd]">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-60" />
      <div className="noise-overlay fixed inset-0 z-10" />
      {cursor.active && (
        <span className="dynamic-cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      )}

      <main className="relative z-20">
        <section className="reveal relative flex min-h-screen items-end px-6 pb-20 md:px-12 lg:px-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src="https://cdn.coverr.co/videos/coverr-editing-videos-on-computer-1579/1080p.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40 to-[#070709]" />
          <div className="relative max-w-5xl space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="tracking-[0.35em] text-xs uppercase text-[#dfba7f]"
            >
              Sarhal Studio • Cinematic Post Production
            </motion.p>
            <h1 className="font-[family-name:var(--font-serif)] text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
              Editing stories that <span className="text-[#dfba7f]">feel like cinema.</span>
            </h1>
            <p className="max-w-2xl text-lg text-[#ece7dd]/80">
              Premium edits for brands, artists, and filmmakers. Smooth transitions, emotional pacing, and
              luxury-grade visual storytelling.
            </p>
          </div>
        </section>

        <section className="reveal grid gap-10 px-6 py-24 md:px-12 lg:grid-cols-2 lg:px-20">
          <div className="space-y-5" data-parallax="slow">
            <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl">About Me</h2>
            <p className="text-[#ece7dd]/75">
              I craft rhythm-driven edits with a director&apos;s eye for mood, pacing, and emotional impact.
              Every project combines narrative structure, motion design, and cinematic finishing.
            </p>
          </div>
          <div className="glass rounded-3xl p-8 text-[#ece7dd]/85">
            8+ years in post-production, from short-form social campaigns to full cinematic reels for luxury
            brands.
          </div>
        </section>

        <section className="reveal px-6 py-24 md:px-12 lg:px-20">
          <h2 className="mb-10 font-[family-name:var(--font-serif)] text-4xl md:text-5xl">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="glass group overflow-hidden rounded-3xl">
                <div className="relative h-60 overflow-hidden">
                  <video
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:contrast-125"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={project.video}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="space-y-2 p-6">
                  <p className="text-xs tracking-[0.25em] uppercase text-[#dfba7f]">{project.type}</p>
                  <h3 className="text-2xl">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal px-6 py-24 md:px-12 lg:px-20">
          <h2 className="mb-10 font-[family-name:var(--font-serif)] text-4xl md:text-5xl">Editing Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="glass rounded-2xl px-6 py-5 transition hover:border-[#dfba7f]/60">
                {service}
              </div>
            ))}
          </div>
        </section>

        <section className="reveal px-6 py-24 md:px-12 lg:px-20">
          <h2 className="mb-10 font-[family-name:var(--font-serif)] text-4xl md:text-5xl">Client Testimonials</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="glass rounded-2xl p-7">
                <p className="text-lg text-[#ece7dd]/85">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-4 text-sm uppercase tracking-[0.18em] text-[#dfba7f]">{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="reveal px-6 py-24 md:px-12 lg:px-20">
          <h2 className="mb-10 font-[family-name:var(--font-serif)] text-4xl md:text-5xl">Workflow Process</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="glass rounded-2xl px-6 py-5">
                <span className="mr-4 text-[#dfba7f]">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </div>
            ))}
          </div>
        </section>

        <section className="reveal px-6 pb-28 pt-24 md:px-12 lg:px-20">
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl">Contact</h2>
            <p className="mt-4 max-w-2xl text-[#ece7dd]/80">Let&apos;s create a filmic edit that turns your vision into motion.</p>
            <form className="mt-8 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Name"
                className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none focus:border-[#dfba7f]"
              />
              <input
                placeholder="Email"
                type="email"
                className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none focus:border-[#dfba7f]"
              />
              <textarea
                placeholder="Project brief"
                className="min-h-36 rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none md:col-span-2 focus:border-[#dfba7f]"
              />
              <button className="rounded-xl bg-[#dfba7f] px-6 py-3 font-medium text-black transition hover:bg-[#f0c57f] md:w-max">
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
