import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import TextInput from "@/core/components/Form/TextInput";
import Button from "@/core/components/LoadingButton";
// import Button from "../../app/common/buttons/Button";
// import Checkbox from "../../app/common/checkboxes/Checkbox";

import { APP_NAME, HOME_URL, POST_LOGIN_REDIRECT_URL } from "./../config";
import PasswordInput from "./../core/components/Form/PasswordInput";
import { useEffect } from "react";
import { notify } from "../utils/notify";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      notify({ message: "You are already logged in", type: "info" });
      router.push(POST_LOGIN_REDIRECT_URL);
    }
  }, [session]);

  const defaultValues = {
    username: "",
    password: "",
    remember_me: true,
    error: null,
  };
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (values: typeof defaultValues) => {
    if (values.remember_me) {
      localStorage.setItem("remember_me", "true");
    } else {
      localStorage.setItem("remember_me", "false");
    }
    // delete values["remember_me"];
    signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: POST_LOGIN_REDIRECT_URL,

      //   redirect: false
    }).catch((err) => {
      toast.error("Το όνομα χρήστη ή ο κωδικός πρόσβασης είναι λάθος");
    });

    //   await userStore.login(values);
  };
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center  bg-base-100 px-5 py-5">
      <div className="w-[35rem] overflow-hidden rounded-3xl shadow-xl">
        <div className="card w-full md:flex">
          <div className="card-body w-full py-10  px-5 md:px-10">
            <div className="mb-10 text-center">

              <h1 className="text-neutral-600 font-mono text-3xl font-bold">
                {APP_NAME}
              </h1>
              
              <p>Εισάγετε τα στοιχεία σας για να συνδεθείτε</p>
              <p>Το όνομα χρήστη πρέπει να είναι της μορφής username@domain</p>
              <p>π.χ testuser@day.haf.gr</p>
            </div>
            <div className="h-2"></div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
              <TextInput
                label="Όνομα Χρήστη"
                {...register("username", {
                  required: true,
                })}
                name="username"
                type="text"
                autoComplete="username"
                error={errors.username && "Το όνομα χρήστη είναι απαραίτητο"}
              />

              <PasswordInput
                label="Κωδικός Πρόσβασης"
                {...register("password", {
                  required: true,
                })}
                id="password"
                name="password"
                autoComplete="password"
                error={
                  errors.password && "Ο κωδικός πρόσβασης είναι απαραίτητος"
                }
              />

              <div className="flex items-center justify-between">
                {/* <div className="flex items-center">
                  <Checkbox
                    {...register("remember_me")}
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    label="Να με θυμάσαι"
                  />
                </div> */}
              </div>
              <div className="h-1"></div>
              <div>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  disabled={isSubmitting}
                >
                  ΣΥΝΔΕΣΗ
                </Button>
              </div>
              <div className="h-2"></div>
              <Link href={HOME_URL} >
               <span className="outline outline-1 text-neutral-600 font-mono text-xl font-bold p-1 rounded cursor-pointer">Πίσω στην αρχική</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
