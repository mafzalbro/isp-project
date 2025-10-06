
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Cloudy, Terminal } from "lucide-react";
import CustomCursor from "@/components/ui/custom-cursor";
import LogoMarquee from "@/components/landing/logo-marquee";

function HeroBackground() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
      }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >

      <motion.div
        variants={{
          initial: { y: "0%" },
          animate: { y: "-50%", transition: { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" } },
        }}
        className="absolute top-0 left-0 w-full h-[200%] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%233b82f6%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')]"
      />
    </motion.div>
  );
}


const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border flex flex-col items-start gap-4"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-primary/10 p-3 rounded-lg text-primary">{icon}</div>
    <h3 className="text-xl font-bold font-headline">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
)

export default function LandingPage() {
  const featuresRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);

  return (
    <>
      <CustomCursor />
      <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12h20" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <path d="M12 22A10 10 0 0 0 22 12" />
              <path d="M12 2a10 10 0 0 0-10 10" />
              <path d="M12 22a10 10 0 0 1-10-12" />
            </svg>
            <h1 className="text-xl font-semibold font-headline">NetOps</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </header>

        <main className="flex-1">
          <section className="relative w-full h-screen text-center flex flex-col justify-center items-center px-4">
            <HeroBackground />
            <motion.div
              className="relative z-10 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline">
                The Future of Network Operations
              </h1>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                NetOps Central provides a modern, intuitive platform to manage your entire network infrastructure with ease and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Explore Dashboard
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#">
                    Request a Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </section>

          <section ref={featuresRef} className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-transparent z-10 relative">
            <motion.div style={{ opacity, y }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline">Built for Modern Networks</h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                Everything you need to monitor, manage, and scale your operations from a single, powerful dashboard.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <FeatureCard
                icon={<Terminal className="w-8 h-8" />}
                title="AI-Powered CLI"
                description="Interact with your infrastructure using natural language. Our AI translates your commands into action."
              />
              <FeatureCard
                icon={<Bot className="w-8 h-8" />}
                title="Automated Provisioning"
                description="Effortlessly set up new services and users. Let the platform handle the complex configurations."
              />
              <FeatureCard
                icon={<Cloudy className="w-8 h-8" />}
                title="Cloud Native"
                description="Leverage a scalable, resilient, and globally distributed architecture built for performance."
              />
            </div>
          </section>

          <section className="py-12 bg-card/80 backdrop-blur-sm border-y border-border">
            <div className="text-center mb-8">
              <h3 className="text-muted-foreground uppercase tracking-widest">Trusted by leading platforms in the ISP industry</h3>
            </div>
            <LogoMarquee />
          </section>

          <footer className="text-center p-8 text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NetOps. All rights reserved.</p>
          </footer>

        </main>
      </div>
    </>
  );
}
