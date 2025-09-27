export async function getAccessToken() {
    const response = await fetch("https://oauth.fatsecret.com/connect/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.FATSECRET_CLIENT_ID}:${process.env.FATSECRET_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error_description || "Token error");
    return data.access_token;
  }
  
  export async function fatsecretFetch(endpoint, params) {
    const token = await getAccessToken();
    const url = new URL(endpoint);
  
    // params varsa ekle
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API error");
    return data;
  }
  