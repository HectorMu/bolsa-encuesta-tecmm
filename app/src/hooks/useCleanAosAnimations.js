import { useEffect, useRef } from "react";

const useCleanAosAnimations = () => {
  const animationRef = useRef();

  useEffect(() => {
    setTimeout(
      () =>
        animationRef.current.attribute &&
        animationRef.current.removeAttribute("data-aos"),
      500
    );
  }, []);

  return animationRef;
};

export default useCleanAosAnimations;
