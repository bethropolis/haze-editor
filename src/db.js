// @ts-nocheck
// dixie js

import Dexie from "dexie";

export const db = new Dexie("code");
db.version(1).stores({
    changes: "++id,commentId,files,differences",
    files: "name,content",
    save: "name,content",
    plugins: "++id,&name, content, file",
    users: "++id,&username",
    comments: "++id,userId,comment",
    branches: "++id,&branch,user",
  });

 db.branches.put({
    branch: "master",
    user: "dixie",
  })

  db.users.put({
    username: 'default'
  })