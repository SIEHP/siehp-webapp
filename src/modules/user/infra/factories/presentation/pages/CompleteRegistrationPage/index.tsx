"use client";

import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { 
  CompleteRegistrationFormData, 
  completeRegistrationSchema 
} from "./validation";
import useCompleteRegistration from "@/modules/user/infra/services/hooks/useCompleteRegistration";
import { useRouter } from "next/navigation";

const CompleteRegistrationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompleteRegistrationFormData>({
    resolver: zodResolver(completeRegistrationSchema),
    defaultValues: {
      codigo: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const { completeRegistration } = useCompleteRegistration();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setValue('codigo', token);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: CompleteRegistrationFormData) => {
    try{
      await completeRegistration.handleCompleteRegistration({
        token: data.codigo,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      router.push('/');
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error);
    } finally {
      setSubmitting(false);
    }
    
  };

  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100-tk px-2 py-2">
      <div className="relative max-w-[512px] rounded-lg bg-[#474747] p-[32px]">
        <Form.Root className="flex flex-col items-center gap-1.5 [&>div.grid]:gap-0.5" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="max-w-[277px] text-center text-lg font-semi-bold leading-[26px] text-gray-900-tk">
            Preencha os campos para finalizar o cadastro
            <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
            </small>
          </fieldset>
          <Form.Field className="grid w-full" name="codigo">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="codigo"
            >
              Código<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative pb-0.5">
              <Form.Control asChild>
                <input
                  id="codigo"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="text"
                  placeholder="Insira seu código"
                  {...register("codigo")}
                />
              </Form.Control>
              {errors.codigo && (
                <p className="relative w-max text-right text-md text-fail" style={{ bottom: 0, right: 0 }}>
                  {errors.codigo.message}
                </p>
              )}
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="password">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="password"
            >
              Senha<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative pb-0.5">
              <Form.Control asChild>
                <input
                  id="password"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="password"
                  placeholder="Insira uma senha"
                  {...register("password")}
                />
              </Form.Control>
              {errors.password && (
                <p className="relative w-max text-right text-md text-fail" style={{ bottom: 0, right: 0 }}>
                  {errors.password.message}
                </p>
              )}
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="confirmPassword">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="confirmPassword"
            >
              Confirmar Senha
              <span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative pb-0.5">
              <Form.Control asChild>
                <input
                  id="confirmPassword"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="password"
                  placeholder="Repita a senha"
                  {...register("confirmPassword")}
                />
              </Form.Control>
              {errors.confirmPassword && (
                <p className="relative w-max text-right text-md text-fail" style={{ bottom: 0, right: 0 }}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </Form.Field>
          <p className="font-semibold text-center text-lg leading-tight text-[#f8f8f8]">
            Após clicar em "Finalizar Cadastro" você será redirecionado para a
            tela de login onde para realiza-lo deverá utilizar seu e-mail e
            senha.
          </p>
          <Form.Submit asChild>
            <button 
              type="submit" 
              className="mt-1 flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-lg font-semi-bold text-[#474747]"
            >
              {(submitting || completeRegistration.isPending) ? "Finalizando..." : "Finalizar Cadastro"}
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
};

export default CompleteRegistrationPage;
