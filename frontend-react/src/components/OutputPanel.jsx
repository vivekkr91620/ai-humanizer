export default function OutputPanel({ value }) {
  return (
    <div className="field">
      <label htmlFor="outputText">Humanized output</label>
      <textarea id="outputText" rows="8" readOnly value={value} />
    </div>
  );
}
