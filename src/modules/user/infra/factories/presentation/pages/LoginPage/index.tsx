"use client";

import React, { useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "./validation";
import { loginSchema } from "./validation";
import { useAuth } from "@/modules/user/infra/services/hooks/useAuth";
import { useRouter } from "next/navigation";


const LoginPage = () => {

  const router = useRouter();
  const {login, auth} = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
   
    await login.handleLogin(data);    

    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } 
  };

  useEffect(() => {
    if (auth) {
      router.push("/admin/professores");
    }
  }, [auth]);

  return (
    <main className="gap flex flex-grow flex-wrap items-center justify-center gap-4 bg-gray-100-tk px-2 py-2">
      <div className="max-w-lg text-gray-900-tk">
        <h1 className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </h1>
        <br />
        <h2 className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor
        </h2>
      </div>
      <div className="min-h-[100px] w-[100%] max-w-[537px] rounded-[8px] bg-gray-300-tk px-2 py-3 lg:min-h-[200px]">
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mx-auto mb-1 max-w-[321px] text-lg font-semi-bold leading-[26px] text-gray-900-tk xl:mb-3">
            Insira suas credências
            <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
            </small>
          </fieldset>
          
          {login.error && (
            <div className="mx-auto mb-3 max-w-[321px] text-center text-sm text-fail">
              {login.error}
            </div>
          )}
          
          <Form.Field className="grid min-h-[122px]" name="email">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              E-mail<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative min-h-[85px]">
              <Form.Control asChild>
                <input
                  id="email"
                  className="mb-[30px] h-[50px] w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="email"
                  placeholder="Insira seu e-mail"
                  {...register("email")}
                />
              </Form.Control>
              {errors.email && (
                <p className="absolute w-max text-right text-md text-fail opacity-[0.8]" style={{ bottom: 0, right: 0 }}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </Form.Field>
          <Form.Field className="mb-2 grid xl:mb-[83px]" name="password">
            <Form.Label
              className="mb-1/2 text-left text-lg font-semi-bold text-gray-900-tk xl:mb-0.75"
              htmlFor="password"
            >
              Senha<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative min-h-[85px]">
              <Form.Control asChild>
                <input
                  id="password"
                  className="h-[50px] rounded px-[10px] py-[6px] w-[100%]"
                  type="password"
                  placeholder="Insira sua senha"
                  {...register("password")}
                 disabled={login.isPending}
                />
              </Form.Control>
              <a href="" className="mt-[7px] font-regular text-gray-900-tk">
                Esqueci minha senha
              </a>
              {errors.password && (
                <p className="absolute w-max text-right text-md text-fail opacity-[0.8]" style={{ bottom: 0, right: 0 }}>
                  {errors.password.message}
                </p>
              )}
            </div>
          </Form.Field>{" "}
          <Form.Submit asChild>
            <button 
              type="submit"
              className="mx-[auto] block w-[100%] max-w-[229px] rounded bg-gray-900-tk p-[19px] text-lg font-semi-bold text-gray-100-tk"
              disabled={login.isPending}
            >
              {login.isPending ? "Entrando..." : "Entrar na conta"}
            </button>
          </Form.Submit>
        </Form.Root>
        <a
          href=""
          className="mt-[8px] block text-center font-regular text-gray-900-tk"
        >
          Não possuo uma conta
        </a>
      </div>
    </main>
  );
};

export default LoginPage;
