type DialogPropts = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, children }: DialogPropts) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded bg-white p-4 text-black">
        <h2>{title}</h2>
        {children}
        <button onClick={() => onClose()}>Close</button>
      </div>
    </div>
  );
}
