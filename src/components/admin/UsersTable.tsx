import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";
import EditUserModal from "../modals/EditUserModal";
import { Group, User, UserWithGroup } from "next-auth";

type Props = {
  users: UserWithGroup[];
  groups: Group[];
}

export function UsersTable({users, groups}:Props) {
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [userId, setUserId] = useState<string|undefined>("")
  const [user, setUser] = useState<User>()

  function onClickDelete(id:string|undefined){
    setUserId(id)
    setShowDelete(true)
  }

  function onClickEdit(user:User){
    setUser(user)
    setShowEdit(true)
  }

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow className="justify-center">
            <TableHead className="w-[200px] text-left">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Verified</TableHead>
            <TableHead>Did change pass</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell className="font-medium text-left">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.emailVerified ? user.emailVerified.toLocaleDateString('en-GB') : "Not verified"}</TableCell>
              <TableCell>{user.firstPasswordChange.toString()}</TableCell>
              <TableCell>{user.group ? user.group.group_name : "No group"}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-4 justify-evenly items-center text-right">
                <button onClick={() => onClickDelete(user.id)}>
                  <DeleteButton />
                </button>
                <button onClick={() => onClickEdit(user)}>
                  <EditButton />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteModal 
        url="/api/user"
        id={userId}
        setShow={setShowDelete}
        show={showDelete}
        modalName="user"
      />
      <EditUserModal
        setShow={setShowEdit}
        show={showEdit}
        groups={groups}
        user={user}
      />
    </>
  )
}

const DeleteButton = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:scale-125 transition-all ease-in duration-100">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  )
}

const EditButton = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:scale-125 transition-all ease-in duration-100">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  )
}

