import "./ProductInfo.css";
import { useState } from "react";

export default function ProductInfo({ product }) {
  // Use for formating the field keys into user readable text
  const formatKey = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  const details = product.details ?? {};
  const hasDetails = Object.keys(details).length > 0;

  return (
    <div className="product-info-wrapper">
      {product.description && (
        <>
          <div
            className="product-desc-header"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            <h4>Description</h4>
            <span>{isDescriptionOpen ? "▼" : "▲"}</span>
          </div>

          {isDescriptionOpen && (
            <p className="product-description">{product.description}</p>
          )}
        </>
      )}
      {hasDetails && (
        <>
          <div
            className="product-specs-header"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          >
            <h4>Specifications</h4>
            <span>{isDetailsOpen ? "▼" : "▲"}</span>
          </div>
          {isDetailsOpen && (
            <div className="product-specs">
              {Object.keys(product.details).map((field) => {
                return (
                  <div className="product-spec" key={field}>
                    <p className="product-spec-name">{formatKey(field)}</p>
                    <p className="product-spec-value">
                      {product.details[field]}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
