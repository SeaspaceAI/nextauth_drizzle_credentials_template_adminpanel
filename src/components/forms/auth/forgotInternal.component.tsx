"use client"
import * as React from "react";
import Input from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail } from "react-icons/fi";
import { AuthButton } from "@/components/buttons/buttons.component";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IForgotFormProps {
  session: Session|null;
  didChangePass: boolean|undefined;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const ForgotFormInternal: React.FunctionComponent<IForgotFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/forgot", {
        email: values.email,
      });

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-xl px-5 sm:px-20">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Forgot password
      </h2>

      {props.session ? (
          <></>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-2">
            Login instead?&nbsp;
            <Link
              href="/auth"
              className="underline text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        )
      }

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        
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

        <AuthButton
          type="submit"
          text="Send email"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ForgotFormInternal;
