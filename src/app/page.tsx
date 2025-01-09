import Image from "next/image";
import SignIn from '@components/login/SignIn';
import AppBarMenu from "@/components/AppBarMenu";
import StepperComponent from "@/components/product/StepperComponent";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <StepperComponent/>
    </div>
  );
}
