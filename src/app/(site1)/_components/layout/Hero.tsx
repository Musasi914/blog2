export default function Hero() {
  return (
    <div className="h-screen">
      <video
        autoPlay
        preload="auto"
        loop
        muted
        playsInline
        className="h-full object-cover"
      >
        <source src="hero.webm" type="video/webm" />
        あなたのブラウザはビデオタグに対応していません
      </video>
    </div>
  );
}
