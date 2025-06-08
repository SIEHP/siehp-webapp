import * as AlertDialogRadix from "@radix-ui/react-alert-dialog";
import {
  ActionProps,
  CancelProps,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from "./types";

const Root = ({ children, ...props }: RootProps) => {
  return <AlertDialogRadix.Root {...props}>{children}</AlertDialogRadix.Root>;
};

const Trigger = ({ children, className, ...props }: TriggerProps) => {
  return (
    <AlertDialogRadix.Trigger
      className={`appearance-none ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Trigger>
  );
};

const Portal = AlertDialogRadix.Portal;

const Overlay = ({ children, className, ...props }: OverlayProps) => {
  return (
    <AlertDialogRadix.Overlay
      className={`data-[state=open]:animate-overlayShow inset-0 fixed bg-gray-700 bg-opacity-50 ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Overlay>
  );
};

const Content = ({ children, className, ...props }: ContentProps) => {
  return (
    <AlertDialogRadix.Content
      className={`data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-700-tk p-[25px] shadow-md shadow-gray-700 focus:outline-none ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Content>
  );
};

const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <AlertDialogRadix.Title
      className={`text-white text-lg font-bold ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Title>
  );
};

const Description = ({ children, className, ...props }: DescriptionProps) => {
  return (
    <AlertDialogRadix.Description
      className={`mt-2 ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Description>
  );
};

const Cancel = ({ children, className, ...props }: CancelProps) => {
  return (
    <AlertDialogRadix.Cancel
      className={`font-bold text-fail ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Cancel>
  );
};

const Action = ({ children, className, ...props }: ActionProps) => {
  return (
    <AlertDialogRadix.Action
      className={`font-bold ${className ?? ""}`}
      {...props}
    >
      {children}
    </AlertDialogRadix.Action>
  );
};

export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
};
