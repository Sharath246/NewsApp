export async function setUserTopics(topics:string,email:string): Promise<string | null> {
  const url = "http://localhost:8080/addTopic";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: email,
        topic: topics,
      },
    });
    if (!response.ok) throw Error;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error fetching session name:", error);
    return "Failed";
  }
}
