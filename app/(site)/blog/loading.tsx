import Skeleton from "@/components/ui/Skeleton";

// Next.js shows this automatically while BlogPage's server-side data fetch
// (publicService.getBlogPosts) is still in flight — most noticeably when
// the backend is cold-starting on Render and the request takes a few
// seconds, so the visitor sees an obvious "content is loading" layout
// instead of a blank screen.
export default function BlogLoading() {
  return (
    <main className="min-h-screen md:p-4 p-3">
      {/* Hero */}
      <section className="rounded-2xl bg-primary px-6 py-16 md:py-24 text-center">
        <Skeleton className="h-4 w-40 mx-auto mb-4" />
        <Skeleton className="h-10 w-3/4 max-w-xl mx-auto mb-3" />
        <Skeleton className="h-5 w-2/3 max-w-md mx-auto" />
      </section>

      {/* Featured post */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto py-10">
        <Skeleton className="w-full aspect-[21/9] rounded-3xl mb-4" />
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </section>

      {/* Article grid */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto pb-10">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
              <Skeleton className="w-full aspect-[16/10] rounded-none" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
