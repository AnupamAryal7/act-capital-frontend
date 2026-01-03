"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className={`animate-fade-in-up group border-border/60 rounded-lg border transition-all duration-200 ease-in-out ${
        isOpen ? "bg-card/30 shadow-sm" : "hover:bg-card/50"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4"
      >
        <h3
          className={`text-left text-2xl font-poppins font-semibold transition-colors duration-200 ${
            isOpen ? "text-foreground" : "text-foreground/90"
          }`}
        >
          {question}
        </h3>
        <div
          className={`shrink-0 rounded-full p-0.5 transition-all duration-300 ${
            isOpen
              ? "text-primary rotate-180 scale-110"
              : "text-muted-foreground rotate-0 scale-100"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-border/40 border-t px-6 pt-4 pb-5">
          <p className="text-muted-foreground text-2xl font-serif leading-relaxed whitespace-pre-line">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FAQCategory {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface FAQ {
  id: number;
  category_id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

interface FAQCategoryWithQuestions {
  category: FAQCategory;
  questions: FAQ[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DrivingSchoolFAQ() {
  const [faqCategories, setFaqCategories] = useState<
    FAQCategoryWithQuestions[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQ categories
  const fetchFAQCategories = async (): Promise<FAQCategory[]> => {
    const response = await fetch(`${API_BASE_URL}/faq-categories/`);
    if (!response.ok) {
      throw new Error("Failed to fetch FAQ categories");
    }
    return response.json();
  };

  // Fetch FAQs by category
  const fetchFAQsByCategory = async (categoryId: number): Promise<FAQ[]> => {
    const response = await fetch(
      `${API_BASE_URL}/faqs/?category_id=${categoryId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs for category ${categoryId}`);
    }
    return response.json();
  };

  // Fetch all FAQ data
  const fetchAllFAQData = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, get all categories
      const categories = await fetchFAQCategories();

      // Then, get FAQs for each category
      const categoriesWithQuestions = await Promise.all(
        categories.map(async (category) => {
          const questions = await fetchFAQsByCategory(category.id);
          return {
            category,
            questions,
          };
        })
      );

      // Filter out categories with no questions
      const categoriesWithValidQuestions = categoriesWithQuestions.filter(
        (item) => item.questions.length > 0
      );

      setFaqCategories(categoriesWithValidQuestions);
    } catch (err) {
      console.error("Error fetching FAQ data:", err);
      setError(err instanceof Error ? err.message : "Failed to load FAQ data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFAQData();
  }, []);

  if (loading) {
    return (
      <section className="bg-background relative w-full overflow-hidden py-16">
        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-lg text-muted-foreground">
              Loading FAQ...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-background relative w-full overflow-hidden py-16">
        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">Failed to load FAQ</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={fetchAllFAQData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background relative w-full overflow-hidden py-16">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* Decorative elements */}
      <div className="bg-primary/5 absolute top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center animate-fade-in-up">
          <Badge
            variant="outline"
            className="border-primary mb-4 px-3 py-1 text-xs font-medium tracking-wider uppercase"
          >
            FAQs
          </Badge>

          <h2 className="from-primary mb-3 bg-gradient-to-r to-rose-400 bg-clip-text text-4xl font-bold text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-xl font-semibold">
            Everything you need to know about ACT Capital Driving School
          </p>
        </div>

        {faqCategories.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-medium mb-3">No FAQ available</h3>
            <p className="text-muted-foreground">
              Check back later for frequently asked questions.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-12">
            {faqCategories.map((categoryData, sectionIndex) => (
              <div
                key={categoryData.category.id}
                style={{
                  animationDelay: `${sectionIndex * 0.1}s`,
                }}
                className="space-y-4 animate-fade-in-up"
              >
                <h3 className="text-3xl font-bold text-primary mb-6 font-poppins">
                  {categoryData.category.title}
                </h3>
                <div className="space-y-2">
                  {categoryData.questions.map((faq, index) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      index={sectionIndex * 10 + index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{ animationDelay: "0.4s" }}
          className="mx-auto mt-16 max-w-2xl rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center border border-primary/20 animate-fade-in-up"
        >
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center justify-center rounded-full p-3">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="text-foreground mb-2 text-xl font-bold">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Can't find the answer you're looking for? Our friendly team is here
            to help you with any questions about our driving lessons.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className="rounded-md px-6 py-2.5 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </button>
            <button
              type="button"
              className="rounded-md px-6 py-2.5 text-sm border border-primary/30 bg-background hover:bg-primary/5 transition-colors duration-200 font-medium inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </button>
            <button
              type="button"
              className="rounded-md px-6 py-2.5 text-sm border border-primary/30 bg-background hover:bg-primary/5 transition-colors duration-200 font-medium inline-flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book a Lesson
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
