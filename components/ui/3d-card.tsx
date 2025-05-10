"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

// Provide a default value to avoid undefined errors during SSR
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // SSR safe-guard - only run after mounting on client
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Throttled transform update using requestAnimationFrame
  const updateTransform = () => {
    if (!containerRef.current || !isMounted) return;
    
    // Get container dimensions
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate rotation based on mouse position
    const x = (mousePositionRef.current.x - left - width / 2) / 25;
    const y = (mousePositionRef.current.y - top - height / 2) / 25;
    
    // Apply the transform
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    
    // Reset the RAF reference
    rafRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Store the mouse position for use in animation frame
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    // Only request a new frame if we don't already have one pending
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateTransform);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isMounted) return;
    setIsMouseEntered(false);
    
    // Cancel any pending animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-5 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear will-change-transform",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

// Modified CardItem component to avoid refs with dynamic components
export const CardItem = ({
  as: Component = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any; // Use 'any' for the component type to avoid TypeScript issues
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();
  const [isMounted, setIsMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  // SSR safe-guard
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Update transform with throttling via rAF
  useEffect(() => {
    if (!itemRef.current || !isMounted) return;
    
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!itemRef.current) return;
      
      if (isMouseEntered) {
        itemRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      } else {
        itemRef.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
      }
      
      rafRef.current = null;
    });
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ, isMounted]);

  // Use a wrapper div with the ref and render the Component inside it
  return (
    <div
      ref={itemRef}
      className={cn("w-fit transition duration-200 ease-linear will-change-transform", className)}
    >
      <Component {...rest}>
        {children}
      </Component>
    </div>
  );
};

// Modified hook to be SSR-safe
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  return context;
};