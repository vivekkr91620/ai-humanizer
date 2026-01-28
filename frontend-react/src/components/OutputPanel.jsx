export default function OutputPanel({ value }) {
  return (
    <div>
      <label htmlFor="outputText">Humanized output</label>
      <textarea id="outputText" rows="8" readOnly value={value} />
    </div>
  );
}
