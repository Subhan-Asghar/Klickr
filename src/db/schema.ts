import {pgTable,serial,timestamp, text, integer} from "drizzle-orm/pg-core"
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
    created_at:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),

})