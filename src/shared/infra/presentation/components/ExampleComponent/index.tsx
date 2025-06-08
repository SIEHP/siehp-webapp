import { ExampleComponentRootProps, ExampleComponentTitleProps } from "./types";

const ExampleComponentRoot = ({
  children,
  className,
  ...props
}: ExampleComponentRootProps) => {
  return (
    <div
      className={
        // Adicionar estilização tailwind aqui
        `${className ?? ""}`
      }
      {...props}
    >
      {children}
    </div>
  );
};

const ExampleComponentTitle = ({
  children,
  className,
  ...props
}: ExampleComponentTitleProps) => {
  return (
    <h1
      className={
        // Adicionar estilização tailwind aqui
        `${className ?? ""}`
      }
      {...props}
    >
      {children}
    </h1>
  );
};

export const ExampleComponent = {
  Root: ExampleComponentRoot,
  Title: ExampleComponentTitle,
};
