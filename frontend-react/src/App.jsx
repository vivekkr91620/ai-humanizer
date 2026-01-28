import { useState } from "react";
import TextInput from "./components/TextInput.jsx";
import ToneSelector from "./components/ToneSelector.jsx";
import IntensitySelector from "./components/IntensitySelector.jsx";
import OutputPanel from "./components/OutputPanel.jsx";
import ActionButtons from "./components/ActionButtons.jsx";
import { humanizeText } from "./services/api.js";

const MAX_CHARS = 1000;

export default function App() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("casual");
  const [intensity, setIntensity] = useState("balanced");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const hasError = text.length > MAX_CHARS;

  const handleHumanize = async () => {
    const trimmed = text.trim();

    if (!trimmed) {
      setStatus("Please enter text before humanizing.");
      setStatusType("error");
      return;
    }

    if (trimmed.length > MAX_CHARS) {
      setStatus(`Text exceeds ${MAX_CHARS} characters.`);
      setStatusType("error");
      return;
    }

    setLoading(true);
    setOutput("");
    setStatus("Humanizing your text...");
    setStatusType("");

    try {
      const data = await humanizeText({ text: trimmed, tone, intensity });
      setOutput(data.humanized);
      setStatus(
        data.usedMock
          ? "Humanized with the mock AI (add a real API key for best results)."
          : "Success! Your text has been humanized."
      );
      setStatusType("success");
    } catch (error) {
      setStatus(error.message);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) {
      setStatus("Nothing to copy yet.");
      setStatusType("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setStatus("Copied to clipboard!");
      setStatusType("success");
    } catch (error) {
      setStatus("Copy failed. You can still select and copy manually.");
      setStatusType("error");
    }
  };

  return (
    <main className="container">
      <header>
        <h1>AI Humanizer</h1>
        <p>Paste text, pick a tone, and get a more natural rewrite.</p>
      </header>

      <section className="panel">
        <TextInput
          value={text}
          onChange={setText}
          maxChars={MAX_CHARS}
          hasError={hasError}
        />
        <ToneSelector value={tone} onChange={setTone} />
        <IntensitySelector value={intensity} onChange={setIntensity} />
        <ActionButtons
          onHumanize={handleHumanize}
          onCopy={handleCopy}
          loading={loading}
          outputReady={Boolean(output)}
        />
        <div className={`status ${statusType}`.trim()}>{status}</div>
      </section>

      <section className="panel">
        <OutputPanel value={output} />
      </section>
    </main>
  );
}
