import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Keeps page transitions starting at the top when routes change.
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);
  return null;
};

export default ScrollToTop;
