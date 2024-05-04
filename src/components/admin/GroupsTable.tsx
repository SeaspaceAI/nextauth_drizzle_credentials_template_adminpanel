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
  groups: {
    id: string;
    group_name: string;
  }[]
}

export function GroupsTable({groups}:Props) {
  return (
    <Table>
      <TableCaption>A list of groups.</TableCaption>
      <TableHeader>
        <TableRow className="justify-center">
          <TableHead className="w-[400px]">ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell>{group.id}</TableCell>
            <TableCell>{group.group_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
