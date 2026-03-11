import React from "react";
import Button from "../ui/Button";
import Image from "next/image";

type Props = {
  onReturn: () => void;
  amount: string | number;
  email: string;
};

const DonateSuccessful = ({ onReturn, amount, email }: Props) => {
  return (
    <section className="bg-[#F8E0ED] flex justify-center items-center text-center">
      <div className="px-8 md:px-15 sm:py-10 md:py-10 py-10 md:w-[55%] w-full flex justify-center flex-col items-center">
        <Image src="/sucessp.png" width={200} height={200} alt="" className="object-contain relative"/>
       
        <h2 className="!font-medium leading-none">Thank You for Empowering <span className="text-[#D62D88]">Her Future</span> </h2>
        <p className="!text-[1.1rem] my-8">Your generous donation of <span className="text-[#D62D88]">₦{amount}</span> will make a real difference in the lives of young African Women. We’ve sent a detailed receipt to <span className="font-medium">{email}</span></p>
        <Button
            onClick={onReturn}
            variant="primary"
            className="text-center !text-sm !font-light cursor-pointer"
          >
            Return to Home Page
          </Button>
      </div>
    </section>
  );
};

export default DonateSuccessful;
