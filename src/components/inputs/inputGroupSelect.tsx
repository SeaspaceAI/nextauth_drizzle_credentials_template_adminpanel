"use client"
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  error: any;
  disabled: boolean;
  name: string;
  label: string;
  setValue: any;
  groups: {
    id: string;
    group_name: string;
  }[]
}

export default function InputGroupSelect({error, disabled, name, label, setValue, groups}: Props) {

  const [currentValue, setCurrentValue] = useState<string>("");

  useEffect(() => {
    setValue(name, currentValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])

  return (
    <div className='mt-3'>
      {
        error && (
          <p className='text-red-500 mb-2'>{error}</p>
        )
      }
      <label htmlFor={name}>{label}</label>
      <Select onValueChange={(e:string) => setCurrentValue(e)} value={currentValue} disabled={disabled}>
        <SelectTrigger className={`w-full bg-inherit p-2 h-[38px] border  ${error ? 'border-red-[#ED4337]' : 'border-gray-700'}`}>
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent>
          {groups.length ? groups.map((group) => 
            <SelectItem value={group.id}>{group.group_name}</SelectItem>
          ) : (
            <SelectItem value={"null"} disabled={true}>There are no groups</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
