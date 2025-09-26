// hooks/useBooking.ts
"use client";

export const useBooking = () => {
  const handleBookNow = (courseId: number) => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");

    if (!userData) {
      // User not logged in - redirect to login with booking intent
      localStorage.setItem(
        "redirectAfterLogin",
        `/booking?course_id=${courseId}`
      );
      window.location.href = `/login?redirect=/booking?course_id=${courseId}`;
    } else {
      // User is logged in - go directly to booking
      window.location.href = `/booking?course_id=${courseId}`;
    }
  };

  const handleInquiry = (courseId: number) => {
    // For now, just log the inquiry - can be implemented later
    console.log("Inquiry for course:", courseId);
    alert(
      "Inquiry functionality coming soon! Please use the contact form or call us directly."
    );
  };

  return {
    handleBookNow,
    handleInquiry,
  };
};
