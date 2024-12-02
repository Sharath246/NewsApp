export type newsType = {
  status: string;
  totalResults: Number;
  articles: {
    source: {
      id: string;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
};
