"use client";
import React from "react";
import ListLink from "@/components/link/ListLink";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useLinkList } from "@/hooks/useLinkList";
const Link = () => {
  const { isLoading } = useLinkList();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full rounded-lg border shadow-lg bg-background">
        <Spinner variant="circle"></Spinner>
      </div>
    );
  }

  return (
    <div className="flex h-full  bg-background p-2 rounded-lg border shadow-lg overflow-x">
      <ListLink />
    </div>
  );
};

export default Link;
