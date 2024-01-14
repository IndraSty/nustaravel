import { useEffect } from "react";

export function useOutsideAlerter(ref: any, setIsClicked: (value: boolean) => void) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsClicked(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, setIsClicked]);
  }