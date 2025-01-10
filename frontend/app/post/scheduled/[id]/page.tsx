import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ScheduledPost() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Approval Workflow</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-sm font-medium">
              Marketting team
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Scheduled for: Tomorrow, 10:00 AM
            </span>
          </div>
          <div className="bg-[#FEF9C3] rounded-2xl px-3 py-1 flex items-center justify-center">
            <span className="text-xs text-[#854D0E]">Pending Review</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://placehold.co/600x600"
                alt="Post preview"
                className="w-full h-72 object-cover rounded-lg transition-opacity duration-300 opacity-100"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3"
                  rows={4}
                  readOnly
                  value="🚀 Exciting news! We're launching our new feature next week.
                  Stay tuned for more updates! #Innovation #Technology"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </span>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    Instagram
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    Facebook
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button variant={"outline"}>Request Changes</Button>
            <Button className="bg-purple-500 hover:bg-purple-600">
              Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
