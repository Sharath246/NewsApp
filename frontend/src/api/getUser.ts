export async function getUser(
  email: string,
  password: string
): Promise<{
  name: string | null;
  email: string | null;
  topics: string | null;
  response: string;
}> {
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
    const val = await response.json();
    return val;
  } catch (error) {
    return {
      name: "",
      email: "",
      topics: "",
      response: "Internal Error",
    };
  }
}
