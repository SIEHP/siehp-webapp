import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { RootProps, TriggerProps, ContentProps } from "./types";

const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <CollapsiblePrimitive.Root
      className={`space-y-0.25 w-[15rem] ${className ?? ""}`}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Root>
  );
};

const Trigger = ({ children, className, ...props }: TriggerProps) => {
  return (
    <CollapsiblePrimitive.Trigger
      className={`appearance-none ${className ?? ""}`}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  );
};

const Content = ({ children, className, ...props }: ContentProps) => {
  return (
    <CollapsiblePrimitive.Content
      className={`space-y-0.5 ${className ?? ""}`}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
};

export const Collapsible = { Root, Trigger, Content };
