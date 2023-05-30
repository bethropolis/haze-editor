// @ts-nocheck
import { db } from "../db";
import * as Diff from "diff";

export const commitFiles = async function (html, css, js, comment) {
  const htmlStored = (await db.files.get("html").content) || "";
  const cssStored = (await db.files.get("css").content) || "";
  const jsStored = (await db.files.get("js").content) || "";

  // diff html, css, and js in parallel
  const [htmlDifferences, cssDifferences, jsDifferences] = await Promise.all([
    Diff.diffLines(htmlStored, html || ""),
    Diff.diffLines(cssStored, css || ""),
    Diff.diffLines(jsStored, js || ""),
  ]);

  // Insert the changes into the `changes` table
  const differences = [htmlDifferences, cssDifferences, jsDifferences];
  const filesChanged = differences.reduce(
    (acc, diff, i) =>
      didItChange(diff) ? [...acc, ["html", "css", "js"][i]] : acc,
    []
  );

  if (!filesChanged.length) return;

  let commentId = await commitComment(comment).then((id) => {
    return id;
  });

  const store = { commentId, files: filesChanged, differences };

  await db.changes.put(store);
  return true;
};

function didItChange(file) {
  for (const part of file) {
    if (part.added || part.removed) return true;
  }
  return false;
}

export async function commitComment(comment, user = 1) {
  let id = await db.comments
    .add({
      comment,
      userId: user,
    })
    .then((id) => {
      return id;
    });
  return id;
}

export const getChanges = async function (commentId) {
  try {
    // As an array, get the changes where the commentId matches
    const changes = await db.changes
      .where("commentId")
      .equals(commentId)
      .toArray();
      
    return changes;
  } catch (err) {
    return false;
  }
};

getChanges(1);
