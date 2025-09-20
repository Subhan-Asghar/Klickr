import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLinkList } from "@/hooks/useLinkList";
import { Trash2, Pencil, EllipsisVertical } from "lucide-react";
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
const ListLink = () => {
  const { data: list } = useLinkList();
  // Edit Function

  const { mutateAsync: EditLink } = useMutation({
    mutationFn: async ({
      title,
      redirect,
      active,
      id
    }: {
      title: string;
      redirect: string;
      active: boolean;
      id:string
    }) => {
      const res = await axios.put("/api/link", { title, redirect, active,id });
      return res.data;
    },
  });

  const submit = async (title: string, link: string, active: boolean,id:string | undefined) => {
    const data = {
      title: title,
      redirect: link,
      active: active,
      id:id ??""
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
                <TableCell>{item.title}</TableCell>
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
                    button_text="Confirm"
                    description="Edit the link"
                    id={item.id}
                    default_value={{
                      title: item.title,
                      link: item.redirect,
                      checked: item.is_active,
                    }}
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
