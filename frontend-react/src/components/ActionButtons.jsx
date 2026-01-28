export default function ActionButtons({ onHumanize, onCopy, loading, outputReady }) {
  return (
    <div className="actions">
      <button type="button" onClick={onHumanize} disabled={loading}>
        {loading ? (
          <span className="spinner" aria-label="Loading"></span>
        ) : (
          "Humanize"
        )}
      </button>
      <button type="button" onClick={onCopy} disabled={!outputReady || loading}>
        Copy to Clipboard
      </button>
    </div>
  );
}
