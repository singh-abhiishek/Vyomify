// useOutsideClick.js
import { useEffect, useRef } from "react";

const useOutsideClick = (ref, handler, enabled = true, ignoreCondition = false) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled || ignoreCondition) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enabled, ignoreCondition, ref]);
};

export default useOutsideClick;
