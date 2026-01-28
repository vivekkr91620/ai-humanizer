const INTENSITIES = [
  {
    value: "light",
    label: "Light",
    description: "Small cleanups, keep the original phrasing mostly intact."
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "A natural rewrite with moderate smoothing."
  },
  {
    value: "strong",
    label: "Strong",
    description: "A more human and expressive rewrite."
  }
];

export default function IntensitySelector({ value, onChange }) {
  return (
    <fieldset>
      <legend>Humanization intensity</legend>
      <div className="intensity-grid">
        {INTENSITIES.map((option) => (
          <label key={option.value} className="intensity-option">
            <input
              type="radio"
              name="intensity"
              value={option.value}
              checked={value === option.value}
              onChange={(event) => onChange(event.target.value)}
            />
            <span>
              <strong>{option.label}</strong>
              <span className="helper-text">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
