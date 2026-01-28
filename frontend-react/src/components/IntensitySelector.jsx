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
    <fieldset className="selector">
      <legend>Humanization intensity</legend>
      <div className="pill-group intensity">
        {INTENSITIES.map((option) => (
          <label
            key={option.value}
            className={`pill option ${value === option.value ? "active" : ""}`}
          >
            <input
              type="radio"
              name="intensity"
              value={option.value}
              checked={value === option.value}
              onChange={(event) => onChange(event.target.value)}
            />
            <span className="pill-content">
              <strong>{option.label}</strong>
              <span className="helper-text">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
