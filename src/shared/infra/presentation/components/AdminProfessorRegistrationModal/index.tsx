import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAdmin from "@/modules/user/infra/services/hooks/useAdmin";

const registrationSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, insira um e-mail")
    .email("Por favor, insira um e-mail válido"),
  confirmEmail: z
    .string()
    .min(1, "Por favor, insira um e-mail")
    .email("Por favor, insira um e-mail válido"),
  matricula: z.string().optional(),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os e-mails não coincidem",
  path: ["confirmEmail"],
});

// Tipo inferido do esquema
type RegistrationFormData = z.infer<typeof registrationSchema>;

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminProfessorRegistrationModal({ isOpen, onClose }: IModal) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const { inviteTeacher } = useAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      matricula: "",
    },
  });

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fecha o modal se clicar fora
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setSubmitting(true);
      await inviteTeacher.handleInviteTeacher({ email: data.email });
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao convidar professor:", error);
    } finally {
      setSubmitting(false);
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
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex flex-col items-center gap-1.5 [&>div.grid]:gap-0.5"
        >
          <fieldset className="flex max-w-[277px] flex-col text-center text-lg font-semi-bold leading-[26px] text-gray-900-tk">
            Insira os dados do docente para realizar o cadastro
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
          
          <div className="grid w-full">
            <label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="confirmEmail"
            >
              Confirmar E-mail
              <span className="font-semi-bold text-warning">*</span>
            </label>
            <div className="relative pb-0.5">
              <input
                id="confirmEmail"
                className="w-[100%] rounded px-[10px] py-[6px] text-md"
                type="email"
                placeholder="Insira seu e-mail"
                {...register("confirmEmail")}
              />
              {errors.confirmEmail && (
                <p className="relative w-max text-right text-md text-fail" style={{ bottom: 0, right: 0 }}>
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid w-full">
            <label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="matricula"
            >
              Matrícula (opcional)
            </label>
            <div className="relative">
              <input
                id="matricula"
                className="w-[100%] rounded px-[10px] py-[6px] text-md"
                type="text"
                {...register("matricula")}
              />
            </div>
          </div>
          
          <p className="font-semibold text-center text-lg leading-tight text-[#f8f8f8]">
            Após clicar em "Enviar Formulário" um e-mail com um código de acesso
            e um link serão enviados para finalizar o cadastro
          </p>
          
          <button 
            type="submit"
            disabled={submitting || inviteTeacher.isPending}
            className="mt-1 flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-lg font-semi-bold text-[#474747]"
          >
            {(submitting || inviteTeacher.isPending) ? "Enviando..." : "Enviar Formulário"}
          </button>
          {inviteTeacher.error && (
            <p className="text-red-500">{inviteTeacher.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
