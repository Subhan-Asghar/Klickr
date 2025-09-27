import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import DeleteLink from "../link/DeleteLink";
import { LinkDialog } from "../dashboard/Link-Dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  title: string;
  data: {
    id: string;
    is_active: boolean;
    redirect: string;
    title: string;
    updated_at: string;
    created_at: string;
    user_id: number;
  };
};

const Detail_Card = ({ title,data }: Props) => {
    
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

  return (
    <Card className=" w-72 h-48">
      <CardHeader>
      <CardTitle className="flex justify-between ">
          <h3 className="font-semibold">{title}</h3>
          <div className="flex flex-row gap-2">
          <LinkDialog
                    trigger={<Pencil size={16} />}
                    submit={submit}
                    Dialog_title="Edit Link"
                    button_text="Save Changes"
                    description="Update the title, URL, or status of your link."
                    id={data.id}
                    default_value={{
                      title: data.title,
                      link: data.redirect,
                      checked: data.is_active,
                    }}
                  />

                  <DeleteLink
                    trigger={<Trash2 size={16} className="text-red-500" />}
                    id={data.id}
                  />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent >
    {data.id}
      </CardContent>
    </Card>
  );
};

export default Detail_Card;
