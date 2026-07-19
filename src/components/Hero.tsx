type HeroProps = {
  onTalk: () => void
  onDesign: () => void
}

export function Hero({ onTalk, onDesign }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-visual" aria-hidden>
        <div className="silk-plane" />
        <div className="glow" />
      </div>
      <div className="hero-copy">
        <p className="hero-kicker">四大名锦 · AIGC 文创</p>
        <h1>锦绣千年</h1>
        <p className="hero-lead">
          从纹样基因到生活载体——选锦、生成、贴合预览。让蜀锦、云锦、宋锦、壮锦走进手机壳、汉服与礼盒。
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={onDesign}>
            开始衍生设计
          </button>
          <button type="button" className="btn btn-ghost" onClick={onTalk}>
            与锦绣对话
          </button>
        </div>
      </div>
    </section>
  )
}
