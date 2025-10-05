import { cn } from "@/lib/utils"
import { Marquee } from "../ui/marquee"
const reviews = [
    {
      name: "Liam Parker",
      username: "@liamcodes",
      body: "Finally — a link management tool that gives me full control. Being able to edit redirects without breaking old links is a game changer.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Sophia Chen",
      username: "@sophcreates",
      body: "I use this for my portfolio and client projects. The analytics dashboard helps me see exactly which campaigns are performing best.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "Noah Patel",
      username: "@noah_dev",
      body: "The ability to create custom short links with my own slugs feels premium. It’s like having my own private Bitly instance — but smarter.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Ava Rodriguez",
      username: "@ava.designs",
      body: "Super intuitive and reliable. Updating redirect targets instantly saves so much time when managing multiple landing pages.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Ethan Brooks",
      username: "@ethanmarketing",
      body: "This platform bridges the gap between simplicity and data insight. Tracking click sources and countries gives us a clear growth picture.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "Olivia Nguyen",
      username: "@olivia.analytics",
      body: "We switched from a paid link management SaaS to this — it’s faster, more flexible, and we own all the data. That’s huge for compliance.",
      img: "https://avatar.vercel.sh/james",
    },
    {
      name: "Mason Clark",
      username: "@masonbuilds",
      body: "I love how lightweight and customizable it is. Perfect for developers who want analytics without a bloated dashboard.",
      img: "https://avatar.vercel.sh/mason",
    },
    {
      name: "Isabella Flores",
      username: "@isabellacreates",
      body: "Managing my content links used to be a headache. Now everything’s centralized, trackable, and easy to update in seconds.",
      img: "https://avatar.vercel.sh/isabella",
    },
  ]
const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}
export function Review() {
  return (
    <>
       <h4 className="scroll-m-20 p-3 text-xl text-center font-semibold tracking-tight">
       Trusted by Creators, Teams, and Businesses
    </h4>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
    </>
  )
}