import { news } from "../CommonTypes";
import { getNewsRequest, setNewsResponse } from "../Decorators/BodyDecorator";

export async function like(news: news, email: string) {
  const url = "http://localhost:8080/like";
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
    console.error("Error Message in likes -> ", error);
    return "Failed";
  }
}

export async function removeLike(news: news, email: string) {
  const url = "http://localhost:8080/removeLike";
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
    console.error("Error Message in remove Like -> ", error);
    return "Failed";
  }
}

export async function allLikes(email: string): Promise<news[]> {
  const url = "http://localhost:8080/allLikes";
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
    return setNewsResponse(responseArray);
  } catch (error) {
    console.error("Error Message in allLikes -> ", error);
    return [];
  }
}
