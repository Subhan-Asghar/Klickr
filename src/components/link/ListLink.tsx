import React from "react";
import { useLinkList } from "@/hooks/useLinkList";
import { Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkDialog } from "../dashboard/Link-Dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteLink from "./DeleteLink";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const ListLink = () => {
  const router=useRouter()
  const { data: list,refetch } = useLinkList();

  // Edit Function

  const { mutateAsync: EditLink } = useMutation({
    mutationFn: async ({
      title,
      redirect,
      active,
      id,
    }: {
      title: string;
      redirect: string;
      active: boolean;
      id: string;
    }) => {
      const res = await axios.put("/api/link", { title, redirect, active, id });
      return res.data;
    },
  });

  const submit = async (
    title: string,
    link: string,
    active: boolean,
    id: string | undefined
  ) => {
    const data = {
      title: title,
      redirect: link,
      active: active,
      id: id ?? "",
    };
    const res = EditLink(data);
    toast.promise(res, {
      loading: "Updating the link...",
      success: "Linink Updated!",
      error: "Failed to edit link",
    });
    const result = await res;
    return result.link;
  };

  const DetailRouter=(id:string)=>{
    const today=new Date()
    const lastweek=new Date()
  
    lastweek.setDate(today.getDate() -6)
    const start = new Date(Date.UTC(
      lastweek.getFullYear(),
      lastweek.getMonth(),
      lastweek.getDate()
    )).toISOString()
  
    const end = new Date(Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )).toISOString()
  
    router.push(`/details?id=${id}&start=${start}&end=${end}`)
  }

  return (
    <div className="flex-1 p-2 h-[90vh] overflow-auto">
      {list?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item, idx: number) => (
              <TableRow key={idx}>
                <TableCell>
                  {item.is_active ? (
                    <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-500 shadow-none rounded-full">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-600/10 dark:bg-red-600/20 text-red-500 shadow-none rounded-full">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />
                      Blocked
                    </Badge>
                  )}
                </TableCell>
                <TableCell  onClick={()=>DetailRouter(item.id)}>{item.title}</TableCell>
                <TableCell>
                  <a
                    className="text-sm hover:underline bg-muted relative rounded px-[0.3rem] py-[0.2rem] text-muted-foreground  "
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_APP_URL + "api/v/" + item.id}
                  >
                    {process.env.NEXT_PUBLIC_APP_URL + "api/v/" + item.id}
                  </a>
                </TableCell>
                <TableCell className="flex flex-row gap-2">
                  <LinkDialog
                    trigger={<Pencil size={16} />}
                    submit={submit}
                    Dialog_title="Edit Link"
                    button_text="Save Changes"
                    description="Update the title, URL, or status of your link."
                    id={item.id}
                    default_value={{
                      title: item.title,
                      link: item.redirect,
                      checked: item.is_active,
                    }}
                    refetch={refetch}
                  />

                  <DeleteLink
                    trigger={<Trash2 size={16} className="text-red-500" />}
                    id={item.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          No links found
        </div>
      )}
    </div>
  );
};

export default ListLink;
