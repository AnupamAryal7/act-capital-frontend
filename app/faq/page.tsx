"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronDown, HelpCircle, RefreshCw } from "lucide-react";

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

const API_BASE_URL = "https://act-driving-backend.onrender.com/api/v1";

export default function FAQPage() {
  const [faqCategories, setFaqCategories] = useState<
    FAQCategoryWithQuestions[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);

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

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center h-32">
                <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                <span>Loading FAQ...</span>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Failed to load FAQ</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchAllFAQData} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Find answers to common questions about our driving lessons,
                booking process, and more. Can't find what you're looking for?
                Contact us directly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {faqCategories.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No FAQ available</h3>
                <p className="text-muted-foreground">
                  Check back later for frequently asked questions.
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-12">
                {faqCategories.map((categoryData, categoryIndex) => (
                  <div key={categoryData.category.id} className="space-y-6">
                    <h2 className="text-2xl font-bold text-primary">
                      {categoryData.category.title}
                    </h2>
                    <div className="space-y-4">
                      {categoryData.questions.map((faq, questionIndex) => {
                        const itemId = `${categoryIndex}-${questionIndex}`;
                        const isOpen = openItems.includes(itemId);

                        return (
                          <Card key={faq.id} className="border shadow-sm">
                            <Collapsible
                              open={isOpen}
                              onOpenChange={() => toggleItem(itemId)}
                            >
                              <CollapsibleTrigger asChild>
                                <button className="w-full p-6 text-left hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold pr-4">
                                      {faq.question}
                                    </h3>
                                    <ChevronDown
                                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                                        isOpen ? "transform rotate-180" : ""
                                      }`}
                                    />
                                  </div>
                                </button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <CardContent className="pt-0 pb-6 px-6">
                                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                  </p>
                                </CardContent>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto text-center border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Still Have Questions?</h2>
                <p className="text-muted-foreground">
                  Can't find the answer you're looking for? Our friendly team is
                  here to help you with any questions about our driving lessons.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent"
                    asChild
                  >
                    <Link href="tel:+61234567890">Call Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Book a Lesson</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule your first driving lesson online
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/booking">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">View Courses</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our range of driving courses
                    </p>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/courses">View Courses</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Get in Touch</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact us for personalized advice
                    </p>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/contact">Contact</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
