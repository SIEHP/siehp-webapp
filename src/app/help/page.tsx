"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HelpPageRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/help/iniciar-sessao");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center flex-grow max-h-[calc(100vh-170px)]">
      <p className="text-gray-700">Redirecionando para a página de ajuda...</p>
    </div>
  );
} 