import * as React from "react";

export interface TableRootProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

export interface TableCellStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  status: string;
}

export interface TableCellMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
}
export interface TableCellButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
