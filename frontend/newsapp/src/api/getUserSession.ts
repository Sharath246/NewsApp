export async function getUserSession(): Promise<string | null> {
  const url = "http://localhost:8080/getsession";
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error;
    const text = await response.text();
    return text === "null" || text.trim() === "" ? null : text;
  } catch (error) {
    console.error("Error fetching session name:", error);
    return null;
  }
}
