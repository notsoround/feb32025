import Image from "next/image";
import ParentComponent from "@/components/parentComponent";
import AiCard from "@/components/ai-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatrixBackground } from "@/components/MatrixBackground";

export default function Home() {
  return (
    <div className="relative">
      <MatrixBackground>
        <div className="relative z-10">
        <main className="bg-none">
            <div className="flex flex-col items-center justify-between md:px-24 lg:px-24 px-4 mb-5">
              <h1 className="gradient-text mt-20 md:text-5xl text-2xl">Hales Ai</h1>
              <div className="hover:cursor-pointer w-full h-full">
                <ParentComponent />
              </div>
              <div className="text-white flex flex-col gap-5 text-center my-5">
                <p className="gradient-text text-xl text-base">Meet Our Team Of Ai Expert Agents</p>
                <p className="gradient-text text-base">Each member is dedicated to providing top-notch services and solutions. From counseling to translation, our agents excel in various tasks.</p>
              </div>
            </div>
            <div className="md:px-24 lg:px-24 px-4 py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <AiCard
                imageUrl="/ivonna.png"
                role="Ai Tech Innovator Fire & Safety"
                name="Ivonna"
              />
              <AiCard
                imageUrl="/sophia.webp"
                role="AI Insurance Specialist"
                name="Sophia"
              />
              <AiCard
                imageUrl="/giri.webp"
                role="Ai Global Health Expert"
                name="Giri"
              />
              <AiCard
                imageUrl="/mining.webp"
                role="Ai Mining Safety Expert"
                name="Dr. Mining Manhattan"
              />
              <AiCard
                imageUrl="/elon.webp"
                role="Hales Ai main bot"
                name="Elon musk bot"
              />
              <AiCard
                imageUrl="/big_book.webp"
                role="Ai AA Expert"
                name="Big Book Bot"
              />
              <AiCard
                imageUrl="/brady.webp"
                role="Ai Annuities Expert"
                name="Brady Bot"
              />
              <AiCard
                imageUrl="/commy.webp"
                role="Ai Mineral Trader"
                name="Commy Trader"
              />
              <AiCard
                imageUrl="/luna.webp"
                role="Ai Schedule Strategist"
                name="Luna Listkeeper"
              />
              <AiCard
                imageUrl="/kate.webp"
                role="​Ai Live Translator"
                name="Kate Cross"
              />
              <AiCard
                imageUrl="/phil.webp"
                role="Ai Extreme Health & Wellness"
                name="Phil Extreme"
              />
              <AiCard
                imageUrl="/brutal.webp"
                role="Ai  Zero Tolerance Expert"
                name="Brutal Bot"
              />
              <footer className="text-center py-4 text-white">
                <p>Hales.Ai &copy; 2024</p>
              </footer>
            </div>
          </main>
        </div>
      </MatrixBackground>
    </div>
  );
}
