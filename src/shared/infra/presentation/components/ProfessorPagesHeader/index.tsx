import React from "react";
import {
  ProfessorPagesHeaderRootProps,
  ProfessorPagesHeaderTitleProps,
  ProfessorPagesHeaderButtonProps,
  ProfessorPagesHeaderFilterProps,
  ProfessorPagesHeaderButtonIconProps,
  ProfessorPagesHeaderButtonContentProps,
  ProfessorPagesHeaderBodyProps,
} from "./types";
import { SearchIcon } from "../Icons";

const ProfessorPagesHeaderRoot = ({
  children,
  className,
  ...props
}: ProfessorPagesHeaderRootProps) => {
  return (
    <div
      className={`w-full flex flex-col ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

const ProfessorPagesHeaderTitle = ({
  children,
  className,
  ...props
}: ProfessorPagesHeaderTitleProps) => {
  return (
    <h1
      className={`left-0 text-lg font-semi-bold text-primary-500 ${className ?? ""}`}
      {...props}
    >
      {children}
    </h1>
  );
};

const ProfessorPagesHeaderBody = ({
  children,
  className,
  ...props
}: ProfessorPagesHeaderBodyProps) => {
  return (
    <div
      className={`flex ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

const ProfessorPagesHeaderButtonContent = ({
  children,
  className,
  ...props
}: ProfessorPagesHeaderButtonContentProps) => {
  return (
    <div className={`flex ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const ProfessorPagesHeaderButton = ({
  children,
  className,
  ...props
}: ProfessorPagesHeaderButtonProps) => {
  return (
    <button className={`${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};

const ProfessorPagesHeaderButtonIcon = ({
  children,
  className,
  ...props
}: ProfessorPagesHeaderButtonIconProps) => {
  return (
    <div className={`${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const ProfessorPagesHeaderFilter = ({
  className,
  ...props
}: ProfessorPagesHeaderFilterProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Pesquisar..."
        {...props}
        className={`h-2.5 w-[250px] appearance-none rounded-[4rem] border-none bg-gray-300-tk py-[10px] pl-1 pr-[45px] text-md font-regular text-gray-900-tk placeholder-gray-900-tk ${className ?? ""}`}
      />
      <SearchIcon
        className="absolute right-[15px] top-[7px] [&>path]:fill-gray-300-tk"
        width={24}
        height={24}
        viewBox="0 0 30 24"
      />
    </div>
  );
};

export const ProfessorPagesHeader = {
  Root: ProfessorPagesHeaderRoot,
  Title: ProfessorPagesHeaderTitle,
  Body: ProfessorPagesHeaderBody,
  Button: ProfessorPagesHeaderButton,
  ButtonIcon: ProfessorPagesHeaderButtonIcon,
  Filter: ProfessorPagesHeaderFilter,
  ButtonContent: ProfessorPagesHeaderButtonContent,
}; 