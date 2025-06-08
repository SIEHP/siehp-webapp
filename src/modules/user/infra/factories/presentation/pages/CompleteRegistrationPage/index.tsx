"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

const CompleteRegistrationPage = () => {
  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100-tk">
      <div className="relative max-w-[512px] rounded-lg bg-gray-300-tk px-2 py-2">
        <Form.Root className="flex flex-col items-center gap-1 [&>div.grid]:gap-1">
          <fieldset className="max-w-[277px] text-center text-md lg:text-lg font-semi-bold text-gray-900-tk">
            Insira sua senha para finalizar o cadastro
          </fieldset>
          <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
          </small>
          <Form.Field className="grid w-full" name="code">
            <Form.Label
              className="text-left text-md lg:text-lg font-semi-bold text-gray-900-tk"
              htmlFor="code"
            >
              Código de Cadastro<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="code"
                  className="w-[100%] rounded px-0.75 text-sm lg:text-md h-[45px]"
                  type="text"
                  required
                  placeholder="Insira o código de cadastro"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-sm log:text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha válida
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha válida
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="password">
            <Form.Label
              className="text-left text-md lg:text-lg font-semi-bold text-gray-900-tk"
              htmlFor="password"
            >
              Senha
              <span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="password"
                  className="w-[100%] rounded px-0.75 text-sm lg:text-md h-[45px]"
                  type="password"
                  required
                  placeholder="Insira uma senha"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha válida
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="password">
            <Form.Label
              className="text-left text-md lg:text-lg font-semi-bold text-gray-900-tk"
              htmlFor="password"
            >
              Confirmar Senha
              <span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="password"
                  className="w-[100%] rounded px-0.75 text-sm lg:text-md h-[45px]"
                  type="password"
                  required
                  placeholder="Repita a senha"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, repita a mesma senha
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma senha válida
              </Form.Message>
            </div>
          </Form.Field>
          <p className="font-semibold text-center text-lg leading-tight text-gray-900-tk">
            Após clicar em “Finalizar Cadastro” você será redirecionado para a
            tela de login onde para realiza-lo deverá utilizar seu e-mail e
            senha.
          </p>
          <Form.Submit asChild>
            <button className="flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-md lg:text-lg font-semi-bold text-gray-300-tk">
              Finalizar Cadastro
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
};

export default CompleteRegistrationPage;
