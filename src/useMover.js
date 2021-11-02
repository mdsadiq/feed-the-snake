import { useEffect, useRef } from "react";

const useMover = (callbackFunction, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callbackFunction;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null || delay > 100) {
      const intervalID = setInterval(tick, delay);
      return () => {
        clearInterval(intervalID);
      };
    }
  }, [delay]);
};
export default useMover;
