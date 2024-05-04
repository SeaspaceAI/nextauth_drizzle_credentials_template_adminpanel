import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  users: {
    user: {
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      role: string;
      phone: number | null;
      firstPasswordChange: boolean;
      groupId: string | null;
    };
    group: {
      id: string;
      group_name: string;
    } | null;
  }[];
}

export function UsersTable({users}:Props) {
  return (
    <Table>
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow className="justify-center">
          <TableHead className="w-[200px] text-left">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date Verified</TableHead>
          <TableHead>Did change pass</TableHead>
          <TableHead>Group</TableHead>
          <TableHead className="text-right">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((item) => (
          <TableRow key={item.user.name}>
            <TableCell className="font-medium text-left">{item.user.name}</TableCell>
            <TableCell>{item.user.email}</TableCell>
            <TableCell>{item.user.emailVerified?.toLocaleDateString('en-GB')}</TableCell>
            <TableCell>{item.user.firstPasswordChange.toString()}</TableCell>
            <TableCell>{item.group ? item.group.group_name : "No group"}</TableCell>
            <TableCell className="text-right">{item.user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
  )
}
