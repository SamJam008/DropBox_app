import { pgTable, text, uuid, integer, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { timestamp } from "drizzle-orm/pg-core"
// database table

// export const files = pgTable("files", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     //basic file/ folder information
//     //should come with a name and not be empty
//     name: text("name").notNull(),
//     //everything needs to have a path
//     path: text("path").notNull(),//document/project/resume
//     size: integer("size").notNull(),
//     type: text("type").notNull(),// what type of data you are storing

//     //storage information
//     fileUrl: text("file_url").notNull(),// url to access files
//     thumbnailUrl: text("thumbnail_url"),

//     // Ownership
//     userId: text("user_id").notNull(),
//     parentId: uuid("parent_id"), // parent folder id(null for root items)

//     // file/ folder flags
//     isFolder: boolean("is_folder").default(false).notNull(),
//     isStarred: boolean("is_starred").default(false).notNull(),
//     isTrashed: boolean("is_trashed").default(false).notNull(),

//     // Timestamps
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });
export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),
    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrashed: boolean("is_trashed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//FilesRelations
/* 
parent : Each file/folder can have one parent folder
children : Each folder can have many child files/folder
*/

export const filesRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    // relationship to child file/folder
    // there could be many child inside the folder
    children: many(files)
}));

// Type definations
// type file ={
//     id:string;
//     name: string;
//     iSfolder: boolean;

// }
export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;






