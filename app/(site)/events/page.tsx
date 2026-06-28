import VideoPlayer from "@/components/globalComp/Videoplayer"
import ExploreEvent from "@/components/Event/ExploreEvent"
import EventsHero from "@/components/Event/EventHero"
import PTA from "@/components/globalComp/PTA"
const page = () => {
  return (
    <main className="min-h-screen md:p-4 p-3">
        <EventsHero/>
        <ExploreEvent/>
         <PTA />
        <VideoPlayer/>
    </main>
  )
}
export default page