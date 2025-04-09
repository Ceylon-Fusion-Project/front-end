import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type UserPreferencesStepProps = {
  formData: any
  setFormData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

const productCategories = [
  { id: "cinnamon-tea", label: "Cinnamon Tea" },
  { id: "cinnamon-sticks", label: "Cinnamon Sticks" },
  { id: "cinnamon-cookies", label: "Cinnamon Cookies" },
  { id: "cinnamon-soaps", label: "Cinnamon Soaps" },
  { id: "cinnamon-candles", label: "Cinnamon Candles" },
]

const communicationOptions = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Contact Number" },
]

export default function UserPreferencesStep({ formData, setFormData, errors, setErrors }: UserPreferencesStepProps) {
  const handleProductInterestChange = (checked: boolean, value: string) => {
    const updatedInterests = checked
      ? [...formData.productInterests, value]
      : formData.productInterests.filter((interest: string) => interest !== value)

    setFormData({ ...formData, productInterests: updatedInterests })

    // Clear error when user selects an option
    if (errors.productInterests && updatedInterests.length > 0) {
      setErrors({ ...errors, productInterests: "" })
    }
  }

  const handleCommunicationPreferenceChange = (checked: boolean, value: string) => {
    const updatedPreferences = checked
      ? [...formData.communicationPreferences, value]
      : formData.communicationPreferences.filter((pref: string) => pref !== value)

    setFormData({ ...formData, communicationPreferences: updatedPreferences })

    // Clear error when user selects an option
    if (errors.communicationPreferences && updatedPreferences.length > 0) {
      setErrors({ ...errors, communicationPreferences: "" })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Product Categories of Interest</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select the products you're interested in to receive personalized recommendations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {productCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={formData.productInterests.includes(category.id)}
                  onCheckedChange={(checked: boolean | "indeterminate") => handleProductInterestChange(checked === true, category.id)}
                />
                <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>

          {errors.productInterests && <p className="text-red-500 text-sm mt-2">{errors.productInterests}</p>}
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">Communication Preferences</h3>
          <p className="text-sm text-gray-500 mb-4">How would you like us to communicate with you?</p>

          <div className="space-y-3">
            {communicationOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={formData.communicationPreferences.includes(option.id)}
                  onCheckedChange={(checked: boolean | "indeterminate") => handleCommunicationPreferenceChange(checked === true, option.id)}
                />
                <Label htmlFor={option.id} className="text-sm font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          {errors.communicationPreferences && (
            <p className="text-red-500 text-sm mt-2">{errors.communicationPreferences}</p>
          )}
        </div>
      </div>
    </div>
  )
}

