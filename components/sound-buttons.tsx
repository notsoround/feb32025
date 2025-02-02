"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SoundButtons() {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio('/Hales-Ai_Quantum_Code/sounds/hover_sound.mp3');
    clickSound.current = new Audio('/Hales-Ai_Quantum_Code/sounds/on_click_sound.mp3');
  }, []);

  const playHoverSound = () => {
    if (hoverSound.current instanceof HTMLAudioElement) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

  const playClickSound = () => {
    if (clickSound.current instanceof HTMLAudioElement) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex justify-center py-6 px-8 bg-black/50 rounded-xl z-50">
      <div className="flex gap-6 items-center pointer-events-auto">
        <Link href="/matts-tasklist">
          <Button 
            variant="outline" 
            className="bg-transparent border-2 border-[#50c878] text-[#50c878] hover:bg-[#50c878] hover:text-black px-6 py-3"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Task List
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/Hales-Ai_Quantum_Code">
          <Button 
            variant="outline" 
            className="bg-transparent border-2 border-[#00f5d4] text-[#00f5d4] hover:bg-[#00f5d4] hover:text-black px-6 py-3"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Quantum Code
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/Realtime_chatgpt_jan2025">
          <Button 
            variant="outline" 
            className="bg-transparent border-2 border-[#ff69b4] text-[#ff69b4] hover:bg-[#ff69b4] hover:text-black px-6 py-3"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Voice Chat
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}