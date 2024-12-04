export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<string> {
  const url = "http://localhost:8080/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    const value = await response.text();
    return value;
  } catch (error) {
    return "No Result";
  }
}
