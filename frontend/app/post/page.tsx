"use client";

import { CreateInstantPostForm } from "@/components/posts/create-instant-post-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function InstantPostPage() {
  const [isAIMode, setIsAIMode] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Create Instant Post
          </h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="ai-mode" className="text-sm text-gray-600">
              AI Mode
            </Label>
            <Switch
              id="ai-mode"
              checked={isAIMode}
              onCheckedChange={setIsAIMode}
            />
          </div>
          <CreateInstantPostForm />
        </div>
      </div>
    </main>
  );
}
