import Skeleton from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-dm-sans">
      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] bg-gray-100 flex items-end pb-12 md:pb-24 pt-32">
        <div className="relative z-10 max-w-[1260px] mx-auto w-full px-5 md:px-10">
          <Skeleton className="h-4 w-32 mb-8 bg-gray-300" />
          <Skeleton className="h-6 w-24 mb-6 rounded-full bg-gray-300" />
          <Skeleton className="h-12 md:h-16 w-3/4 max-w-2xl bg-gray-300" />
        </div>
      </div>

      {/* Content + sidebar */}
      <section className="max-w-[1260px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-64 w-full my-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="w-full lg:w-[400px] shrink-0">
            <Skeleton className="h-80 w-full rounded-[32px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
