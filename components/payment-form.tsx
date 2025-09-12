"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock, Loader2 } from "lucide-react"

interface PaymentFormProps {
  amount: number
  onPaymentSuccess: () => void
  onPaymentError: (error: string) => void
}

export function PaymentForm({ amount, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success/failure
      if (Math.random() > 0.1) {
        // 90% success rate
        onPaymentSuccess()
      } else {
        onPaymentError("Payment failed. Please try again.")
      }
    } catch (error) {
      onPaymentError("An error occurred during payment processing.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              value={paymentData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
              placeholder="Enter cardholder name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Amount:</span>
              <span className="text-xl font-bold text-primary">${amount}</span>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay ${amount}
                </>
              )}
            </Button>

            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
