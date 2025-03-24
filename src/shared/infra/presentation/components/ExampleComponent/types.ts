import { HTMLAttributes, ReactNode } from "react";

export interface ExampleComponentRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export interface ExampleComponentTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
}