import type { Carrier, PatternGene } from '../data'

type DesignStudioProps = {
  patterns: PatternGene[]
  selected: PatternGene
  carrier: Carrier
  carriers: Carrier[]
  onSelectPattern: (pattern: PatternGene) => void
  onSelectCarrier: (carrier: Carrier) => void
  onAskAgent: () => void
}

const kindLat: Record<string, string> = {
  蜀锦: 'Shu Brocade',
  云锦: 'Yun Brocade',
  宋锦: 'Song Brocade',
  壮锦: 'Zhuang Brocade',
}

function fabricStyle(pattern: PatternGene) {
  const [a, b, c] = pattern.palette
  return {
    background: `
      radial-gradient(circle at 30% 30%, ${c}66, transparent 35%),
      radial-gradient(circle at 70% 60%, ${b}70, transparent 40%),
      repeating-linear-gradient(45deg, ${a} 0 10px, ${b} 10px 20px),
      linear-gradient(135deg, ${a}, ${b})
    `,
  }
}

export function DesignStudio({
  patterns,
  selected,
  carrier,
  carriers,
  onSelectPattern,
  onSelectCarrier,
  onAskAgent,
}: DesignStudioProps) {
  return (
    <section className="home-sec" id="design">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Feature 01</span>
          <h2>锦绣纹样 AIGC 衍生设计</h2>
          <span className="lat-it">Pattern genes into product drafts</span>
          <p className="desc">
            依托纹样基因库，选取四大名锦经典纹样，一键生成适配手机壳、汉服、礼盒、帆布包的国风衍生图。
          </p>
        </div>

        <div className="cat-grid" role="list">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              type="button"
              role="listitem"
              className={`cat-card${selected.id === pattern.id ? ' on' : ''}`}
              onClick={() => onSelectPattern(pattern)}
            >
              <span className="cc-cn">{pattern.name}</span>
              <span className="cc-en">{kindLat[pattern.kind]}</span>
              <span className="cc-n">
                {pattern.kind} · {pattern.motif}
              </span>
              <span className="cc-wm" aria-hidden>
                {pattern.kind.slice(0, 1)}
              </span>
            </button>
          ))}
        </div>

        <div className="design-layout">
          <div className="preview-panel">
            <p className="label">PREVIEW · {selected.kind}</p>
            <h3>{selected.name}</h3>
            <p className="lat-it" style={{ marginTop: 6 }}>
              {kindLat[selected.kind]}
            </p>
            <div className="swatch-row" aria-label="配色">
              {selected.palette.map((color) => (
                <span key={color} className="swatch" style={{ background: color }} title={color} />
              ))}
            </div>
            <div className="carrier-row">
              {carriers.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip${carrier === item ? ' on' : ''}`}
                  onClick={() => onSelectCarrier(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="preview-meta">{selected.meaning}</p>
            <div className="hero-cta" style={{ marginTop: 20 }}>
              <button type="button" className="btn primary" onClick={onAskAgent}>
                一键生成衍生方案
              </button>
            </div>
          </div>

          <div className="mock-product" aria-label={`${carrier}衍生预览`}>
            <div className="fabric" style={fabricStyle(selected)} />
            <div className="frame">
              <span>
                {carrier} · 衍生稿
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
