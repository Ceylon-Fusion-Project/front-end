// src/pages/RegistrationCompletePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import NotificationService from "@/utils/NotificationService";
import api from "@/api/axiosInstance";
import { v4 as uuidv4 } from "uuid";

// Sample categories for the multi-select
const categories = [
  { id: "FOOD_AND_BEVERAGE", label: "Food and Beverage" },
  { id: "HEALTH_AND_WELLNESS", label: "Health and Wellness" },
  { id: "PERSONAL_CARE", label: "Personal Care" },
  { id: "AYURVEDIC", label: "Ayurvedic" },
  { id: "HOME_AND_LIFE_STYLE", label: "Home and Life Style" },
  { id: "INDUSTRIAL", label: "Industrial" },
];

// Sample countries for the dropdown
const countries = [
  { value: "sri-lanka", label: "Sri Lanka" },
  { value: "india", label: "India" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "canada", label: "Canada" },
];

// Sample currencies for the dropdown
const currencies = [
  { value: "LKR", label: "Sri Lankan Rupee (LKR)" },
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "INR", label: "Indian Rupee (INR)" },
  { value: "AUD", label: "Australian Dollar (AUD)" },
];

// Form validation schema
const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  country: z.string().min(1, { message: "Please select a country" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
 // currency: z.string().min(1, { message: "Please select a currency" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  zipCode: z.string().min(1, { message: "Zip/Postal code is required" }),
  preferredCategories: z
    .array(z.string())
    .min(1, { message: "Please select at least one category" }),
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idempotencyKeyRef = React.useRef<string>(uuidv4());
 
  const regenerateIdempotencyKey = () => {
    idempotencyKeyRef.current = uuidv4();
  };

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      country: "",
      address: "",
      phoneNumber: "",
      city: "", 
      state: "",
      zipCode: "",
      preferredCategories: [],
    },
  });

  // Form submission handler
  //   const onSubmit = async (data: FormValues) => {
  //     setIsSubmitting(true);

  //     try {
  //       // In a real application, you would send this data to your API
  //       console.log("Form Data:", JSON.stringify(data, null, 2));

  //       // Show success message
  //       //   toast({
  //       //     title: "Registration Complete",
  //       //     description: "Your profile has been successfully updated.",
  //       //   });
  //       NotificationService.success("Registration completed successfully!");

  //       // Redirect to dashboard or home page after a short delay
  //       setTimeout(() => {
  //         navigate("/dashboard");
  //       }, 1500);
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //       //   toast({
  //       //     title: "Error",
  //       //     description: "There was a problem completing your registration. Please try again.",
  //       //     variant: "destructive",
  //       //   });
  //       NotificationService.error(
  //         "Error completing registration. Please try again."
  //       );
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log("In submission");

    try {
        const response = await api.post("/user/complete-profile", data);

    //   if (response.status >= 200 && response.status < 300) {
    //     NotificationService.success("Registration completed successfully!");
    //     setTimeout(() => {
    //       navigate(response.data.redirectTo || "/");
    //     }, 1500);
    //   } else {
    //     NotificationService.error("Something went wrong. Please try again.");
    //     navigate(response.data.redirectTo || "/");
    //     regenerateIdempotencyKey();
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   NotificationService.error(
    //     "Error completing registration. Please try again."
    //   );
    // } finally {
    //   setIsSubmitting(false);
    // }
    if (response.status >= 200 && response.status < 300) {
        NotificationService.success("Registration completed successfully!");
        setTimeout(() => {
          navigate(response.data.redirectTo || "/");
        }, 1500);
      } else {
        NotificationService.error("Something went wrong. Please try again.");
        regenerateIdempotencyKey(); // reset on failure
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
  
      if (error?.response?.status === 409) {
        NotificationService.error("Request was already processed. Please refresh the page or try again.");
      } else {
        NotificationService.error("Error completing registration. Please try again.");
      }
  
      regenerateIdempotencyKey(); // 🔁 regenerate on failure
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Complete Your Registration
            </CardTitle>
            <CardDescription className="text-center">
              Please provide the following information to complete your profile
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="testuser2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country */}
                  {/* <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sri Lanka"
                            {...field}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-400 transition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Currency */}
                  {/* <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0712345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* City */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Wattala" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* State/Province */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="Hendala" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Zip/Postal Code */}
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip/Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="11300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Preferred Categories - Multi-select */}
                <FormField
                  control={form.control}
                  name="preferredCategories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Categories</FormLabel>
                      <FormDescription>
                        Select the categories you are interested in. You can
                        select multiple options.
                      </FormDescription>
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value.length && "text-muted-foreground"
                                )}
                              >
                                {field.value.length > 0
                                  ? `${field.value.length} categories selected`
                                  : "Select categories"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search categories..." />
                              <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-auto">
                                  {categories.map((category) => (
                                    <CommandItem
                                      key={category.id}
                                      value={category.id}
                                      onSelect={() => {
                                        const isSelected = field.value.includes(
                                          category.id
                                        );
                                        const newValue = isSelected
                                          ? field.value.filter(
                                              (value) => value !== category.id
                                            )
                                          : [...field.value, category.id];
                                        field.onChange(newValue);
                                      }}
                                    >
                                      <Checkbox
                                        checked={field.value.includes(
                                          category.id
                                        )}
                                        className="mr-2"
                                      />
                                      {category.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {/* Display selected categories */}
                        {field.value.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {field.value.map((categoryId) => {
                              const category = categories.find(
                                (c) => c.id === categoryId
                              );
                              return category ? (
                                <div
                                  key={categoryId}
                                  className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
                                >
                                  {category.label}
                                  <button
                                    type="button"
                                    className="ml-1 text-orange-600 hover:text-orange-800"
                                    onClick={() => {
                                      field.onChange(
                                        field.value.filter(
                                          (value) => value !== categoryId
                                        )
                                      );
                                    }}
                                  >
                                    ×
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Completing Registration..."
                    : "Complete Registration"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              By completing registration, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default RegistrationCompletePage;
