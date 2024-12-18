import { news } from "../CommonTypes";

export async function like(news: news) {
  const url = "localhost:8080/like";
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
    console.error("Error Message in likes -> ", error);
    return "Failed";
  }
}

export async function allLikes(email: string): Promise<news[]> {
  const url = "localhost:8080/allLikes";
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
    return responseArray;
  } catch (error) {
    console.error("Error Message in allLikes -> ", error);
    return [];
  }
}
