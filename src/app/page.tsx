import Archive from "@/components/archive";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCF0] overflow-hidden flex flex-col items-center justify-center p-4 font-body">
      <div className="max-w-7xl w-full mb-12 px-6">
        <h1 className="text-6xl font-headline font-bold text-neutral-800">The Firsts</h1>
        <p className="text-xl text-neutral-500 mt-4">Continuous history. Drag to jump ahead.</p>
      </div>
      
      <Archive />

      <div className="mt-12 flex gap-4 items-center text-neutral-400 font-medium">
        <span>AUTO-SCROLL ACTIVE</span>
        <div className="w-12 h-[1px] bg-neutral-300"></div>
        <span>NON-STOP HOVER</span>
      </div>
    </main>
  );
}
