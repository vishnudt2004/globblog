// Node module Imports
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import useInterval from "@/hooks/useInterval";
import { durationToMs } from "@/utils/timeUtils";

const formatTime_internal = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

// eslint-disable-next-line react/display-name
const CountDown = forwardRef(function ({ countDown, start = true }, ref) {
  const [time, setTime] = useState(0);
  const [startCD, setStartCD] = useState(start);

  useInterval(
    () => {
      if (time > 0) {
        setTime((p) => p - 1);
        setStartCD(true);
      } else {
        setTime(0);
        setStartCD(false);
      }
    },
    1000,
    startCD,
  );

  useEffect(() => {
    if (start) setTime(durationToMs(countDown) / 1000);
  }, [countDown, start]);

  useImperativeHandle(ref, () => ({
    reset() {
      setTime(durationToMs(countDown) / 1000);
      setStartCD(true);
    },
  }));

  return <span>{formatTime_internal(time)}</span>;
});

export default CountDown;
