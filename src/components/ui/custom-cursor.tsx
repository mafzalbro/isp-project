"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { create } from 'zustand';

interface CursorState {
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

const useCursorStore = create<CursorState>((set) => ({
  isHovering: false,
  setIsHovering: (isHovering) => set({ isHovering }),
}));

const CustomCursor = () => {
  const { isHovering } = useCursorStore();
  const [isVisible, setIsVisible] = useState(true);

  const cursorSize = isHovering ? 60 : 20;
  
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const manageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);

      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(false), 4000);
    };

    window.addEventListener('mousemove', manageMouseMove);
    
    // Set initial timeout
    timeout = setTimeout(() => setIsVisible(false), 4000);

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      clearTimeout(timeout);
    };
  }, [cursorSize, mouse.x, mouse.y]);

  useEffect(() => {
    const handleMouseOver = () => useCursorStore.setState({ isHovering: true });
    const handleMouseOut = () => useCursorStore.setState({ isHovering: false });

    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <div className="hidden md:block">
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          width: cursorSize,
          height: cursorSize,
        }}
        className="fixed pointer-events-none z-[9999] rounded-full bg-primary/50 border-2 border-primary"
        animate={{
            width: cursorSize,
            height: cursorSize,
            opacity: isVisible ? 1 : 0,
        }}
        transition={{
            opacity: { duration: 0.3 }
        }}
      />
    </div>
  );
};

export default CustomCursor;
