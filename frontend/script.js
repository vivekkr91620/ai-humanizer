const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const humanizeBtn = document.getElementById("humanizeBtn");
const copyBtn = document.getElementById("copyBtn");
const status = document.getElementById("status");
const charCount = document.getElementById("charCount");
const inputError = document.getElementById("inputError");

const MAX_CHARS = 1000;
const API_URL = "http://localhost:3000/humanize";

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = `status ${type}`.trim();
}

function updateCharCount() {
  const count = inputText.value.length;
  charCount.textContent = `${count} / ${MAX_CHARS}`;
  if (count > MAX_CHARS) {
    inputError.textContent = `Max ${MAX_CHARS} characters allowed.`;
  } else {
    inputError.textContent = "";
  }
}

function getSelectedTone() {
  const selected = document.querySelector("input[name='tone']:checked");
  return selected ? selected.value : "casual";
}

async function humanize() {
  const text = inputText.value.trim();

  if (!text) {
    setStatus("Please enter text before humanizing.", "error");
    return;
  }

  if (text.length > MAX_CHARS) {
    setStatus(`Text exceeds ${MAX_CHARS} characters.`, "error");
    return;
  }

  const tone = getSelectedTone();

  outputText.value = "";
  setStatus("Humanizing your text...", "");
  humanizeBtn.disabled = true;
  copyBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, tone })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    outputText.value = data.humanized;
    copyBtn.disabled = false;
    setStatus(
      data.usedMock
        ? "Humanized with the mock AI (add a real API key for best results)."
        : "Success! Your text has been humanized.",
      "success"
    );
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    humanizeBtn.disabled = false;
  }
}

async function copyToClipboard() {
  if (!outputText.value) {
    setStatus("Nothing to copy yet.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(outputText.value);
    setStatus("Copied to clipboard!", "success");
  } catch (error) {
    setStatus("Copy failed. You can still select and copy manually.", "error");
  }
}

inputText.addEventListener("input", updateCharCount);
humanizeBtn.addEventListener("click", humanize);
copyBtn.addEventListener("click", copyToClipboard);

updateCharCount();
