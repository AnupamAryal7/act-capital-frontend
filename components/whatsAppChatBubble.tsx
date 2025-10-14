"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppChatBubble() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [showDismissArea, setShowDismissArea] = useState(false);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  const phoneNumber = "+61042099533";
  const message = "Hi! I need help with my driving lessons.";

  // Initialize position after component mounts
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 150,
    });
  }, []);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (bubbleRef.current) {
      setIsDragging(true);
      hasMoved.current = false;
      setShowDismissArea(true);
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
      setShowDismissArea(true);
      const touch = e.touches[0];
      const rect = bubbleRef.current.getBoundingClientRect();
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  // Snap to nearest edge
  const snapToEdge = (x: number, y: number) => {
    const bubbleWidth = 64; // w-16 = 64px
    const bubbleHeight = 64;
    const margin = 20;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate distance to each edge
    const toLeft = x;
    const toRight = window.innerWidth - (x + bubbleWidth);
    const toTop = y;
    const toBottom = window.innerHeight - (y + bubbleHeight);

    // Find the closest edge
    const minHorizontal = Math.min(toLeft, toRight);
    const minVertical = Math.min(toTop, toBottom);

    let newX = x;
    let newY = y;

    if (minHorizontal < minVertical) {
      // Snap to left or right edge
      if (toLeft < toRight) {
        newX = margin;
      } else {
        newX = window.innerWidth - bubbleWidth - margin;
      }
      // Keep vertical position but ensure it's within bounds
      newY = Math.max(
        margin,
        Math.min(window.innerHeight - bubbleHeight - margin, y)
      );
    } else {
      // Snap to top or bottom edge
      if (toTop < toBottom) {
        newY = margin;
      } else {
        newY = window.innerHeight - bubbleHeight - margin;
      }
      // Keep horizontal position but ensure it's within bounds
      newX = Math.max(
        margin,
        Math.min(window.innerWidth - bubbleWidth - margin, x)
      );
    }

    return { x: newX, y: newY };
  };

  // Check if in dismiss zone (bottom center)
  const isInDismissZone = (x: number, y: number) => {
    const bubbleWidth = 64;
    const dismissZoneWidth = 120;
    const dismissZoneTop = window.innerHeight - 100;

    const bubbleCenterX = x + bubbleWidth / 2;
    const dismissZoneCenter = window.innerWidth / 2;
    const dismissZoneLeft = dismissZoneCenter - dismissZoneWidth / 2;
    const dismissZoneRight = dismissZoneCenter + dismissZoneWidth / 2;

    return (
      y >= dismissZoneTop &&
      bubbleCenterX >= dismissZoneLeft &&
      bubbleCenterX <= dismissZoneRight
    );
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Check if we've moved significantly (more than 3px)
    const movedDistance = Math.sqrt(
      Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2)
    );

    if (movedDistance > 3) {
      hasMoved.current = true;
    }

    // Constrain to viewport boundaries with some margin
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

    // Check if we've moved significantly (more than 3px)
    const movedDistance = Math.sqrt(
      Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2)
    );

    if (movedDistance > 3) {
      hasMoved.current = true;
    }

    // Constrain to viewport boundaries with some margin
    const constrainedX = Math.max(10, Math.min(window.innerWidth - 74, newX));
    const constrainedY = Math.max(10, Math.min(window.innerHeight - 74, newY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    if (isDragging) {
      // Check if in dismiss zone
      if (isInDismissZone(position.x, position.y)) {
        setIsVisible(false);
      } else {
        // Snap to nearest edge
        const snappedPosition = snapToEdge(position.x, position.y);
        setPosition(snappedPosition);
      }

      setIsDragging(false);
      setShowDismissArea(false);
    }
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved.current = false;
      return;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle touch end for WhatsApp click
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved.current = false;
      return;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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
    <>
      {/* Dismiss Area */}
      {showDismissArea && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <X size={20} />
            <span className="font-semibold">Drag here to dismiss</span>
          </div>
        </div>
      )}

      {/* WhatsApp Chat Head */}
      <div
        ref={bubbleRef}
        className="fixed z-50 cursor-move select-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDragging ? "scale(1.1)" : "scale(1)",
          transition: isDragging
            ? "none"
            : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity:
            isInDismissZone(position.x, position.y) && isDragging ? 0.7 : 1,
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
          {/* WhatsApp button */}
          <button
            onClick={handleWhatsAppClick}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`relative group bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
              isDragging ? "cursor-grabbing" : "cursor-pointer hover:scale-110"
            } ${
              isInDismissZone(position.x, position.y) && isDragging
                ? "bg-red-500"
                : ""
            }`}
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

        {/* Phone number - only show when not dragging */}
        {!isDragging && (
          <p className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap">
            {phoneNumber}
          </p>
        )}
      </div>
    </>
  );
}
