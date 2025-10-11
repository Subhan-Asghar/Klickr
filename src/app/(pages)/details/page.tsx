"use client";
import React from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import Num_Card from "@/components/details/Num_Card";
import Country_Card from "@/components/details/Country_Card";
import Detail_Card from "@/components/details/Detail_Card";
import { useDetails } from "@/hooks/useDetails";
import Graph from "@/components/details/Graph";
import { useGraph } from "@/hooks/use-graph";
import { Calendar22 } from "@/components/Calender22";

const Details = () => {
  const { data, isLoading } = useDetails();
  const { data: graph_data, start, end } = useGraph();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full rounded-lg border shadow-lg bg-background">
        <Spinner variant="circle"></Spinner>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full justify-between bg-background  rounded-lg border shadow-lg ">
      <div className="flex justify-center flex-wrap gap-6 w-full p-4">
        <Num_Card title="Total Clicks" num={data.totalClicks} />
        <Num_Card title="Unique Visitors" num={data.uniqueCount} />
        <Country_Card title="Countries" data={data.countryStats} />
        <Detail_Card title="Details" data={data.info} />
      </div>

      <div className="mb-12 mr-6">
        <div className="ml-6">
          <Calendar22 />
        </div>

        <Graph data={graph_data?.result ?? []} start={start} end={end} />
      </div>
    </div>
  );
};

export default Details;
