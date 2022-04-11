import { useEffect } from "react";
const ScrollToBottom = () => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);
  return null;
};

export default ScrollToBottom;
