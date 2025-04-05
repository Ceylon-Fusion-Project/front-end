import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUploader } from "../ImageUploader";
import { RoomPreview } from "./RoomPreview";
import { accommodations } from "../../../lib/data";
import { Room, RoomType } from "./RoomManagement";

interface RoomFormProps {
  room: Room | null;
  onSave: (roomData: Omit<Room, "roomId" | "createdAt" | "updatedAt"> & {
    roomId?: number;
    createdAt?: string;
    updatedAt?: string;
  }) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  roomCode: z.string().min(2, {
    message: "Room code must be at least 2 characters.",
  }),
  roomNumber: z.coerce.number().positive({
    message: "Room number must be a positive number.",
  }),
  roomType: z.nativeEnum(RoomType),
  beds: z.coerce.number().positive({
    message: "Number of beds must be a positive number.",
  }),
  pricePerNight: z.coerce.number().positive({
    message: "Price per night must be a positive number.",
  }),
  isAvailable: z.boolean().optional(),
  roomImageURLs: z.array(z.string()).min(1, {
    message: "At least one room image is required.",
  }),
  accommodationId: z.coerce.number().min(1, {
    message: "Please select an accommodation.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function RoomForm({ room, onSave, onCancel }: RoomFormProps) {
  const [showPreview, setShowPreview] = useState(false);

  const defaultValues: Partial<FormValues> = {
    roomCode: room?.roomCode || "",
    roomNumber: room?.roomNumber || 0,
    roomType: room?.roomType || RoomType.SINGLE,
    beds: room?.beds || 0,
    pricePerNight: room?.pricePerNight || 0,
    roomImageURLs: room?.roomImageURLs || [],
    accommodationId: room?.accommodationId || 0,
    isAvailable: true,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const formValues = form.watch();

  function onSubmit(values: FormValues) {
    onSave({
      ...values,
      roomId: room?.roomId,
    });
  }

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-amber-800">
          {room ? "Edit Room" : "Add New Room"}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-2 py-1 border rounded border-amber-600 text-amber-700 hover:bg-amber-50"
          >
            {showPreview ? "Edit Form" : "Preview Room"}
          </button>
          <button
            onClick={onCancel}
            className="px-2 py-1 border rounded border-gray-600 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      {showPreview ? (
        <RoomPreview room={formValues} onBack={() => setShowPreview(false)} />
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Room Code */}
          <div>
            <label className="block mb-1 font-semibold">Room Code</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="RM001"
              {...form.register("roomCode")}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.roomCode?.message}
            </p>
          </div>

          {/* Room Number */}
          <div>
            <label className="block mb-1 font-semibold">Room Number</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              {...form.register("roomNumber", { valueAsNumber: true })}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.roomNumber?.message}
            </p>
          </div>

          {/* Room Type */}
          <div>
            <label className="block mb-1 font-semibold">Room Type</label>
            <select
              className="w-full px-3 py-2 border rounded"
              {...form.register("roomType")}
            >
              {Object.values(RoomType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.roomType?.message}
            </p>
          </div>

          {/* Beds */}
          <div>
            <label className="block mb-1 font-semibold">Beds</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              {...form.register("beds", { valueAsNumber: true })}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.beds?.message}
            </p>
          </div>

          {/* Price Per Night */}
          <div>
            <label className="block mb-1 font-semibold">Price Per Night</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border rounded"
              {...form.register("pricePerNight", { valueAsNumber: true })}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.pricePerNight?.message}
            </p>
          </div>

          {/* Accommodation */}
          <div>
            <label className="block mb-1 font-semibold">Accommodation</label>
            <select
              className="w-full px-3 py-2 border rounded"
              {...form.register("accommodationId", { valueAsNumber: true })}
            >
              <option value={0}>Select accommodation</option>
              {accommodations.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.accommodationId?.message}
            </p>
          </div>

          {/* Room Images */}
          <div>
            <label className="block mb-1 font-semibold">Room Images</label>
            <ImageUploader
              value={formValues.roomImageURLs || []}
              onChange={(urls) => form.setValue("roomImageURLs", urls)}
            />
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.roomImageURLs?.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4 space-x-4">
            <button
              type="button"
              onClick={() => form.reset()}
              className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-amber-700 hover:bg-amber-800"
            >
              {room ? "Update Room" : "Save Room"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}