import { useContext } from "react";
import { ExampleContext } from "../contexts/ExampleProvider";
import { ExampleContextData } from "../contexts/ExampleProvider/types";
import { OutOfContextError } from "@/shared/domain/errors";

export function useExample(): ExampleContextData {
  const context = useContext(ExampleContext);

  if (Object.keys(context).length <= 0) {
    throw new OutOfContextError("Example");
  }

  return context;
}
