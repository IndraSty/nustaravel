import { useState, useRef } from 'react';

export const useDraggable = () => {
  const [isGrab, setIsGrab] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e) => {
    e.preventDefault();
    
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";

    let startPos = e.pageX;
    let startScroll = containerRef.current.scrollLeft;

    const handleDragMove = (e) => {
      setIsGrab(true);
      const newPos = e.pageX;
      const diff = startPos - newPos;
      containerRef.current.scrollLeft = startScroll + diff;
    };

    const handleDragEnd = () => {
      setIsGrab(false);
      containerRef.current.style.cursor = "grab";
      containerRef.current.removeEventListener("mousemove", handleDragMove);
    };

    containerRef.current.addEventListener("mousemove", handleDragMove);
    containerRef.current.addEventListener("mouseup", handleDragEnd, {
      once: true,
    });
  };

  return { isGrab, containerRef, handleDragStart };
};
