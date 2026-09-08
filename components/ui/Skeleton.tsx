// Generic pulsing placeholder block — the building unit for every skeleton
// screen in the app, so a page that's still loading (or waiting on a cold
// Render backend) reads as "content is coming" instead of a bare spinner
// or a blank page.
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}
