'use client';

import { Portfolio } from '@/components/Portfolio/Portfolio';
import { ChatInterface } from '@/components/Chat/ChatInterface';

export default function Home() {
  return (
    <main className="relative">
      <Portfolio />
      <ChatInterface />
    </main>
  );
}
