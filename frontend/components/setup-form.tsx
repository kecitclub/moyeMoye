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
import { Upload } from "lucide-react";

export const SetupFrom = () => {
  return (
    <div className="w-[800px] ml-16">
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-2">
          Tell us about your brand
        </h1>
        <p className="text-gray-600 mb-8">
          Let's get started by setting up your brand profile.
        </p>

        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium">Brand Name</label>
            <Input className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Brand Logo</label>
            <div className="mt-1 border-2 border-dashed rounded-lg p-8">
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-purple-400 mb-2" />
                <div className="text-center cursor-pointer">
                  <p className="text-gray-500">Upload a file</p>
                  <p className="text-gray-500 text-sm">or drag and drop</p>
                  <p className="text-gray-400 text-sm">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Brand Description</label>
            <Textarea className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Brand Tone</label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Professional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Next Step
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
