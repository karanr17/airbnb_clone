"use client";

import { signIn } from "next-auth/react"
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setLoading(false);

      if(callback?.ok) {
        toast.success('Logged in successfully!');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error) {
        toast.error(callback.error);
      }
    })
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  },[registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back!" subTitle="Login to your account!" />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div
          className="
        flex flex-row justify-center items-center gap-2
      "
        >
          <div>New User?</div>
          <div
            onClick={toggle}
            className="
              text-neutral-800
              font-semibold
              cursor-pointer
              hover:underline
            "
          >
            Create new account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footer}
    />
  );
};

export default LoginModal;
