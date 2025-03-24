import * as React from "react";

import {
  TableRootProps,
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableRowProps,
  TableCellStatusProps,
  TableCellButtonProps,
  TableCellMenuProps,
} from "./types";
import { ThreeDotsIcon, TopDownArrowIcon } from "../Icons";

const CustomTableRoot = ({ children, className, ...props }: TableRootProps) => {
  return (
      <table
        className={`w-full caption-bottom text-sm ${className ?? ""}`}
        {...props}
      >
        {children}
      </table>
  );
};

const CustomTableHeader = ({
  children,
  className,
  ...props
}: TableHeaderProps) => {
  return (
    <thead  className={`[&_tr]:border-b ${className ?? ""}`} {...props}>
      {children}
    </thead>
  );
};

const CustomTableBody = ({ children, className, ...props }: TableBodyProps) => {
  return (
    <tbody 
      className={`[&_tr:last-child]:border-0 ${className ?? ""}`}
      {...props}
    >
      {children}
    </tbody>
  );
};

const CustomTableFooter = ({
  children,
  className,
  ...props
}: TableFooterProps) => {
  return (
    <tfoot 
      className={`bg-muted/50 font-medium border-t [&>tr]:last:border-b-0 ${className ?? ""}`}
      {...props}
    >
      {children}
    </tfoot>
  );
};

const CustomTableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr 
      className={` flex flex-wrap border-b transition-colors ${className ?? ""}`}
      {...props}
    >
      {children}
    </tr>
  );
};

const CustomTableHead = ({ children, className, ...props }: TableHeadProps) => {
  return (
  
      <th 
        className={`flex flex-row text-left text-[1rem] font-regular text-gray-900 ml-[30px] ${className ?? ""}`}
        {...props}
      >
        {children}
        <TopDownArrowIcon  onClick={() => {}} />
      </th>
      

  );
};

const CustomTableCell = ({ children, className, ...props }: TableCellProps) => {
  return (
    <td 
      className={`text-regular py-2 text-left align-middle text-[1rem] text-gray-900 ${className ?? ""}`}
      {...props}
    >
      {children}
    </td>
  );
};

const CustomTableCellStatus = ({
  children,
  className,
  status,
  ...props
}: TableCellStatusProps) => {
  return (
    <div  className={` ${className ?? ""}`}>
      <div 
        className={`py-0.25  my-1.5 h-[1.75rem] min-w-[67px] w-min items-center justify-center rounded-[0.25rem] border-[2px] bg-gray-100- px-0.5 text-center text-[1rem] text-gray-900 border-sucess`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

const CustomTableCellButton = ({
  children,
  className,
  ...props
}: TableCellButtonProps) => {
  return (
    <button 
      className={` mx-1.5 my-1 h-2.5 w-auto items-center justify-center rounded-[0.25rem] bg-gray-700- px-1.5 py-0.5 text-[1rem] font-regular text-gray-900 ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

const CustomTableCellMenu = ({ className, ...props }: TableCellMenuProps) => {
  return (
    <div className={`mx-1.5 my-1.5 h-1 w-1 ${className ?? ""}`} {...props}>
      <ThreeDotsIcon width={16} height={16} viewBox="0 0 16 16" />
    </div>
  );
};

const CustomTableCaption = ({
  children,
  className,
  ...props
}: TableCaptionProps) => {
  return (
    <caption
      className={`text-muted-foreground mt-4 text-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </caption>
  );
};

export const CustomTable = {
  Root: CustomTableRoot,
  Header: CustomTableHeader,
  Head: CustomTableHead,
  Fotter: CustomTableFooter,
  Body: CustomTableBody,
  Row: CustomTableRow,
  Cell: CustomTableCell,
  Caption: CustomTableCaption,
  CellStatus: CustomTableCellStatus,
  CellButton: CustomTableCellButton,
  CellMenu: CustomTableCellMenu,
};
