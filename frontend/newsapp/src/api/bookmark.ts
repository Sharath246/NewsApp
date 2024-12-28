import { news } from "../CommonTypes";
import { getNewsRequest, setNewsResponse } from "../Decorators/BodyDecorator";

export async function bookmark(news: news, email: string) {
  const url = "http://localhost:8080/bookMark";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ news: getNewsRequest(news), email: email }),
    });
    if (!response.ok) throw Error;
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error("Error Message in bookmark -> ", error);
    return "Failed";
  }
}

export async function removeBookmark(news: news, email: string) {
  const url = "http://localhost:8080/removeBookmark";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: news.url, email: email }),
    });
    if (!response.ok) throw Error;
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error("Error Message in remove bookmark -> ", error);
    return "Failed";
  }
}

export async function allBookmarks(email: string): Promise<news[]> {
  const url = "http://localhost:8080/allBookmarks";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
    });
    if (!response.ok) throw Error;
    const responseArray = await response.json();
    if (responseArray === null) throw Error;
    console.log(setNewsResponse(responseArray));
    return setNewsResponse(responseArray);
  } catch (error) {
    console.error("Error Message in allBookmarks -> ", error);
    return [];
  }
}
