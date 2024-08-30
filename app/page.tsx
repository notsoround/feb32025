import Image from "next/image";
import ParentComponent from "@/components/parentComponent";
import AiCard from "@/components/ai-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatrixBackground } from "@/components/MatrixBackground";

export default function Home() {
  return (
    <main className="bg-black">
      <MatrixBackground>
        <div className="flex flex-col items-center justify-between md:px-24 lg:px-24 px-4 mb-5">
          <h1 className="text-green-500 mt-20 md:text-5xl text-2xl">Hales io Ai Sahil</h1>
          <div className="hover:cursor-pointer w-full h-full">
            <ParentComponent />
          </div>
          <div className="text-white flex flex-col gap-5 text-center my-5">
            <p className="md:text-xl lg:text-xl text-base">Meet Our Team Of Ai Expert Agents</p>
            <p className="md:w-[33rem] lg:w-[33rem] w-full lg:text-xl text-base">Discover our exceptional team of AI agents at Hales .Ai Each member is dedicated to providing top-notch services and solutions. From counseling to translation, our agents excel in various tasks.</p>
          </div>
        </div>
      </MatrixBackground>
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
          name="Phil Extreme"
        />
        <AiCard
          imageUrl="/phil.webp"
          role="Ai Extreme Health & Wellness"
          name="Kate Cross"
        />
        <AiCard
          imageUrl="/brutal.webp"
          role="Ai  Zero Tolerance Expert"
          name="Brutal Bot"
        />
      </div>
      <div className="min-h-screen md:px-24 lg:px-24 px-4"></div>
      <div className="md:px-24 lg:px-24 px-4 py-20 lg:ml-20">
        <Card className="w-full lg:max-w-sm  overflow-hidden  text-white border-0 rounded-none">
          <div className=" relative h-60">
            <Image
              src="/adam.webp"
              alt="adam"
              className="w-full h-full object-cover"
              layout="fill"
            />
          </div>
          <CardContent className="p-0">
            <div className="bg-blue-600 p-6">
              <h2 className="text-2xl font-bold mb-2">Adam Caar</h2>
              <p className="text-sm mb-4">developer</p>
              <p className="text-sm mb-4">Use this space to introduce yourself and share your professional history.</p>
              <Button variant="link" className="text-white p-0 w-fit font-normal">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </main>
  );
}
