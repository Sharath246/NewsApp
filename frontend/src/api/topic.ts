import { news } from "../CommonTypes";
import { trainDecorator } from "../Decorators/NaiveBayesDecorator";

export async function getTopic(
  description: string
): Promise<string[]> {
  const url = "http://127.0.0.1:9000/naive/predict";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", "text":description},
    });
    const value = await response.json();
    return value;
  } catch (error) {
    return [];
  }
}

export async function trainModel(news: news[],topic:string): Promise<string[]> {
  console.log(topic)
  const url = "http://127.0.0.1:9000/naive/train";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trainDecorator(news,topic))
    });
    const value = await response.json();
    return value;
  } catch (error) {
    return [];
  }
}

