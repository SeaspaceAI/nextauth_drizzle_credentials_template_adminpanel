"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import Input from '../inputs/input';
import { AuthButton } from '../buttons/buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Group } from 'next-auth';
import { GrGroup } from 'react-icons/gr';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  group: Group|undefined;
}

const FormSchema = z.object({
  groupId: z.string(),
  group_name: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .max(32, "First name must be less than 32 characters"),
})

type FormSchemaType = z.infer<typeof FormSchema>;

export default function EditGroupModal({show, setShow, group}: Props) {
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
    setValue("groupId", group?.id ?? "")
  }, [group])
  

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.put(`/api/group/${values.groupId}`, {
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
      {show && group && (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black/30 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md max-w-lg w-full mx-5 sm:mx-20 flex flex-col gap-6 items-center'>
            <h3 className='font-semibold text-lg text-center'>Edit user</h3>
            <div className='w-full'>
              <form className="text-sm w-full" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  name="group_name"
                  label="Group name"
                  type="text"
                  icon={<GrGroup />}
                  placeholder="example"
                  defaultValue={group.group_name}
                  register={register}
                  error={errors?.group_name?.message}
                  disabled={isSubmitting}
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