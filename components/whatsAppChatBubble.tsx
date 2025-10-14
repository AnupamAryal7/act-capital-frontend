"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppChatBubble() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  const phoneNumber = "+61042099533";
  const message = "Hi! I need help with my driving lessons.";

  // Initialize position after component mounts
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    });
  }, []);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (bubbleRef.current) {
      setIsDragging(true);
      hasMoved.current = false;
      const rect = bubbleRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle touch start for dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (bubbleRef.current) {
      setIsDragging(true);
      hasMoved.current = false;
      const touch = e.touches[0];
      const rect = bubbleRef.current.getBoundingClientRect();
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Check if we've moved significantly (more than 5px)
    const movedDistance = Math.sqrt(
      Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2)
    );

    if (movedDistance > 5) {
      hasMoved.current = true;
    }

    // Constrain to viewport boundaries
    const constrainedX = Math.max(10, Math.min(window.innerWidth - 74, newX));
    const constrainedY = Math.max(10, Math.min(window.innerHeight - 74, newY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  // Handle touch move for dragging
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;

    // Check if we've moved significantly (more than 5px)
    const movedDistance = Math.sqrt(
      Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2)
    );

    if (movedDistance > 5) {
      hasMoved.current = true;
    }

    // Constrain to viewport boundaries
    const constrainedX = Math.max(10, Math.min(window.innerWidth - 74, newX));
    const constrainedY = Math.max(10, Math.min(window.innerHeight - 74, newY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    // Prevent opening WhatsApp if we were dragging
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle touch end for WhatsApp click
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Prevent opening WhatsApp if we were dragging
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle dismiss
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, dragOffset, position]);

  if (!isVisible) return null;

  return (
    <div
      ref={bubbleRef}
      className="fixed z-50 cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: isDragging
          ? "none"
          : "transform 0.2s ease, left 0.2s ease, top 0.2s ease",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Tooltip */}
      {showTooltip && !isDragging && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
          Chat with instructor
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      )}

      {/* WhatsApp Bubble */}
      <div className="relative">
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg hover:bg-red-600 transition-colors z-10"
          aria-label="Dismiss chat"
        >
          <X size={12} />
        </button>

        {/* WhatsApp button */}
        <button
          onClick={handleWhatsAppClick}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`relative group bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
            isDragging ? "cursor-grabbing" : "cursor-pointer hover:scale-110"
          } animate-pulse`}
          aria-label="Chat with instructor on WhatsApp"
        >
          {/* WhatsApp Icon */}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>

          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      </div>

      {/* Phone number */}
      <p className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap">
        {phoneNumber}
      </p>
    </div>
  );
}
