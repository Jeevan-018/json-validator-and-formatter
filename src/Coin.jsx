import React, { useState, useEffect } from "react";

function Coin() {
  const [grabberX, setGrabberX] = useState(360);
  const [coinY, setCoinY] = useState(0);
  const [coinX, setCoinX] = useState(Math.random() * 760);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setGrabberX((prev) => Math.max(0, prev - 40));
      if (e.key === "ArrowRight")
        setGrabberX((prev) => Math.min(720, prev + 40));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoinY((prevY) => {
        if (prevY >= 340) {
          if (coinX + 40 >= grabberX && coinX <= grabberX + 80) {
            setScore((s) => s + 1);
          }
          setCoinX(Math.random() * 760);
          return 0;
        }
        return prevY + 20;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [coinX, grabberX]);

  return (
    <div
      style={{
        width: 800,
        height: 400,
        border: "4px solid #004d7a",
        borderRadius: 12,
        position: "relative",
        margin: "20px auto",
        background:
          "linear-gradient(#c8e8ff 0%, #e1f5ff 60%, #b9dfff 60%, #ffffff 100%)",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* 🪙 Coin */}
      <div
        style={{
          position: "absolute",
          top: coinY,
          left: coinX,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #fffaba 0%, #ffd93b 40%, #dda200 100%)",
          boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.8)",
          transform: `rotate(${coinY * 3}deg)`,
          transition: "transform 0.1s linear",
        }}
      />

      {/* 🛡️ Grabber */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: grabberX,
          width: 80,
          height: 30,
          borderRadius: 8,
          background:
            "linear-gradient(135deg, #003c8f 0%, #0058c8 50%, #003c8f 100%)",
          boxShadow: "0 0 6px rgba(0,0,0,0.6)",
          transition: "left 0.15s ease-out",
        }}
      />

      {/* 🔢 Score */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "4px 12px",
          borderRadius: 6,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "#fff",
          fontSize: 18,
          fontWeight: "700",
          letterSpacing: 1,
        }}
      >
        Score: {score}
      </div>
    </div>
  );
}

export default Coin;
