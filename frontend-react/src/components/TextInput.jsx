export default function TextInput({ value, onChange, maxChars, hasError }) {
  const count = value.length;

  return (
    <div>
      <label htmlFor="inputText">Your text</label>
      <textarea
        id="inputText"
        rows="8"
        maxLength={maxChars}
        placeholder={`Paste up to ${maxChars} characters...`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="meta">
        <span>{`${count} / ${maxChars}`}</span>
        <span className="error">
          {hasError ? `Max ${maxChars} characters allowed.` : ""}
        </span>
      </div>
    </div>
  );
}
