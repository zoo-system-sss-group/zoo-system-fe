export function ApiImage({value,className}) {
  return (
    <img
      className={className}
      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`}
    />
  );
}
