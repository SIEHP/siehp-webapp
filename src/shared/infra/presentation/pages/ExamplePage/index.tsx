"use client";
import Image from "next/image";

import siehpLogo from "@/shared/infra/presentation/assets/images/siehp_logo.png";
import { useExample } from "@/shared/infra/services/hooks/useExample";
import { ExampleComponent } from "@/shared/infra/presentation/components/ExampleComponent";

const ExamplePage = () => {
  const { example } = useExample();
  return (
    <div>
      Example Page
      <p>Vem do contexto do layout: {example}</p>
      <ExampleComponent.Root className="border-2">
        <ExampleComponent.Title>Example Component</ExampleComponent.Title>
      </ExampleComponent.Root>
      <Image
        src={siehpLogo.src}
        alt="Siehp Logo"
        width={siehpLogo.width}
        height={siehpLogo.height}
      />
    </div>
  );
};

export default ExamplePage;
