"use client"
import * as React from "react";
import Input from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import { AuthButton } from "@/components/buttons/buttons.component";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface ILoginFormProps {
  callbackUrl: string | undefined;
  csrfToken: string | undefined;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(52, "Password must be less than 52 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {

  const { callbackUrl, csrfToken } = props;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {

    const res:any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });

    if (res.error) {
      const err = res.error === "CredentialsSignin" ? "Email or password is not correct" : "Something went wrong" 
      return toast.error(err);
    } else {
      return router.push("/");
    }

  };

  return (
    <div className="w-full px-12 py-4">

      <form
        method="post"
        action="/api/auth/signin/email"
        className="my-8 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >

        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

        <Input
          name="email"
          label="Email address"
          type="text"
          icon={<FiMail />}
          placeholder="example@emaple.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        <div className="mt-2 hover:underline w-fit">
          <Link href="/auth/forgot" className=" text-blue-600">
            Forgot password?
          </Link>
        </div>
        
        <AuthButton
          type="submit"
          text="Sign in"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default LoginForm;
