import { news, newsType } from "../CommonTypes";
export async function getNews(
  type: string,
  query: string,
): Promise<news[]> {
  var url: string = "";
  const apiKey = "d82840cf2d394de2bbf45c8925147b65";
  if (type === "Everything") {
    if (query === "") return [];
    else url = `https://newsapi.org/v2/Everything?${query}&apiKey=${apiKey}&pageSize=100`;
  } else if (type === "TopHeadlines") {
    if (query !== "")
      url = `https://newsapi.org/v2/top-headlines?${query}&apiKey=${apiKey}&pageSize=100`;
    else return [];
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error;
    const news:newsType = await response.json();
    if (news === null) throw Error;
    return news['articles'].filter((news)=>news.title !== '[Removed]' );
  } catch (error) {
    console.error("Error Message in getNews -> ", error);
    return [];
  }
}
