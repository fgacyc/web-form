export function Input({ label, value, type, onChange, error }) {
    return (
        <>
            <label className="input-text">{label}</label>
            <input type={type || "text"} value={value} onChange={onChange} />
            {error && <div className="input-error">{error}</div>}
        </>
    );
}