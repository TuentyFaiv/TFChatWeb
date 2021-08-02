export interface PostData {
  id: string;
  title: string;
  date: string;
}

export interface AllPostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export interface Paths {
  params: {
    id: string;
  }
}