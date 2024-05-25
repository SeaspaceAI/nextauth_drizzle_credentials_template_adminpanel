"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import Input from '../inputs/input';
import { LuUser2, LuUserCheck2 } from 'react-icons/lu';
import { FiMail } from 'react-icons/fi';
import InputGroupSelect from '../inputs/inputGroupSelect';
import { AuthButton } from '../buttons/buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Group, User } from 'next-auth';
import { HiOutlinePhone } from "react-icons/hi2";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  groups: Group[];
  user: User|undefined;
}

const FormSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .max(32, "First name must be less than 32 characters"),
  email: z.string().email("Please enter a valid email adress."),
  role: z
    .string()
    .min(4, "Add user role"),
  phone: z
    .string()
    .optional()
    .refine(value => (value), {
      message: "Phone number must be a valid number"
    }),
  group: z
    .string()
    .optional(),
  userId: z.string().min(2)
})

type FormSchemaType = z.infer<typeof FormSchema>;

export default function EditUserModal({show, setShow, groups, user}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
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

      reset();
      router.refresh();
      setShow(false)
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {show && user && (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black/30 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md max-w-lg w-full mx-5 sm:mx-20 flex flex-col gap-6 items-center'>
            <h3 className='font-semibold text-lg text-center'>Edit user</h3>
            <div className='w-full'>
              <form className="text-sm w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="gap-2 md:flex">

                  <Input
                    name="name"
                    label="Name"
                    type="text"
                    icon={<LuUser2 />}
                    placeholder="example"
                    defaultValue={user.name}
                    register={register}
                    error={errors?.name?.message}
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
                  defaultValue={user.email}
                  error={errors?.email?.message}
                  disabled={isSubmitting}
                />

                <Input
                  name="role"
                  label="Role"
                  type="text"
                  icon={<LuUserCheck2 />}
                  placeholder="example@emaple.com"
                  register={register}
                  defaultValue={user.role}
                  error={errors?.email?.message}
                  disabled={isSubmitting}
                />

                <Input
                  name="phone"
                  label="Phone"
                  type="number"
                  icon={<HiOutlinePhone />}
                  register={register}
                  placeholder="000 000 000"
                  defaultValue={user.phone?.toString()}
                  error={errors?.phone?.message}
                  disabled={isSubmitting}
                />

                <InputGroupSelect
                  error={errors?.group?.message}
                  disabled={isSubmitting}
                  name="group"
                  label="Group"
                  setValue={setValue}
                  defaultValue={user.groupId?.toString()}
                  groups={groups}
                />

                <AuthButton
                  type="submit"
                  text="Submit"
                  disabled={isSubmitting}
                />
                
              </form>
              <button className='py-[6px] mt-2 text-sm w-full border border-gray-500 rounded-md hover:bg-gray-400 transition-all ease-in duration-100' onClick={() => setShow(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}