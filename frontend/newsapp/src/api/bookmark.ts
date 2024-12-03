import { news } from "../CommonTypes";

export async function bookmark(news: news) {
  const url = "localhost:8080/newsbookmark";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ news: news }),
  });
  const responseText = await response.text();
  if(responseText === "Success")
    return;
  else
    bookmark(news);
}
