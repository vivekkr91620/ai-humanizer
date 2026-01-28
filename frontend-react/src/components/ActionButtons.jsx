export default function ActionButtons({ onHumanize, onCopy, loading, outputReady }) {
  return (
    <div className="actions">
      <button type="button" className="primary" onClick={onHumanize} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-label="Loading"></span>
            Working...
          </>
        ) : (
          "Humanize"
        )}
      </button>
      <button
        type="button"
        className="secondary"
        onClick={onCopy}
        disabled={!outputReady || loading}
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
