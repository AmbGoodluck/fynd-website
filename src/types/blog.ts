export interface Article {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  image: string;
  publishDate: string;
  link: string;
}

export interface RSSFeed {
  name: string;
  url: string;
}
