// @ts-nocheck
import { branchDB, changeDB, commentDB, fileDB, saveDB } from "../db/db";
import * as Diff from "diff";
import { Err, Success, toast } from "./toast";
import { Co } from "./confirm";

export const commitFiles = async function (comment = "") {
  let added = 0;
  let removed = 0;
  // current
  const html = await saveDB.get("html").then((file) => {
    return file?.content || "";
  });

  const css = await saveDB.get("css").then((file) => {
    return file?.content || "";
  });

  const js = await saveDB.get("js").then((file) => {
    return file?.content || "";
  });

  // previous
  const htmlStored = await fileDB.getFile("html").then((file) => {
    if (file) {
      return file?.content;
    }
    return "";
  });

  const cssStored = await fileDB.getFile("css").then((file) => {
    if (file) {
      return file?.content;
    }
    return "";
  });

  const jsStored = await fileDB.getFile("js").then((file) => {
    if (file) {
      return file?.content;
    }
    return "";
  });

  const options = {
    ignoreWhitespace: true,
  };

  // diff html, css, and js in parallel
  const [htmlDifferences, cssDifferences, jsDifferences] = await Promise.all([
    Diff.diffLines(htmlStored, html, options),
    Diff.diffLines(cssStored, css, options),
    Diff.diffLines(jsStored, js, options),
  ]);

  // Increment added and removed variables for each line difference
  htmlDifferences.forEach((diff) => {
    if (diff.added) {
      added += diff.count;
    } else if (diff.removed) {
      removed += diff.count;
    }
  });

  cssDifferences.forEach((diff) => {
    if (diff.added) {
      added += diff.count;
    } else if (diff.removed) {
      removed += diff.count;
    }
  });

  jsDifferences.forEach((diff) => {
    if (diff.added) {
      added += diff.count;
    } else if (diff.removed) {
      removed += diff.count;
    }
  });

  // Insert the changes into the `changes` table
  const differences = [htmlDifferences, cssDifferences, jsDifferences];
  const filesChanged = differences.reduce(
    (acc, diff, i) =>
      didItChange(diff) ? [...acc, ["html", "css", "js"][i]] : acc,
    []
  );
  if (!filesChanged.length) return;
  if (comment == "") return;

  let commentId = await commitComment({
    comment,
    changes: { added, removed },
  }).then((id) => {
    return id;
  });

  const store = { commentId, files: filesChanged, differences };
  await changeDB.addChange(store);
  const files = [
    { name: "html", content: html },
    { name: "css", content: css },
    { name: "js", content: js },
  ];

  await fileDB.addBulk(files);

  return true;
};

function didItChange(file) {
  for (const part of file) {
    if (part.added || part.removed) return true;
  }
  return false;
}

export async function commitComment(comment, user = 1) {
  let id = await commentDB
    .addComment({
      comment: comment.comment,
      userId: user,
      changes: comment.changes,
      timestamp: Date.now(),
    })
    .then((id) => {
      return id;
    });
  return id;
}

export const getChanges = async function (commentId) {
  try {
    // As an array, get the changes where the commentId matches
    const changes = await changeDB.getChange(commentId);


    return changes;
  } catch (err) {
    Err("Failed to get changes");
    console.error(err);
    return false;
  }
};

export const clear = async function () {
  const msg = "Are you sure you want to clear all data?";
  const result = await Co(msg);

  if (await result) {
    // User confirmed clearing
    await Promise.all([
      commentDB.clear(),
      changeDB.clear(),
      fileDB.clear(),
      branchDB.clear(),
    ]);
    Success("data Cleared");
    return true;
  } else {
    toast("Cancelled", "info");
    return false;
  }
};
