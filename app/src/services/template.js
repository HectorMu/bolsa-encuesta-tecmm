import { baseUrl } from "../config/API";

export const fetchSome = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/some`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
