// @ts-nocheck
import Dexie from "dexie";
export const db = new Dexie("code");
db.version(1).stores({
  changes: "++id,commentId,files,differences",
  files: "name,content",
  save: "name,content",
  plugins: "++id,&name, content,type, file,active",
  users: "++id,&username",
  comments: "++id,userId,comment",
  branches: "++id,&branch,user",
  libs: "++id,&name,file, type,active",
  todos: "++id,userId,text,done,removed,color,timestamp",
});

db.branches.put({
  branch: "master",
  user: "dixie",
});

db.users.put({
  username: "default",
});

export const DB = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  update: (key, value) => {
    const currentValue = DB.get(key);
    if (currentValue !== null) {
      DB.set(key, value);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
