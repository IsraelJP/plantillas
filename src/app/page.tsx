import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white-500  min-h-screen">
      <header className="bg-yellow-200 w-full h-20 flex items-center justify-center">
          <div>
            <Image
              src="/logo-encabeza.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
        </header>
      <main className="flex ">
        
      </main>
    </div>
  );
}
