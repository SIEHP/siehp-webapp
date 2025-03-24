import React from "react";

export interface AdminPagesHeaderRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface AdminPagesHeaderTitleProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface AdminPagesHeaderButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface AdminPagesHeaderButtonIconProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface AdminPagesHeaderFilterProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export interface AdminPagesHeaderButtonContentProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface AdminPagesHeaderBodyProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
