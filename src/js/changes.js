// @ts-nocheck
import { db } from "../db";
import * as Diff from "diff";

export const commitFiles = async function (comment = "") {
  // current
  const html = await db.save.get("html").then((file) => {
    return file?.content || "";
  });
  const css = await db.save.get("css").then((file) => {
    return file?.content || "";
  });
  const js = await db.save.get("js").then((file) => {
    return file?.content || "";
  });

  // previous
  const htmlStored = await db.files.get("html").then((file) => {
    if (file) {
      return file?.content;
    }
    return "";
  });
  const cssStored = await db.files.get("css").then((file) => {
    if (file) {
      return file?.content;
    }
    return "";
  });
  const jsStored = await db.files.get("js").then((file) => {
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

  // Insert the changes into the `changes` table
  const differences = [htmlDifferences, cssDifferences, jsDifferences];
  const filesChanged = differences.reduce(
    (acc, diff, i) =>
      didItChange(diff) ? [...acc, ["html", "css", "js"][i]] : acc,
    []
  );
  if (!filesChanged.length) return;
  if (comment == "") return;

  let commentId = await commitComment(comment).then((id) => {
    return id;
  });

  const store = { commentId, files: filesChanged, differences };
  await db.changes.put(store);
  const files = [
    { name: "html", content: html },
    { name: "css", content: css },
    { name: "js", content: js }
  ];

  // @ts-ignore
  db.files.bulkPut(files);
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
