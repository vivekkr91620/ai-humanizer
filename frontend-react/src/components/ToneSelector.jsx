const TONES = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "very-human", label: "Very Human" }
];

export default function ToneSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend>Choose a tone</legend>
      {TONES.map((tone) => (
        <label key={tone.value}>
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
    </fieldset>
  );
}
