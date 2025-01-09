"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  brand_name: z.string().nonempty("Please enter your brand name."),
  brand_description: z
    .string()
    .nonempty("Please enter your brand description."),
  brand_logo: z
    .custom<FileList>()
    .refine(
      (files) => files && files.length > 0,
      "Please upload your brand logo."
    )
    .refine(
      (files) => files && files[0]?.size <= 10 * 1024 * 1024,
      "Logo must be less than 10 MB"
    )
    .refine(
      (files) =>
        files &&
        ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
          files[0]?.type
        ),
      "Logo must be a PNG, JPG, or GIF"
    ),
  brand_tone: z.enum(["professional", "casual", "friendly", "formal"]),
});

export const SetupFrom = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: "",
      brand_description: "",
      brand_logo: undefined,
      brand_tone: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted:", values);

      const formData = new FormData();
      formData.append("brand_name", values.brand_name);
      formData.append("brand_description", values.brand_description);
      formData.append("brand_tone", values.brand_tone);

      // Append the brand_logo file (assuming it's the first file in the FileList)
      if (values.brand_logo && values.brand_logo[0]) {
        formData.append("brand_logo", values.brand_logo[0]);
      }

      // Send the FormData to the backend
      const response = await fetch("http://192.168.1.64:8000/api/brands/", {
        method: "POST",
        body: formData,
      });

      // Parse the response
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("API response:", data);
      form.reset();
      router.push("/dashboard");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="w-[800px] ml-16">
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-2">
          Tell us about your brand
        </h1>
        <p className="text-gray-600 mb-8">
          Let's get started by setting up your brand profile.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="brand_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Brand logo */}
            <FormField
              control={form.control}
              name="brand_logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Logo</FormLabel>
                  <FormControl>
                    <div className="mt-1 border-2 border-dashed rounded-lg p-8">
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-purple-400 mb-2" />
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          onChange={(e) => field.onChange(e.target.files)}
                          className="hidden"
                          id="brand-logo"
                        />
                        <label
                          htmlFor="brand-logo"
                          className="cursor-pointer text-center"
                        >
                          <p className="text-gray-500">Upload a file</p>
                          <p className="text-gray-500 text-sm">
                            or drag and drop
                          </p>
                          <p className="text-gray-400 text-sm">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Brand description */}
            <FormField
              control={form.control}
              name="brand_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Brand tone */}
            <FormField
              control={form.control}
              name="brand_tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Tone</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
