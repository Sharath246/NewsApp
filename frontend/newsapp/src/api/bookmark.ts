import { news } from "../CommonTypes";

export async function bookmark(news: news) {
  const url = "localhost:8080/bookMark";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ news: news }),
    });
    if (!response.ok) throw Error;
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error("Error Message in bookmark -> ", error);
    return "Failed";
  }
}

export async function allBookmarks(email: string): Promise<news[]> {
  const url = "localhost:8080/allBookmarks";
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
    if(responseArray === null)
      throw Error;
    return responseArray;
  } catch (error) {
    console.error("Error Message in allBookmarks -> ", error);
    return [];
  }
}
