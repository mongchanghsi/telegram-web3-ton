import { useRef, useState } from "react";

const HapticTest = () => {
  const [isHeld, setIsHeld] = useState<boolean>(false);
  const [boxColor, setBoxColor] = useState<string>("blue");
  const holdTimeout = useRef<any>(null);

  const handleTouchStart = () => {
    holdTimeout.current = setTimeout(() => {
      setIsHeld(true);
      setBoxColor("red");
    }, 2000);
  };

  const handleTouchEnd = () => {
    clearTimeout(holdTimeout.current);
    setIsHeld(false);
    setBoxColor("blue");
  };

  return (
    <div>
      <div
        style={{ height: "50px", width: "50px", background: boxColor }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
};

export default HapticTest;
