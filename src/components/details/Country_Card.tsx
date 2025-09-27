import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleChevronRight } from "lucide-react";
import Country_List from "./Country_List";
type Props = {
  title: string;
  data: { country: string; total: number }[];
};

const Country_Card = ({ title, data }: Props) => {
  return (
    <Card className=" w-72 h-48">
      <CardHeader>
        <CardTitle className="flex justify-between ">
          <h3 className="font-semibold">{title}</h3>
          <Country_List
          trigger={ <CircleChevronRight className="cursor-pointer"/>}
          data={data}
          />
         
        </CardTitle>
      </CardHeader>
      <CardContent className=" ">
        {!data || data.length==0?(
           <p className="text-muted-foreground px-2 py-2 text-center">
           Link is not clicked
         </p>
        )
        :(data.slice(0, 3).map((d, i) => (
          <div key={i} >
            <div className="flex justify-between px-2 pb-2"> 
                <h3 className=" ">{d.country}</h3>
            <span className="">{d.total}</span></div>
            
           
          </div>
        )))}
      </CardContent>
    </Card>
  );
};

export default Country_Card;
