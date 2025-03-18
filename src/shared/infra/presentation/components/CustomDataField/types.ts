import * as React from "react";

export interface DataFieldRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DataFieldTitleProps
  extends React.HTMLAttributes<HTMLHeadElement> {
  children: React.ReactNode;
}

export interface DataFieldContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DataFieldContentTextProps
  extends React.HTMLAttributes<HTMLInputElement> {}

export interface DataFieldContentDateProps
  extends React.HTMLAttributes<HTMLInputElement> {}
