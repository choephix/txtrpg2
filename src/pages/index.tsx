import Image from "next/image";
import { Inter } from "next/font/google";
import { ChatView } from "@/components/chat-view";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ChatView />
  );
}
