import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import CategorySelectionSection from "@/components/sections/CategorySelectionSection";
import MainPageListSection from "@/components/sections/MainPageListSection";
import Footer from "@/components/layout/footer";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans ">
      <main className="flex min-h-screen w-full max-w-[800px] flex-col items-center justify-start gap-3 py-30 px-2 bg-black">
        <header className="flex flex-col items-center gap-2 justify-center max-w-[320px]">
          <Logo size={48} color="#FACC15" />
          <h1 className="text-center text-2xl mt-3 text-zinc-100">time.fyi</h1>
          <p className="text-zinc-400 text-center">
            Time related tools to help you stay productive and organized
          </p>
          <Link href="/timezones">
            <Button variant="yellow" size="lg" className="rounded-full">
              Start App
            </Button>
          </Link>
          <p className="text-center text-xs text-zinc-400">
            No sign-up required
          </p>
        </header>
        <CategorySelectionSection />
        <div className="max-w-lg">
          <MainPageListSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
