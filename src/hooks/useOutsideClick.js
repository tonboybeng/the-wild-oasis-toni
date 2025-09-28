import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenToCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("Click outside modal");
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenToCapturing);

      return () => document.removeEventListener("click", handleClick, listenToCapturing);
    },
    [handler, listenToCapturing]
  );

  return ref;
}
