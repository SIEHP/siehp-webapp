"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

const LoginPage = () => {
  return (
    <main className="flex flex-grow flex-wrap items-center justify-center gap-4 bg-gray-100-tk">
      <div className="max-w-lg text-gray-900-tk">
        <h1 className="text-lg lg:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </h1>
        <br />
        <h2 className="text-md lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor
        </h2>
      </div>
      <div className="min-h-[100px] w-[100%] max-w-[512px] rounded-lg bg-gray-300-tk px-2 py-2 lg:min-h-[200px]">
        <Form.Root className="flex flex-col items-center gap-1 [&>div.grid]:gap-1">
          <fieldset className="w-full text-md lg:text-lg font-semi-bold text-center text-gray-900-tk">
            Insira suas informações de login
          </fieldset>
          <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
          </small>
          <Form.Field className="grid w-full" name="email">
            <Form.Label
              className="text-left text-md lg:text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              E-mail<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="email"
                  className="w-[100%] rounded px-0.75 text-sm lg:text-md h-[45px]"
                  type="email"
                  required
                  placeholder="Insira seu e-mail"
                />
              </Form.Control>
              <Form.Message
                className="absolute w-max text-right text-sm lg:text-md text-fail opacity-[0.8]"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail válido
              </Form.Message>
              <Form.Message
                className="absolute w-max text-right text-sm lg:text-md text-fail opacity-[0.8]"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="password">
            <Form.Label
              className="text-left text-md lg:text-lg font-semi-bold text-gray-900-tk"
              htmlFor="password"
            >
              Senha<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="password"
                  className="w-[100%] rounded px-0.75 text-sm lg:text-md h-[45px]"
                  type="password"
                  required
                  placeholder="Insira sua senha"
                />
              </Form.Control>
              <a href="" className="font-regular text-gray-900-tk">
                Esqueci minha senha
              </a>
              <Form.Message
                className="absolute w-max text-right text-sm lg:text-md text-fail opacity-[0.8]"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha
              </Form.Message>
            </div>
          </Form.Field>{" "}
          <Form.Submit asChild>
            <button className="flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-md lg:text-lg font-semi-bold text-gray-300-tk">
              Entrar na conta
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
};

export default LoginPage;
