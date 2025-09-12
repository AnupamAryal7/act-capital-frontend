"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock, User, Car, MapPin, CheckCircle, CreditCard, Lock, Loader2 } from "lucide-react"

interface BookingData {
  course: string
  instructor: string
  date: Date | undefined
  time: string
  duration: string
  studentName: string
  email: string
  phone: string
  address: string
  experience: string
  notes: string
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    course: "",
    instructor: "",
    date: undefined,
    time: "",
    duration: "",
    studentName: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    notes: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const courses = [
    { id: "beginner", name: "Beginner Lessons", price: 80 },
    { id: "refresher", name: "Refresher Course", price: 75 },
    { id: "test-prep", name: "Test Preparation", price: 90 },
    { id: "defensive", name: "Defensive Driving", price: 85 },
  ]

  const instructors = [
    { id: "sarah", name: "Sarah Johnson", rating: 4.9, experience: "8 years" },
    { id: "mike", name: "Mike Chen", rating: 4.8, experience: "6 years" },
    { id: "emma", name: "Emma Wilson", rating: 4.9, experience: "10 years" },
  ]

  const timeSlots = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ]

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    console.log("Booking and payment submitted:", bookingData)
    setIsProcessingPayment(false)
    setStep(6) // Success step
  }

  const selectedCourse = courses.find((c) => c.id === bookingData.course)
  const selectedInstructor = instructors.find((i) => i.id === bookingData.instructor)
  const totalCost = selectedCourse ? selectedCourse.price * Number.parseFloat(bookingData.duration || "1") : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Book Your Lesson
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">Schedule Your Driving Lesson</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Choose your course, instructor, and preferred time. Get started on your driving journey today.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                      </div>
                      {stepNumber < 5 && (
                        <div className={`h-1 w-16 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                    Course & Instructor
                  </span>
                  <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Date & Time</span>
                  <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Your Details</span>
                  <span className={step >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>
                    Review & Confirm
                  </span>
                  <span className={step >= 5 ? "text-primary font-medium" : "text-muted-foreground"}>Payment</span>
                </div>
              </div>

              {step === 6 ? (
                // Success Step
                <Card className="border-0 shadow-lg text-center">
                  <CardContent className="p-12 space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Payment Successful!</h2>
                    <p className="text-muted-foreground">
                      Your driving lesson has been successfully booked and paid for. You'll receive a confirmation email
                      shortly.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                      <div className="font-medium">Booking Details:</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedCourse?.name} with {selectedInstructor?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {bookingData.date?.toDateString()} at {bookingData.time}
                      </div>
                      <div className="text-sm font-medium text-primary">Total Paid: ${totalCost}</div>
                    </div>
                    <Button asChild>
                      <a href="/">Return to Homepage</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {step === 1 && "Select Course & Instructor"}
                      {step === 2 && "Choose Date & Time"}
                      {step === 3 && "Your Information"}
                      {step === 4 && "Review & Confirm"}
                      {step === 5 && "Payment Details"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Step 1: Course & Instructor Selection */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <Label className="text-base font-medium">Select a Course</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {courses.map((course) => (
                              <Card
                                key={course.id}
                                className={`cursor-pointer transition-all ${
                                  bookingData.course === course.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:shadow-md"
                                }`}
                                onClick={() => handleInputChange("course", course.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">{course.name}</h3>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        Professional instruction tailored to your needs
                                      </p>
                                    </div>
                                    <Badge variant="secondary">${course.price}/hr</Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-medium">Choose Your Instructor</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {instructors.map((instructor) => (
                              <Card
                                key={instructor.id}
                                className={`cursor-pointer transition-all ${
                                  bookingData.instructor === instructor.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:shadow-md"
                                }`}
                                onClick={() => handleInputChange("instructor", instructor.id)}
                              >
                                <CardContent className="p-4 text-center">
                                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                                    <User className="h-6 w-6" />
                                  </div>
                                  <h3 className="font-medium">{instructor.name}</h3>
                                  <p className="text-sm text-muted-foreground">{instructor.experience}</p>
                                  <div className="flex items-center justify-center mt-2">
                                    <span className="text-sm">⭐ {instructor.rating}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Date & Time Selection */}
                    {step === 2 && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Label className="text-base font-medium">Select Date</Label>
                          <Calendar
                            mode="single"
                            selected={bookingData.date}
                            onSelect={(date) => handleInputChange("date", date)}
                            disabled={(date) => date < new Date() || date.getDay() === 0}
                            className="rounded-md border"
                          />
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label className="text-base font-medium">Select Time</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  variant={bookingData.time === time ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleInputChange("time", time)}
                                  className="justify-start"
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="duration">Lesson Duration</Label>
                            <Select onValueChange={(value) => handleInputChange("duration", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Hour</SelectItem>
                                <SelectItem value="1.5">1.5 Hours</SelectItem>
                                <SelectItem value="2">2 Hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Student Information */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="studentName">Full Name *</Label>
                            <Input
                              id="studentName"
                              value={bookingData.studentName}
                              onChange={(e) => handleInputChange("studentName", e.target.value)}
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={bookingData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email address"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Pickup Address *</Label>
                          <Input
                            id="address"
                            value={bookingData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Enter your pickup address"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experience">Driving Experience</Label>
                          <Select onValueChange={(value) => handleInputChange("experience", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
                              <SelectItem value="some-experience">Some Experience</SelectItem>
                              <SelectItem value="returning-driver">Returning Driver</SelectItem>
                              <SelectItem value="test-preparation">Test Preparation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            value={bookingData.notes}
                            onChange={(e) => handleInputChange("notes", e.target.value)}
                            placeholder="Any specific requirements or notes for your instructor..."
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review & Confirm */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                          <h3 className="font-semibold text-lg">Booking Summary</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Car className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">Course</div>
                                  <div className="text-sm text-muted-foreground">{selectedCourse?.name}</div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">Instructor</div>
                                  <div className="text-sm text-muted-foreground">{selectedInstructor?.name}</div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">Date & Time</div>
                                  <div className="text-sm text-muted-foreground">
                                    {bookingData.date?.toDateString()} at {bookingData.time}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">Duration</div>
                                  <div className="text-sm text-muted-foreground">{bookingData.duration} Hour(s)</div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">Pickup Location</div>
                                  <div className="text-sm text-muted-foreground">{bookingData.address}</div>
                                </div>
                              </div>

                              <div className="pt-3 border-t">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">Total Cost</span>
                                  <span className="text-lg font-bold text-primary">${totalCost}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Please have your learner's permit ready for the lesson</li>
                            <li>• Cancellations must be made at least 24 hours in advance</li>
                            <li>• Our instructor will contact you 30 minutes before pickup</li>
                            <li>• Payment will be processed securely in the next step</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-muted/50 rounded-lg p-6">
                          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>{selectedCourse?.name}</span>
                              <span>${selectedCourse?.price}/hr</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration</span>
                              <span>{bookingData.duration} hour(s)</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span className="text-primary">${totalCost}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="space-y-4">
                          <Label className="text-base font-medium">Payment Method</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card
                              className={`cursor-pointer transition-all ${
                                bookingData.paymentMethod === "card"
                                  ? "ring-2 ring-primary bg-primary/5"
                                  : "hover:shadow-md"
                              }`}
                              onClick={() => handleInputChange("paymentMethod", "card")}
                            >
                              <CardContent className="p-4 flex items-center space-x-3">
                                <CreditCard className="h-6 w-6" />
                                <div>
                                  <div className="font-medium">Credit/Debit Card</div>
                                  <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card
                              className={`cursor-pointer transition-all ${
                                bookingData.paymentMethod === "paypal"
                                  ? "ring-2 ring-primary bg-primary/5"
                                  : "hover:shadow-md"
                              }`}
                              onClick={() => handleInputChange("paymentMethod", "paypal")}
                            >
                              <CardContent className="p-4 flex items-center space-x-3">
                                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                  P
                                </div>
                                <div>
                                  <div className="font-medium">PayPal</div>
                                  <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        {/* Card Details Form */}
                        {bookingData.paymentMethod === "card" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Cardholder Name *</Label>
                              <Input
                                id="cardName"
                                value={bookingData.cardName}
                                onChange={(e) => handleInputChange("cardName", e.target.value)}
                                placeholder="Enter cardholder name"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number *</Label>
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="cardNumber"
                                  value={bookingData.cardNumber}
                                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                  placeholder="1234 5678 9012 3456"
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date *</Label>
                                <Input
                                  id="expiryDate"
                                  value={bookingData.expiryDate}
                                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input
                                  id="cvv"
                                  value={bookingData.cvv}
                                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PayPal Message */}
                        {bookingData.paymentMethod === "paypal" && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                P
                              </div>
                              <span className="font-medium text-blue-900">PayPal Payment</span>
                            </div>
                            <p className="text-sm text-blue-800 mt-2">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                          </div>
                        )}

                        {/* Security Notice */}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Lock className="h-4 w-4" />
                          <span>Your payment information is encrypted and secure</span>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button variant="outline" onClick={handlePrevious} disabled={step === 1 || isProcessingPayment}>
                        Previous
                      </Button>

                      {step < 5 ? (
                        <Button
                          onClick={handleNext}
                          disabled={
                            (step === 1 && (!bookingData.course || !bookingData.instructor)) ||
                            (step === 2 && (!bookingData.date || !bookingData.time || !bookingData.duration)) ||
                            (step === 3 &&
                              (!bookingData.studentName ||
                                !bookingData.email ||
                                !bookingData.phone ||
                                !bookingData.address)) ||
                            step === 4
                          }
                        >
                          {step === 4 ? "Proceed to Payment" : "Next"}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={
                            !bookingData.paymentMethod ||
                            (bookingData.paymentMethod === "card" &&
                              (!bookingData.cardName ||
                                !bookingData.cardNumber ||
                                !bookingData.expiryDate ||
                                !bookingData.cvv)) ||
                            isProcessingPayment
                          }
                        >
                          {isProcessingPayment ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Pay ${totalCost}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
