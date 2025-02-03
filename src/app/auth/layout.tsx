import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-14 flex flex-col justify-center border-b border-b-slate-200">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 font-heading text-xl font-medium">
            <Image src={"/logo.svg"} width={28} height={28} alt="logo"></Image>
            <span className="-tracking-wider">model.eval</span>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
