import * as React from "react";

import {
  DataFieldRootProps,
  DataFieldTitleProps,
  DataFieldContentProps,
  DataFieldContentTextProps,
  DataFieldContentDateProps,
} from "./types";

const CustomDataFieldRoot = ({
  children,
  className,
  ...props
}: DataFieldRootProps) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const CustomDataFieldTitle = ({
  children,
  className,
  ...props
}: DataFieldTitleProps) => {
  return (
    <h2
      className={`text-md text-gray-100-tk sm:text-lg ${className ?? ""}`}
      {...props}
    >
      {children}
    </h2>
  );
};

const CustomDataFieldContent = ({
  children,
  className,
  ...props
}: DataFieldContentProps) => {
  return (
    <div className={`flex text-lg ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const CustomDataFieldContentText = ({
  children,
  className,
  ...props
}: DataFieldContentTextProps) => {
  return (
    <input
      type="text"
      className={`min-h-[50px] rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk ${className ?? ""}`}
      {...props}
    >
      {children}
    </input>
  );
};

const CustomDataFieldContentDate = ({
  children,
  className,
  ...props
}: DataFieldContentDateProps) => {
  return (
    <input
      type="date"
      className={`min-h-[50px] rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk ${className ?? ""}`}
      {...props}
    >
      {children}
    </input>
  );
};

export const CustomDataField = {
  Root: CustomDataFieldRoot,
  Title: CustomDataFieldTitle,
  Content: CustomDataFieldContent,
  Text: CustomDataFieldContentText,
  Date: CustomDataFieldContentDate,
};
