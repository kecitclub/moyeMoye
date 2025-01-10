import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCESS_TOKEN, INSTAGRAM_ACCOUNT_ID } from "@/constants/constants";
import { Eye } from "lucide-react";

const getInstagramAnalytics = async (id: string) => {
  const response = await fetch(
    `https://graph.facebook.com/v17.0/${id}/insights?metric=impressions,reach,likes&access_token=${ACCESS_TOKEN}`
  );
  return response.json();
};

const getComments = async (id: string) => {
  const response = await fetch(
    `https://graph.facebook.com/v17.0/${id}/comments?access_token=${ACCESS_TOKEN}`
  );
  return response.json();
};

export default async function SingleAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const instagramAnalytics = await getInstagramAnalytics(id);
  console.log(instagramAnalytics);
  for (const analytics of instagramAnalytics.data) {
    console.log(`${analytics.name}: ${JSON.stringify(analytics.values)}`);
  }

  const comments = await getComments(id);
  console.log(comments);
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Instagram Analytics</h1>
        {/* <Button className="bg-[#3B82F6] hover:bg-[#2563EB]"> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Engagement
            </CardTitle>
            <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded">
              +12%
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5K</div>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded">
              {/* <div className="h-2 w-3/4 bg-[#3B82F6] rounded" /> */}
              <div className="h-2 w-3/4 bg-[#A855F7] rounded"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scheduled Posts
            </CardTitle>
            <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded">
              Next 7 days
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded">
              {/* <div className="h-2 w-1/2 bg-green-500 rounded" /> */}
              <div className="h-2 w-1/2 bg-[#A855F7] rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recent Comments
            </CardTitle>
            <span className="text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
              Needs Response
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded">
              {/* <div className="h-2 w-4/5 bg-yellow-500 rounded" /> */}
              <div className="h-2 w-4/5 bg-[#A855F7] rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-[100px] h-[100px] bg-gray-200 rounded" />
                <div className="space-y-1">
                  <h3 className="font-medium">New Product Launch</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled for tomorrow at 10:00 AM
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-[100px] h-[100px] bg-gray-200 rounded" />
                <div className="space-y-1">
                  <h3 className="font-medium">Weekly Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled for Friday at 2:00 PM
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded">
              Performance Chart
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="space-y-1">
                <p className="text-sm">
                  New comment on your post "Launch Update"
                </p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="space-y-1">
                <p className="text-sm">Post scheduled "Weekly Newsletter"</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
