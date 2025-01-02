import { Form } from "@/features/auth/components/form";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center pb-[56px]">
      <div className="space-y-[72px]">
        <div className="flex flex-col items-center space-y-7">
          <Image src={"/logo.svg"} width={48} height={48} alt="logo"></Image>

          <div className="space-y-2 flex flex-col items-center">
            <h1 className="font-heading text-4xl font-medium -tracking-wider">
              É bom ter você aqui.
            </h1>
            <p className="font-body font-medium text-slate-600 max-w-[50ch] text-center">
              Descubra como o seu modelo Flan/T5 performa na criação de questões
              educacionais de forma fácil e rápida.
            </p>
          </div>
        </div>
        
        <Form />
      </div>
    </div>
  );
}
