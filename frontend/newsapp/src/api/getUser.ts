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
    if (!response.ok) throw Error;
    const val = await response.text();
    return val;
  } catch (error) {
    return "No Result";
  }
}
