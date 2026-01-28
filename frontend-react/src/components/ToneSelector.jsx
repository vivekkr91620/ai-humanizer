const TONES = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "very-human", label: "Very Human" }
];

export default function ToneSelector({ value, onChange }) {
  return (
    <fieldset className="selector">
      <legend>Choose a tone</legend>
      <div className="pill-group">
        {TONES.map((tone) => (
          <label
            key={tone.value}
            className={`pill ${value === tone.value ? "active" : ""}`}
          >
            <input
              type="radio"
              name="tone"
              value={tone.value}
              checked={value === tone.value}
              onChange={(event) => onChange(event.target.value)}
            />
            {tone.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
