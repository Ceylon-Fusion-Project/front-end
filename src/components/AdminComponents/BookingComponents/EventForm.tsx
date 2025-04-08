import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUploader } from "../ImageUploader";
import { EventPreview } from "./EventPreview";
import { experienceCenters } from "../../../lib/data";

// const formSchema = z.object({
//   eventName: z.string().min(2, {
//     message: "Event name must be at least 2 characters.",
//   }),
//   eventDescription: z.string().min(10, {
//     message: "Description must be at least 10 characters.",
//   }),
//   pricePerEvent: z.coerce.number().positive({
//     message: "Price must be a positive number.",
//   }),
//   isAvailable: z.boolean(),
//   startDateTime: z.string().nonempty("Please enter a start date and time."), // Updated to datetime
//   endDateTime: z.string().nonempty("Please enter an end date and time."), // Updated to datetime
//   eventImageURLs: z.array(z.string()).min(1, {
//     message: "At least one event image is required.",
//   }),
//   experienceId: z.coerce.number().min(1, {
//     message: "Please select an experience center.",
//   }),
// });
const formSchema = z
  .object({
    eventName: z.string().min(2, {
      message: "Event name must be at least 2 characters.",
    }),
    eventDescription: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    pricePerEvent: z.coerce.number().positive({
      message: "Price must be a positive number.",
    }),
    isAvailable: z.boolean(),
    startDateTime: z.string().nonempty("Please enter a start date and time."),
    endDateTime: z.string().nonempty("Please enter an end date and time."),
    eventImageURLs: z.array(z.string()).min(1, {
      message: "At least one event image is required.",
    }),
    experienceId: z.coerce.number().min(1, {
      message: "Please select an experience center.",
    }),
  })
  .refine(
    (data) =>
      new Date(data.endDateTime).getTime() >
      new Date(data.startDateTime).getTime(),
    {
      message: "End date and time must be after the start date and time.",
      path: ["endDateTime"],
    }
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time part
      const start = new Date(data.startDateTime);
      const end = new Date(data.endDateTime);
      return start >= today && end >= today;
    },
    {
      message: "Dates must be today or in the future.",
      path: ["startDateTime"], // Apply error to startDateTime, adjust as needed
    }
  );

type FormValues = z.infer<typeof formSchema>;

function formatDateTimeLocal(dateStr: string): string {
  const date = new Date(dateStr);
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

export function EventForm({ event, onSave, onCancel }: { event?: FormValues; onSave: (data: FormValues) => void; onCancel: () => void }) {
  const [showPreview, setShowPreview] = useState(false);

  // const defaultValues: Partial<FormValues> = {
  //   eventName: event?.eventName || "",
  //   eventDescription: event?.eventDescription || "",
  //   pricePerEvent: event?.pricePerEvent || 0,
  //   isAvailable: event?.isAvailable || true,
  //   startDateTime: event?.startDateTime || "", // Updated to datetime
  //   endDateTime: event?.endDateTime || "", // Updated to datetime
  //   eventImageURLs: event?.eventImageURLs || [],
  //   experienceId: event?.experienceId || 0,
  // };
  const defaultValues: Partial<FormValues> = {
    eventName: event?.eventName || "",
    eventDescription: event?.eventDescription || "",
    pricePerEvent: event?.pricePerEvent || 0,
    isAvailable: event?.isAvailable ?? true,
    startDateTime: event?.startDateTime ? formatDateTimeLocal(event.startDateTime) : "",
    endDateTime: event?.endDateTime ? formatDateTimeLocal(event.endDateTime) : "",
    eventImageURLs: event?.eventImageURLs || [],
    experienceId: event?.experienceId || 0,
  };  
  

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Watch all form values to pass them to the preview
  const formValues = form.watch();

  function onSubmit(values: FormValues) {
    const finalData = {
      ...values,
      eventId: event?.eventId, //Ensure this is passed back for edit mode
    };
    onSave(finalData);
  }
  

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-amber-800">
          {event ? "Edit Event" : "Add New Event"}
        </h2>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-2 py-1 border rounded border-amber-600 text-amber-700 hover:bg-amber-50"
        >
          {showPreview ? "Edit Form" : "Preview Event"}
        </button>
      </div>

      {showPreview ? (
        <EventPreview event={formValues} onBack={() => setShowPreview(false)} />
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block mb-1 font-semibold">Event Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Cooking Class"
              {...form.register("eventName")}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.eventName?.message}
            </p>
          </div>

          {/* Event Description */}
          <div>
            <label className="block mb-1 font-semibold">Event Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded min-h-[120px]"
              placeholder="Learn to cook traditional dishes..."
              {...form.register("eventDescription")}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.eventDescription?.message}
            </p>
          </div>

          {/* Price Per Event */}
          <div>
            <label className="block mb-1 font-semibold">Price Per Event</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border rounded"
              {...form.register("pricePerEvent", { valueAsNumber: true })}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.pricePerEvent?.message}
            </p>
          </div>

          {/* Start Date and Time */}
          <div>
            <label className="block mb-1 font-semibold">Start Date and Time</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border rounded"
              {...form.register("startDateTime")}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.startDateTime?.message}
            </p>
          </div>

          {/* End Date and Time */}
          <div>
            <label className="block mb-1 font-semibold">End Date and Time</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border rounded"
              {...form.register("endDateTime")}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.endDateTime?.message}
            </p>
          </div>

          {/* Experience Center */}
          <div>
            <label className="block mb-1 font-semibold">Experience Center</label>
            <select
              className="w-full px-3 py-2 border rounded"
              {...form.register("experienceId", { valueAsNumber: true })}
            >
              <option value={5}>Select experience center</option>
              {experienceCenters.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.experienceId?.message}
            </p>
          </div>

          {/* Event Images */}
          <div>
            <label className="block mb-1 font-semibold">Event Images</label>
            <ImageUploader
              value={formValues.eventImageURLs || []}
              onChange={(urls) => form.setValue("eventImageURLs", urls)}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.eventImageURLs?.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4 space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-amber-700 hover:bg-amber-800"
            >
              Save Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
}