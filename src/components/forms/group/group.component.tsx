"use client"
import * as React from "react";
import Input from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthButton } from "@/components/buttons/buttons.component";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast"
import { GrGroup } from "react-icons/gr";
import { useRouter } from "next/navigation";

interface IGroupFormProps {
}

const FormSchema = z.object({
    group_name: z
      .string()
      .min(2, "Group name must be atleast 2 characters")
      .max(32, "Group name must be less than 32 characters")
  })

type FormSchemaType = z.infer<typeof FormSchema>;

const GroupForm: React.FunctionComponent<IGroupFormProps> = (props) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/group", {
        ...values,
      });

      reset();

      router.refresh();

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full sm:px-12 py-4 max-w-3xl">

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

        <Input
          name="group_name"
          label="Group name"
          type="text"
          icon={<GrGroup />}
          placeholder="name"
          register={register}
          error={errors?.group_name?.message}
          disabled={isSubmitting}
        />

        <AuthButton
          type="submit"
          text="Add group"
          disabled={isSubmitting}
        />
        
      </form>
    </div>
  );
};

export default GroupForm;
