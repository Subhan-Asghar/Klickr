"use client";
import React from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import Num_Card from "@/components/details/Num_Card";
import Country_Card from "@/components/details/Country_Card";
import Dash_Detail from "@/components/dashboard/Dash_Detail";
import { useRouter } from "next/navigation";
import { useDash_Graph } from "@/hooks/dash-graph";
import { Calendar22 } from "@/components/Calender22";
import Graph from "@/components/details/Graph";

const Dashboard = () => {
  const router = useRouter();
  const { data, isLoading } = useDashboard();
  const { data: graph_data, start, end } = useDash_Graph();
  console.log(graph_data);
  React.useEffect(() => {
    const func = () => {
      const today = new Date();
      const lastweek = new Date();

      lastweek.setDate(today.getDate() - 6);
      const start = new Date(
        Date.UTC(
          lastweek.getFullYear(),
          lastweek.getMonth(),
          lastweek.getDate()
        )
      ).toISOString();

      const end = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
      ).toISOString();
      const params = new URLSearchParams();
      params.set("start", start);
      params.set("end", end);
      router.push(`?${params.toString()}`);
    };
    func();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full rounded-lg border shadow-lg bg-background">
        <Spinner variant="circle"></Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full justify-between bg-background  rounded-lg border shadow-lg overflow-y-auto">
        <div className="flex justify-center flex-wrap gap-6 w-full p-4">
          <Num_Card title="Total Clicks" num={data.result[0].total} />
          <Num_Card title="Unique Visitors" num={data.result[0].unique} />
          <Country_Card title="Countries" data={data.countryStats} />
          <Dash_Detail
            title="Details"
            totalLink={data.total_link}
            average_click={data.average_click}
          />
        </div>

        <div className="mb-12 mr-6">
          <div className="ml-6">
            <Calendar22 />
          </div>

          <Graph data={graph_data?.result ?? []} start={start} end={end} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
