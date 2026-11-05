// dialog wielokrotnego użytku: potwierdzenie usuwania i formularz dodawania/edycji
type DialogProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, children }: DialogProps) {
  return (
    // ciemne tło na całej stronie
    <div className="dialog-backdrop">
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-header">
          <h2 id="dialog-title">{title}</h2>
          <button
            type="button"
            className="dialog-close"
            aria-label="Zamknij"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {/* to, co rodzic wstawi do środka */}
        {children}
      </div>
    </div>
  );
}
