import Dexie from "dexie";


/**
 * @typedef {import("./table/plugins").Plugin} Plugin
 * @typedef {import("./table/plugins").PluginDB} PluginDB
 * @typedef {import("./table/libs").Lib} Lib
 * @typedef {import("./table/libs").LibDB} LibDB
 * @typedef {import("./table/branches").Branch} Branch
 * @typedef {import("./table/branches").BranchDB} BranchDB
 * @typedef {import("./table/changes").Change} Change
 * @typedef {import("./table/changes").ChangeDB} ChangeDB
 * @typedef {import("./table/files").File} File
 * @typedef {import("./table/files").FileDB} FileDB
 * @typedef {import("./table/save").Save} Save
 * @typedef {import("./table/save").SaveDB} SaveDB
 * @typedef {import("./table/users").User} User
 * @typedef {import("./table/users").UserDB} UserDB
 * @typedef {import("./table/comments").Comment} Comment
 * @typedef {import("./table/comments").CommentDB} CommentDB
 * @typedef {import("./table/todos").Todo} Todo
 * @typedef {import("./table/todos").TodoDB} TodoDB
 */

export * from "./table/plugins";
export * from "./table/libs";
export * from "./table/branches";
export * from "./table/changes";
export * from "./table/files";
export * from "./table/save";
export * from "./table/users";
export * from "./table/comments";
export * from "./table/todos";

export {DB} from "./utils";


const DB_VERSION = 1;


/**
 * @class
 * @extends Dexie
 */
export class HazeDB extends Dexie {
  constructor() {
    super("haze");
    this.version(DB_VERSION).stores({
      changes: "++id,commentId,files,differences",
      files: "name,content",
      save: "name,content",
      plugins: "++id,&name, content,type, file,active",
      users: "++id,&username",
      comments: "++id,userId,comment, changes,timestamp",
      branches: "++id,&branch,user",
      libs: "++id,&name,file, type,active",
      todos: "++id,userId,text,done,removed,color,timestamp",
    });

    /** @type {Dexie.Table<Change, number>} */
    this.changes = this.table("changes");

    /** @type {Dexie.Table<File, number>} */
    this.files = this.table("files");

    /** @type {Dexie.Table<Save, number>} */
    this.save = this.table("save");

    /** @type {Dexie.Table<Plugin, number>} */
    this.plugins = this.table("plugins");

    /** @type {Dexie.Table<User, number>} */
    this.users = this.table("users");

    /** @type {Dexie.Table<Comment, number>} */
    this.comments = this.table("comments");

    /** @type {Dexie.Table<Branch, number>} */
    this.branches = this.table("branches");

    /** @type {Dexie.Table<Lib, number>} */
    this.libs = this.table("libs");

    /** @type {Dexie.Table<Todo, number>} */
    this.todos = this.table("todos");
  }
}

/** @type {HazeDB} */
export const db = new HazeDB();


db.branches.put({
  branch: "main",
  user: "dixie",
});

db.users.put({
  username: "default",
});
