"use client"

import { useState } from "react"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CompletionStep from "./step/completion-step"
import UserPreferencesStep from "./step/user-preferences.step"
import ShippingAddressStep from "./step/shipping-address-step"
// import ShippingAddressStep from "@/components/onboarding/step/ShippingAddressStep"
// import UserPreferencesStep from "@/components/onboarding/step/UserPreferencesStep"
// import CompletionStep from "@/components/onboarding/step/CompletionStep"
type FormData = {
  // Shipping Address
  fullName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string

  // User Preferences
  productInterests: string[]
  communicationPreferences: string[]
}

const initialFormData: FormData = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: "",
  productInterests: [],
  communicationPreferences: [],
}

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { title: "Shipping Address", component: ShippingAddressStep },
    { title: "Preferences", component: UserPreferencesStep },
    { title: "Complete", component: CompletionStep },
  ]

  const totalSteps = steps.length
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1
  const progress = ((currentStep + 1) / totalSteps) * 100

  const validateShippingAddress = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = "Full name is required"
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State/Province is required"
    if (!formData.postalCode) newErrors.postalCode = "Postal/ZIP code is required"
    if (!formData.country) newErrors.country = "Country is required"

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePreferences = () => {
    const newErrors: Record<string, string> = {}

    if (formData.productInterests.length === 0) {
      newErrors.productInterests = "Please select at least one product category"
    }

    if (formData.communicationPreferences.length === 0) {
      newErrors.communicationPreferences = "Please select at least one communication preference"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return validateShippingAddress()
      case 1:
        return validatePreferences()
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // Move to completion step
    setCurrentStep(totalSteps - 1)
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-2xl font-bold text-center">Post-Registration Onboarding</CardTitle>

        {/* Progress bar */}
        <div className="w-full mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    index < currentStep
                      ? "bg-emerald-500 text-white"
                      : index === currentStep
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <span className="text-xs mt-1 text-gray-600">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <CurrentStepComponent formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className={isFirstStep ? "opacity-0" : ""}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {isLastStep ? (
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Get Started
            </Button>
          ) : (
            <Button
              onClick={currentStep === totalSteps - 2 ? handleSubmit : handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {currentStep === totalSteps - 2 ? "Submit" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

