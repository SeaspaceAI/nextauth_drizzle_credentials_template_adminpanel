"use client"
import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UsersTable } from '@/components/admin/UsersTable'
import RegisterForm from '@/components/forms/auth/register.component';
import GroupForm from '../forms/group/group.component';
import { GroupsTable } from './GroupsTable';
import { Group, User } from 'next-auth';

type Props = {
  users: {
    user: User;
    group: Group | null;
  }[];
  groups: Group[];
}

export default function AdminTabs({users, groups}: Props) {
  const [tabIndex, setTabIndex] = useState<number>(0);
  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className={'flex gap-4 border-b-2 border-b-gray-400'}>
        <Tab className={`cursor-pointer hover:bg-gray-600 hover:text-white rounded-lg rounded-b-none p-2 transition-all duration-100 ease-in ${tabIndex === 0 ? 'bg-gray-400' : ''}`}>Users table</Tab>
        <Tab className={`cursor-pointer hover:bg-gray-600 hover:text-white rounded-lg rounded-b-none p-2 transition-all duration-100 ease-in ${tabIndex === 1 ? 'bg-gray-400' : ''}`}>Registrate user</Tab>
        <Tab className={`cursor-pointer hover:bg-gray-600 hover:text-white rounded-lg rounded-b-none p-2 transition-all duration-100 ease-in ${tabIndex === 2 ? 'bg-gray-400' : ''}`}>Groups</Tab>
      </TabList>

      <TabPanel>
        <UsersTable users={users} groups={groups}/>
      </TabPanel>
      <TabPanel className={'flex justify-center'}>
        <RegisterForm groups={groups}/>
      </TabPanel>
      <TabPanel className={'flex flex-col items-center justify-center'}>
        <GroupForm />
        <GroupsTable groups={groups}/>
      </TabPanel>
    </Tabs>
  )
}