import { CreateInstantPostForm } from "@/components/posts/create-instant-post-form";

export default function InstantPostPage() {
  return (
    // <div>
    //   <CreateInstantPostForm />
    // </div>
    <main className="flex-1 overflow-y-auto py-10">
      <div className="mx-auto max-w-2xl px-4">
        <CreateInstantPostForm />
      </div>
    </main>
  );
}
