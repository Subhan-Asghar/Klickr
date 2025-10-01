import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  totalLink: number;
};
const Dash_Detail = ({ title, totalLink }: Props) => {
  return (
    <Card className=" w-72 h-48">
      <CardHeader>
        <CardTitle className="font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent >
      <div className="flex justify-between px-2 pt-2">
                Links
                <p>{totalLink}</p>
            </div>
      </CardContent>
    </Card>
  );
};

export default Dash_Detail;
