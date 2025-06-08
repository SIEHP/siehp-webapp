"use client";

import { useErrorStore } from "@/shared/infra/services/store/error-store";
import React, { useEffect, useState } from "react";
import { AlertDialog } from "../AlertDialog";

const ErrorAlert = () => {
  const { error, setError } = useErrorStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.message]);

  if (!error) return <></>;

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Ops, algo deu errado!</AlertDialog.Title>
          <AlertDialog.Description className="text-fail">
            {error.message}
          </AlertDialog.Description>
          <AlertDialog.Action
            className="font-bold text-fail"
            onClick={() => {
              setOpen(false);
              setError(null);
            }}
          >
            Ok
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ErrorAlert;
