import "./PromotionBanner.css";
import { Link } from "react-router-dom";

export default function PromotionBannerItem({ promotion }) {
  return (
    <Link to={promotion.ctaLink} className="promotion-item-container">
      <div className="promotion-image-container">
        <img src={promotion.image} alt={promotion.title} />
      </div>

      <div className="promotion-overlay">
        <h2 className="promotion-title">{promotion.title}</h2>
        <p className="promotion-subtitle">{promotion.subtitle}</p>

        <span className="promotion-cta-btn">{promotion.ctaText}</span>
      </div>
    </Link>
  );
}
