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
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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
      className={`border-b transition-colors hover:bg-gray-50 ${className ?? ""}`}
      {...props}
    >
      {children}
    </tr>
  );
};

const CustomTableHead = ({ 
  children, 
  className, 
  hasFilter = false, 
  onSort,
  sortDirection,
  isActiveSort,
  ...props 
}: TableHeadProps & { 
  onSort?: () => void;
  sortDirection?: 'asc' | 'desc' | null;
  isActiveSort?: boolean;
}) => {
  const renderSortIcon = () => {
    if (!isActiveSort) {
      return <TopDownArrowIcon className="cursor-pointer" />;
    }
    
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="cursor-pointer" /> 
      : <ArrowDownIcon className="cursor-pointer" />;
  };

  return (
    <th 
      className={`h-12 text-left align-middle text-md font-medium text-gray-900 ${className ?? ""}`}
      {...props}
    >
      <div className="flex items-center gap-0.5">
        {children}
        {hasFilter && children && (
          <div onClick={onSort}>
            {renderSortIcon()}
          </div>
        )}
      </div>
    </th>
  );
};

const CustomTableCell = ({ children, className, ...props }: TableCellProps) => {
  return (
    <td 
      className={`h-12 align-middle text-md text-gray-900 ${className ?? ""}`}
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
    <td className={`h-12 align-middle ${className ?? ""}`}>
      <div 
        className={`inline-flex px-1 py-0.25 rounded-[0.25rem] border-[2px] text-md text-gray-900 ${
          status === "ACTIVE" ? "border-sucess" : "border-error"
        }`}
        {...props}
      >
        {children}
      </div>
    </td>
  );
};

const CustomTableCellButton = ({
  children,
  className,
  ...props
}: TableCellButtonProps) => {
  return (
    <td className="h-12 align-middle">
      <button 
        className={`inline-flex items-center justify-center rounded-[0.25rem] bg-gray-700 px-1 py-0.5 text-md font-light text-gray-100 hover:bg-gray-600 ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    </td>
  );
};

const CustomTableCellMenu = ({ className, ...props }: TableCellMenuProps) => {
  return (
    <td className="h-12 align-middle text-center">
      <button type="button" className={`inline-flex items-center justify-center hover:bg-gray-100 rounded-full p-1 ${className ?? ""}`}>
        <ThreeDotsIcon width={16} height={16} />
      </button>
    </td>
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
