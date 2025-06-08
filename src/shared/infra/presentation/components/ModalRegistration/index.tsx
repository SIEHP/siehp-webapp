import React from "react";
import * as Form from "@radix-ui/react-form";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: IModal) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fecha o modal se clicar fora
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative max-w-[512px] rounded-lg bg-[#474747] px-[32px] pb-[52px] pt-[38px]"
      >
        <Form.Root className="flex flex-col items-center gap-1.5 [&>div.grid]:gap-0.5">
          <fieldset className="flex max-w-[277px] flex-col text-center text-lg font-semi-bold leading-[26px] text-gray-900-tk">
            Insira os dados do docente para realizar o cadastro
            <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
            </small>
          </fieldset>
          <Form.Field className="grid w-full" name="email">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              E-mail<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative pb-0.5">
              <Form.Control asChild>
                <input
                  id="email"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="email"
                  required
                  placeholder="Insira seu e-mail"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail válido
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="email">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              Confirmar E-mail
              <span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative pb-0.5">
              <Form.Control asChild>
                <input
                  id="email"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="email"
                  required
                  placeholder="Insira seu e-mail"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail válido
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className="grid w-full" name="matricula">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="matricula"
            >
              Matrícula (opcional)
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="matricula"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="text"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-md text-fail opacity-[0.8]"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira uma matrícula válida
              </Form.Message>
            </div>
          </Form.Field>
          <p className="font-semibold text-center text-lg leading-tight text-[#f8f8f8]">
            Após clicar em “Enviar Formulário” um e-mail com um código de acesso
            e um link serão enviados para finalizar o cadastro
          </p>
          <Form.Submit asChild>
            <button className="mt-1 flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-lg font-semi-bold text-[#474747]">
              Enviar Formulário
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}
