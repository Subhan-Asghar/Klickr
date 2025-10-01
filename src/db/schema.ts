import {pgTable,serial,timestamp, text, integer, boolean} from "drizzle-orm/pg-core"
import { customAlphabet} from "nanoid"
const nanoid=customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",8)

export const user=pgTable("user",{
    id:serial("id").primaryKey(),
    name:text("name").notNull(),
    email:text("email").unique().notNull(),
    password:text("password").notNull(),
    created_at:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),
})

export const link=pgTable("link",{
    id:text("id").$defaultFn(() => nanoid()).primaryKey(),
    title:text("text").notNull(),
    redirect:text("redirect").notNull(),
    user_id:integer("user_id").notNull().references(()=>user.id),
    is_active:boolean("is_active").default(true),
    created_at:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),

})

export const click=pgTable("click",{
    id:serial("id").primaryKey().notNull(),
    link_id:text("link_id").notNull().references(()=>link.id),
    ip:text("ip").notNull(),
    country:text("country").notNull(),
    lat:text("lat").notNull(),
    lon:text("lon").notNull(),
    time:timestamp("time",{ withTimezone: true }).defaultNow().notNull()
})