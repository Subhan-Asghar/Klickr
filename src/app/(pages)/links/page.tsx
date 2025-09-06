"use client"
import React from 'react'
import ListLink from '@/components/link/ListLink'
const Link = () => {
  return (
<div className="flex flex-col h-[90vh] bg-background mt-1 rounded-lg border shadow-lg">
  <div className="h-[10vh] flex flex-col justify-center px-4 border-b">
    <h1 className="text-2xl font-semibold tracking-tight">Links</h1>
    <p className="text-sm text-muted-foreground">
      Overview of all your created links with performance insights.
    </p>
  </div>
  <div className="flex flex-row gap-2 flex-1 overflow-y-auto">
    <ListLink  />
    <div className="flex-1 bg-accent"></div>
  </div>
</div>


  )
}

export default Link