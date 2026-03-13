import EventReady from "@/components/Event/EventReady"
import VideoPlayer from "@/components/globalComp/Videoplayer"
import ExploreEvent from "@/components/Event/ExploreEvent"
import EventsHero from "@/components/Event/EventHero"
const page = () => {
  return (
    <main className="min-h-screen md:p-4 p-3">
        <EventsHero/>
        <ExploreEvent/>
        <EventReady/>
        <VideoPlayer/>
    </main>
  )
}
export default page