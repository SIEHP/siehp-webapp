"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useForgotPassword from "@/modules/user/infra/services/hooks/useForgotPassword";
const forgotPasswordSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido").min(1, "Por favor, insira um e-mail")
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });
  const [submitting, setSubmitting] = useState(false);
  const { forgotPassword } = useForgotPassword();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setSubmitting(true);
      await forgotPassword.handleForgotPassword(data);
      reset();
    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100-tk px-2 py-2">
      <div className="relative max-w-[512px] rounded-lg bg-[#474747] p-[32px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-1.5 [&>div.grid]:gap-0.5">
          <fieldset className="max-w-[277px] text-center text-lg font-semi-bold leading-[26px] text-gray-900-tk">
            Insira seu e-mail para recuperar senha
            <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
            </small>
          </fieldset>
          <div className="grid w-full">
            <label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              E-mail<span className="font-semi-bold text-warning">*</span>
            </label>
            <div className="relative pb-0.5">
              <input
                id="email"
                className="w-[100%] rounded px-[10px] py-[6px] text-md"
                type="email"
                placeholder="Insira seu e-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="relative w-max text-right text-md text-fail" style={{ bottom: 0, right: 0 }}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <p className="font-semibold text-center text-lg leading-tight text-[#f8f8f8]">
            Após clicar em "Recuperar Senha" verifique seu email.
          </p>
          <button 
            type="submit" 
            disabled={submitting || forgotPassword.isPending}
            className="mt-1 flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-lg font-semi-bold text-[#474747]"
          >
            {(submitting || forgotPassword.isPending) ? "Enviando..." : "Recuperar Senha"}
          </button>
          {forgotPassword.error && (
            <p className="text-red-500">{forgotPassword.error}</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
