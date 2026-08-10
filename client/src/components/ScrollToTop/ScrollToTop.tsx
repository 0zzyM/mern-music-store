import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// gets location with useLocation hook comes with react router
// every time location changes component re-renders it is on top of router in app.jsx
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
