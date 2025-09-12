"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What do I need to start driving lessons?",
        answer:
          "You'll need a valid learner's permit, which you can obtain from Service NSW after passing the Driver Knowledge Test (DKT). You must be at least 16 years old and have parental consent if under 18.",
      },
      {
        question: "How many lessons do I need?",
        answer:
          "This varies by individual, but most students need 15-25 lessons. Beginners typically start with our 10-lesson package, while those with some experience might need fewer lessons. We'll assess your skills and provide a personalized recommendation.",
      },
      {
        question: "What should I bring to my first lesson?",
        answer:
          "Bring your learner's permit, comfortable closed-toe shoes, and any glasses or contacts if you need them for driving. We provide everything else, including the vehicle and dual controls for safety.",
      },
    ],
  },
  {
    category: "Booking & Scheduling",
    questions: [
      {
        question: "How do I book a lesson?",
        answer:
          "You can book online through our website, call us directly, or use our mobile app. We offer flexible scheduling including evenings and weekends to fit your schedule.",
      },
      {
        question: "Can I cancel or reschedule a lesson?",
        answer:
          "Yes, you can cancel or reschedule with at least 24 hours notice without penalty. For cancellations with less than 24 hours notice, a cancellation fee may apply.",
      },
      {
        question: "What are your operating hours?",
        answer:
          "We operate Monday to Sunday from 7:00 AM to 7:00 PM. We offer lessons during school hours, after school, evenings, and weekends to accommodate all schedules.",
      },
    ],
  },
  {
    category: "Lessons & Instruction",
    questions: [
      {
        question: "What type of cars do you use?",
        answer:
          "We use modern, well-maintained vehicles with dual controls for safety. Our fleet includes automatic and manual transmission cars, all equipped with the latest safety features and air conditioning.",
      },
      {
        question: "Are your instructors qualified?",
        answer:
          "Yes, all our instructors are fully licensed by Transport for NSW, have current Working with Children Checks, and undergo regular training to maintain the highest standards of instruction.",
      },
      {
        question: "Do you pick up students?",
        answer:
          "Yes, we offer pick-up and drop-off services within our service area at no extra charge. We can collect you from home, school, or work for your convenience.",
      },
    ],
  },
  {
    category: "Testing & Licensing",
    questions: [
      {
        question: "When am I ready for my driving test?",
        answer:
          "Your instructor will assess your readiness and recommend when to book your test. Generally, you should be consistently demonstrating safe driving skills and confidence in various traffic conditions.",
      },
      {
        question: "Do you provide a car for the driving test?",
        answer:
          "Yes, we can provide a vehicle for your driving test for an additional fee. This ensures you're taking the test in a car you're familiar with, which can help reduce test anxiety.",
      },
      {
        question: "What happens if I fail my driving test?",
        answer:
          "Don't worry - it happens! We'll review what went wrong and provide additional lessons focusing on the areas that need improvement before you retake the test.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    questions: [
      {
        question: "How much do lessons cost?",
        answer:
          "Individual lessons are $70 per hour. We offer package deals that provide better value - for example, our 10-lesson beginner package is $650. Check our courses page for current pricing.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, credit cards, debit cards, and bank transfers. Payment can be made per lesson or in advance for packages. We also offer payment plans for larger packages.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! Our prices include GST, fuel, and vehicle maintenance. The only additional costs might be for test car hire or if you need to reschedule with less than 24 hours notice.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
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
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Find answers to common questions about our driving lessons, booking process, and more. Can't find what
                you're looking for? Contact us directly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <h2 className="text-2xl font-bold text-primary">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const itemId = `${categoryIndex}-${questionIndex}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <Card key={questionIndex} className="border shadow-sm">
                          <Collapsible open={isOpen} onOpenChange={() => toggleItem(itemId)}>
                            <CollapsibleTrigger asChild>
                              <button className="w-full p-6 text-left hover:bg-muted/50 transition-colors">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
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
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
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
                  Can't find the answer you're looking for? Our friendly team is here to help you with any questions
                  about our driving lessons.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent" asChild>
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
                    <p className="text-sm text-muted-foreground">Schedule your first driving lesson online</p>
                    <Button className="w-full" asChild>
                      <Link href="/booking">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">View Courses</h3>
                    <p className="text-sm text-muted-foreground">Explore our range of driving courses</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/courses">View Courses</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Get in Touch</h3>
                    <p className="text-sm text-muted-foreground">Contact us for personalized advice</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
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
  )
}
