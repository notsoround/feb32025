import React from 'react'
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin, LucideIcon } from 'lucide-react'

interface SocialIconProps {
    Icon: LucideIcon;
}

function SocialIcon({ Icon }: SocialIconProps) {
    return (
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
        </div>
    )
}

interface CardProps {
    name: string;
    role: string;
    imageUrl: string;
}

export default function AiCard({ name, role, imageUrl }: CardProps) {
    return (
        <Card className="w-full max-w-3xl text-white overflow-hidden border-0 rounded-none" style={{ backgroundColor: 'rgba(82,82,82,0.8)' }}>
            <CardContent className="p-0 flex">
                {/* Image section */}
                <div className="w-1/2 h-80">
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full"
                        width={100}
                        height={100}
                        priority
                    />
                </div>

                {/* Content section */}
                <div className="w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-normal mb-2 text-gray-300">{role}</h3>
                        <h2 className="text-3xl font-bold mb-4">{name}</h2>
                    </div>

                    {/* Social icons */}
                    <div className="flex space-x-4">
                        <SocialIcon Icon={Facebook} />
                        <SocialIcon Icon={Twitter} />
                        <SocialIcon Icon={Linkedin} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}