import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import remark from 'remark'
import html from 'remark-html'
import { PostData, AllPostData, Paths } from "@interfaces";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data: dataMatter } = matter(fileContents);

    const data: PostData = {
      id,
      title: dataMatter.title,
      date: dataMatter.date,
    };

    return data;
  });
  
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const params: Paths = {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    };
    return params;
  });
}

export async function getPostData(id: string)  {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data: dataMatter, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  const data: AllPostData = {
    id,
    title: dataMatter.title,
    date: dataMatter.date,
    contentHtml
  }

  return data;
}