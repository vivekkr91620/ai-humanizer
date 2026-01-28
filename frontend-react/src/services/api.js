const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/humanize";

export async function humanizeText({ text, tone, intensity }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, tone, intensity })
  });

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    data = { error: "Unable to parse server response." };
  }

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}
