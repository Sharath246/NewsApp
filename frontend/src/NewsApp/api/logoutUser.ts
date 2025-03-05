export async function logoutUser(): Promise<string | null> {
  const url = "http://localhost:8080/logout";
  try {
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw Error;
    const val = await response.text();
    return val;
  } catch (error) {
    console.error("error ->   ", error.message);
    return null;
  }
}
