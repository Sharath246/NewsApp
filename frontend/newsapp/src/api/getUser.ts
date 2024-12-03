export async function getUser(
  email: string,
  password: string
): Promise<string> {
  const url = "http://localhost:8080/login";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
        password: password,
      },
    });
    const val = await response.text();
    return val;
  } catch (error) {
    console.error("error ->   ", error.message);
    return "No Result";
  }
}
