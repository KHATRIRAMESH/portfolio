import React, { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initial fill with theme background
    ctx.fillStyle = "#0F1624";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // const letters = '日本語のキーボード';
    const letters = "01";

    // const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
    const fontSize = 24;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    // Initialize drops
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
      }
    };
    initDrops();

    // Handle resize re-initialization manually in draw loop check or just let it adjust
    // Better to re-init drops on resize to avoid out of bounds
    const handleResize = () => {
      resizeCanvas();
      initDrops();
    };
    window.removeEventListener("resize", resizeCanvas); // replace with full handler
    window.addEventListener("resize", handleResize);

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (currentTime) => {
      animationFrameId = window.requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;

      lastTime = currentTime - (deltaTime % interval);

      // Use theme background color #0F1624 with low opacity for trails
      // #0F1624 is R=15, G=22, B=36
      ctx.fillStyle = "rgba(15, 22, 36, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    draw(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BackgroundAnimation;
