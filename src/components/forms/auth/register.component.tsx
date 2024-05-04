"use client"
import * as React from "react";
import Input from "@/components/inputs/input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import { AuthButton } from "@/components/buttons/buttons.component";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast"

interface IRegisterFormProps {
}

const FormSchema = z.object({
    first_name: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(32, "First name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed."),
    last_name: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(32, "Last name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed."),
    email: z.string().email("Please enter a valid email adress."),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message:
          "Please agree to all the terms and conditions before continuing.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {

  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/signup", {
        ...values,
      });

      reset();

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  return (
    <div className="w-full px-12 py-4">

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

        <div className="gap-2 md:flex">

          <Input
            name="first_name"
            label="First name"
            type="text"
            icon={<CiUser />}
            placeholder="example"
            register={register}
            error={errors?.first_name?.message}
            disabled={isSubmitting}
          />

          <Input
            name="last_name"
            label="Last name"
            type="text"
            icon={<CiUser />}
            placeholder="example"
            register={register}
            error={errors?.last_name?.message}
            disabled={isSubmitting}
          />

        </div>

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

        {watch().password?.length > 0 && (
          <div className="flex mt-2 gap-1 items-center">
            <p 
              className={`text-sm font-semibold ${
                passwordScore <= 2
                  ? "text-red-400"
                  : passwordScore < 4
                  ? "text-yellow-400"
                  : "text-green-500"
              }`}
            >Password strength</p>
            {Array.from(Array(1).keys()).map((span, i) => (
              <span className="w-1/4 sm:w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-xl b ${
                    passwordScore <= 2
                      ? "bg-red-400"
                      : passwordScore < 4
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}

        <Input
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />

        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="accept"
            className="mr-2 focus:ring-0 rounded"
            {...register("accept")}
          />
          <label htmlFor="accept" className="text-gray-700">
            I accept the&nbsp;
            <a
              href=""
              className="text-blue-600 hover:text-blue-700 hover:underline"
              target="_blank"
            >
              terms
            </a>
            &nbsp;and&nbsp;
            <a
              href=""
              className="text-blue-600 hover:text-blue-700 hover:underline"
              target="_blank"
            >
              privacy policy
            </a>
          </label>
        </div>

        <div>
          {errors?.accept && (
            <p className="text-sm text-red-600 mt-1">
              {errors?.accept?.message}
            </p>
          )}
        </div>

        <AuthButton
          type="submit"
          text="Sign up"
          disabled={isSubmitting}
        />
        
      </form>
    </div>
  );
};

export default RegisterForm;
