import {pgTable,serial,timestamp, text} from "drizzle-orm/pg-core"

export const user=pgTable("user",{
    id:serial("id").primaryKey(),
    email:text("email").unique().notNull(),
    password:text("password").notNull(),
    created_at:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),
})