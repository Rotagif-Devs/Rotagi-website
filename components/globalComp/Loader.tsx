import Image from "next/image"
const Loader = () => {
  return (
    <section className="flex justify-center">
        <div className="flex justify-center text-center flex-col rounded-2xl bg-white p-20">
        {/* <Image src=""/> */}
         <h3 className="!font-light my-2">Processing Payment</h3>
         <p className="text-[#D62D88] !text-xl font-light ">Please do not refresh the page or close the browser</p>
         </div>
    </section>
  )
}
export default Loader