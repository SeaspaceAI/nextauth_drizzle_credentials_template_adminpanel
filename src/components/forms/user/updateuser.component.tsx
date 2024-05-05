"use client"
import React, { useEffect } from "react";
import { IoAlertCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthButton } from "@/components/buttons/buttons.component";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { User } from "next-auth";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .max(32, "First name must be less than 32 characters"),
  userId: z.string()
})

type FormSchemaType = z.infer<typeof FormSchema>;
type Props = {
  user: User;
}

export default function UpdateUserForm({user}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setValue("userId", user?.id ?? "")
  }, [user])
  

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.put(`/api/user/${values.userId}`, {
        ...values,
      });

      router.refresh();

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="text-gray-700">Update username</label>
        <input 
          type="text" 
          className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-blue-700 focus:ring-2 text-sm"
          defaultValue={user.name ?? ""}
          id="name"
          {...register("name")}
          style={{
            borderColor: `${errors?.name?.message ? "#ED4337" : ""}`,
          }}
          disabled={isSubmitting}
        />

        {errors?.name?.message && (
          <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
            <IoAlertCircle fill="#ED4337" />
          </div>
        )}

        {errors?.name?.message && <p className="text-sm text-[#ED4337] mt-1">{errors?.name?.message}</p>}

        <AuthButton
          type="submit"
          text="Update"
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}
