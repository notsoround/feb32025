import Image from "next/image";
import ParentComponent from "@/components/parentComponent";
import AiCard from "@/components/ai-card";
import { MatrixBackground } from "@/components/MatrixBackground";
import SocialFeeds from "@/components/social-feeds";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <MatrixBackground>
        <div className="relative z-10 pointer-events-auto">
          <main className="bg-none pb-8">
            <div className="flex flex-col items-center md:px-24 lg:px-24 px-4 mb-5">
              <h1 className="gradient-text mt-20 md:text-5xl text-2xl">Hales Ai.</h1>
              <div className="hover:cursor-pointer w-full relative z-20 pointer-events-auto mb-20">
                <ParentComponent />
              </div>
              <div className="text-white flex flex-col gap-5 text-center my-5 mb-10">
                <p className="gradient-text lg:text-xl text-base pointer-events-none">Meet Our Team Of Ai Expert Agents</p>
                <p className="gradient-text text-base pointer-events-none">Each member is dedicated to providing top-notch services and solutions. From counseling to translation, our agents excel in various tasks.</p>
              </div>
            </div>
            <div className="container mx-auto px-4 md:px-24 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
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
                imageUrl="/brutal.jpeg"
                role="Ai Anything Goes Bot! 0 Guard rails"
                name="Brutal Bot"
              /> 
            </div>
            <div className="w-full"><SocialFeeds /></div>
            <footer className="text-center py-4 text-white">
              <p className="gradient-text text-base">Hales.Ai &copy; 2024</p>
            </footer>
          </main>
        </div>
      </MatrixBackground>
    </div>
  );
}
