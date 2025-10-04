import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  totalLink: number;
  average_click: number;
};
const Dash_Detail = ({ title, totalLink, average_click }: Props) => {
  return (
    <Card className=" w-72 h-48">
      <CardHeader>
        <CardTitle className="font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between px-2 pt-2">
          Total Links
          <p>{totalLink}</p>
        </div>
        <div className="flex justify-between px-2 pt-2">
          Average Click
          <p>{average_click}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dash_Detail;
