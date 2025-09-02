import {pgTable,serial,timestamp, text, uuid, integer} from "drizzle-orm/pg-core"

export const user=pgTable("user",{
    id:serial("id").primaryKey(),
    name:text("name").notNull(),
    email:text("email").unique().notNull(),
    password:text("password").notNull(),
    created_at:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),
})

export const link=pgTable("link",{
    id:uuid("id").defaultRandom().primaryKey().notNull(),
    title:text("text").notNull(),
    redirect:text("redirect").notNull(),
    user_id:integer("user_id").notNull().references(()=>user.id),
    created_at:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),

})