export function Input({ label, value, onChange, error }) {
    return (
        <>
            <label className="input-text">{label}</label>
            <input type="text" value={value} onChange={onChange} />
            {error && <div className="input-error">{error}</div>}
        </>
    );
}