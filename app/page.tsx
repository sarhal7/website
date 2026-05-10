"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Mesh } from "three";

type Project = {
  title: string;
  details: string;
  reel: string;
};

const projects: Project[] = [
  {
    title: "Noir Brand Film",
    details: "Luxury campaign edit with dramatic pacing and cinematic grade.",
    reel: "https://cdn.coverr.co/videos/coverr-empty-road-at-night-1579/1080p.mp4",
  },
  {
    title: "Pulse Fashion Reel",
    details: "Fast-cut social reel with texture overlays and modern transitions.",
    reel: "https://cdn.coverr.co/videos/coverr-a-journey-through-the-city-1560/1080p.mp4",
  },
  {
    title: "Atlas Documentary",
    details: "Emotional narrative edit with restrained sound-space rhythm.",
    reel: "https://cdn.coverr.co/videos/coverr-sunset-over-mountains-1573/1080p.mp4",
  },
];

const services = [
  "Brand Films & Commercial Edits",
  "Music Video Narrative Cutting",
  "Social Reels & Vertical Campaigns",
  "Color Finishing & Motion Graphics",
];

const testimonials = [
  {
    quote:
      "Every frame felt intentional. The final film looked like a premium studio production.",
    name: "Noura, Creative Producer",
  },
  {
    quote:
      "The pacing and emotional arc transformed our footage into a story clients remember.",
    name: "Ayman, Founder",
  },
];

const workflow = [
  "Discovery & Story Blueprint",
  "Edit Assembly & Narrative Structure",
  "Cinematic Polish & Color Finish",
  "Delivery Formats & Launch Support",
];

function Orb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.x += delta * 0.2;
  });

  return (
    <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 8]} />
        <MeshDistortMaterial color="#8b5cf6" emissive="#4338ca" roughness={0.12} distort={0.35} speed={1.2} />
      </mesh>
    </Float>
  );
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const { scrollYProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out" },
      );
    }, heroRef);

    const move = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: event.clientX - 16,
        y: event.clientY - 16,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      ctx.revert();
    };
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    setSubmitMessage("Inquiry received. I’ll reach out soon.");
  };

  return (
    <main className="site-shell bg-[#06060a] text-[#f4f4f5]">
      <div ref={cursorRef} className="dynamic-cursor" />

      <section ref={heroRef} className="relative min-h-screen overflow-hidden px-6 pb-20 pt-12 md:px-16">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src="https://cdn.coverr.co/videos/coverr-filming-a-road-at-night-1578/1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.2),transparent_45%),linear-gradient(to_bottom,rgba(6,6,10,0.45),rgba(6,6,10,0.95))]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="hero-reveal mb-6 inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] backdrop-blur">
              Cinematic Video Editor
            </p>
            <h1 className="hero-reveal max-w-4xl font-serif text-5xl leading-[1.06] md:text-7xl">
              I craft <span className="text-violet-300">immersive films</span> for bold brands.
            </h1>
            <p className="hero-reveal mt-8 max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
              A futuristic, story-driven post-production studio blending editorial rhythm, elegant motion, and premium visual finishing.
            </p>
            <div className="hero-reveal mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                Watch Featured Reels
              </a>
              <a href="#contact" className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10">
                Start a Project
              </a>
            </div>
          </div>
          <div className="glass-panel h-[380px] overflow-hidden rounded-3xl border border-white/15 bg-white/5">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 46 }}>
              <ambientLight intensity={0.9} />
              <directionalLight position={[2, 2, 3]} intensity={2} color="#a78bfa" />
              <Orb />
            </Canvas>
          </div>
        </div>
      </section>

      <motion.section ref={aboutRef} style={{ y: parallaxY }} className="mx-auto max-w-6xl px-6 py-24 md:px-16" id="about" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">About Me</p>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl md:text-5xl">Director-led editing with cinematic precision and emotional storytelling.</h2>
        <p className="mt-6 max-w-3xl text-zinc-300 leading-8">
          I collaborate with filmmakers, agencies, and founders to transform raw footage into premium narratives. Every cut, color, and transition is designed to amplify feeling and elevate brand identity.
        </p>
      </motion.section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="font-serif text-4xl md:text-5xl">
          Featured Projects
        </motion.h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article key={project.title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.05 }} className="group overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]">
              <div className="relative h-56 overflow-hidden">
                <video
                  src={project.reel}
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{project.details}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <h2 className="font-serif text-4xl md:text-5xl">Editing Services</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <motion.div key={service} whileHover={{ x: 8 }} className="glass-panel rounded-2xl border border-white/15 p-6">
              {service}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <h2 className="font-serif text-4xl md:text-5xl">Client Testimonials</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <motion.blockquote key={testimonial.name} whileHover={{ y: -6 }} className="rounded-2xl border border-white/15 bg-white/[0.04] p-7 text-zinc-200 shadow-[0_20px_60px_rgba(10,10,20,0.35)]">
              “{testimonial.quote}”
              <footer className="mt-5 text-sm uppercase tracking-[0.2em] text-zinc-400">{testimonial.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <h2 className="font-serif text-4xl md:text-5xl">Workflow Process</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {workflow.map((step, index) => (
            <motion.li key={step} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
              <span className="text-xs tracking-[0.3em] text-violet-300">STEP {index + 1}</span>
              <p className="mt-3 text-lg">{step}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-16">
        <div className="glass-panel rounded-3xl border border-white/15 p-8 md:p-12">
          <h2 className="font-serif text-4xl md:text-5xl">Let&apos;s build your next cinematic story.</h2>
          <form className="mt-8 grid gap-4" onSubmit={handleContactSubmit}>
            <label className="sr-only" htmlFor="contact-name">
              Your Name
            </label>
            <input id="contact-name" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none transition focus:border-violet-400" type="text" placeholder="Your Name" required />
            <label className="sr-only" htmlFor="contact-email">
              Email Address
            </label>
            <input id="contact-email" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none transition focus:border-violet-400" type="email" placeholder="Email Address" required />
            <label className="sr-only" htmlFor="contact-message">
              Project Details
            </label>
            <textarea id="contact-message" className="min-h-36 rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none transition focus:border-violet-400" placeholder="Tell me about your project" required />
            <button className="mt-2 w-fit rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400" type="submit">
              Send Inquiry
            </button>
            {submitMessage ? <p className="text-sm text-violet-300">{submitMessage}</p> : null}
          </form>
        </div>
      </section>
    </main>
  );
}
