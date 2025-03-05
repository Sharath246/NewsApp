export async function getImage(topic: string): Promise<string> {
  const url = "https://api.pexels.com/v1/search?query=" + topic;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "aOKdEBzQVzLOA3M0RmPAzAxOp0IcXuCKCwrL15w1PKwYAhUx4L2RbTSU",
      },
    });
    if (!response.ok) throw Error;
    const val = await response.json();
    return val["photos"][0]["src"]["original"];
  } catch (error) {
    return "No Result";
  }
}
