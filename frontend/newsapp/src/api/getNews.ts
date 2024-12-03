export async function getNews(type: string, query: string) {
  var url: string = "";
  const apiKey = "d82840cf2d394de2bbf45c8925147b65";
  if (type === "Everything") {
    if (query === "")
        return {articles:[]};
    else url = `https://newsapi.org/v2/Everything?${query}&apiKey=${apiKey}`;
  } else if (type === "TopHeadlines") {
    if (query !== "")
      url = `https://newsapi.org/v2/top-headlines?${query}&apiKey=${apiKey}`;
    else return {articles:[]};
  }
  try {
    console.log(url);
    const response = await fetch(url);
    console.log(response.ok);
    if(!response.ok)
      return {articles:[]};
    const allnews = await response.json();
    console.log(allnews);
    return allnews;
  } catch (error) {
    console.error("Error Message -> ", error);
    return [];
  }
}
