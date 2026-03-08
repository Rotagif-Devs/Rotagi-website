import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
const DonateFailed = () => {
  return (
    <section className="bg-[#F8E0ED] flex justify-center items-center">
      <div className="px-8 md:px-15 sm:py-10 md:py-10 py-10 md:w-[55%] w-full flex flex-col justify-center">
        <div className="flex justify-center items-center">
        <Image
          src="/failed.png"
          width={200}
          height={200}
          alt=""
          className="object-contain relative"
        />
        </div>
        <h2 className="!font-medium text-center !leading-none !normal-case ">
          We couldn’t process your payment
        </h2>
        <p className="!text-[1.1rem] my-8 text-center">
          Your donation is very important to us. Please check your details or
          try a different method.
        </p>
        <div className="bg-[#FABFD3] px-6 py-6 my-8 rounded-lg">
          <h4 className="text-black !font-medium text-lg mb-3">
            Common Issues
          </h4>

          <ul className="list-disc list-inside space-y-2 text-black text-sm font-thin">
            <li>Insufficient funds</li>
            <li>Card declined by your bank</li>
            <li>Unstable network connection</li>
          </ul>
        </div>

        <Button
          href="/donate"
          variant="primary"
          className="text-center !text-sm !font-light mb-6"
        >
          Try Again
        </Button>
        <Link href="/" className="text-[#D62D88] text-center">
          still having trouble?<span> Contact support </span>
        </Link>
      </div>
    </section>
  );
};

export default DonateFailed;
