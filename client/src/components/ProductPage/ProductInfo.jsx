export default function ProductInfo({ product }) {
  return (
    <>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      {Object.keys(product.details).map((field) => {
        return (
          <>
            <p>{field}</p>
            <p>{product.details[field]}</p>
          </>
        );
      })}
    </>
  );
}
