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

function fabricStyle(pattern: PatternGene) {
  const [a, b, c] = pattern.palette
  return {
    background: `
      radial-gradient(circle at 30% 30%, ${c}55, transparent 35%),
      radial-gradient(circle at 70% 60%, ${b}66, transparent 40%),
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
    <section className="section" id="design">
      <div className="section-head">
        <p className="label">FEATURE 01</p>
        <h2>锦绣纹样 AIGC 衍生设计</h2>
        <p className="desc">
          依托纹样基因库，选取四大名锦经典纹样，一键生成适配手机壳、汉服、礼盒、帆布包的国风衍生图。
        </p>
      </div>

      <div className="design-layout">
        <div className="pattern-rail" role="list">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              type="button"
              role="listitem"
              className={`pattern-item${selected.id === pattern.id ? ' active' : ''}`}
              onClick={() => onSelectPattern(pattern)}
            >
              <div className="top">
                <span className="name">{pattern.name}</span>
                <span className="kind">{pattern.kind}</span>
              </div>
              <div className="motif">{pattern.motif}</div>
            </button>
          ))}
        </div>

        <div className="preview-panel">
          <p className="label" style={{ margin: 0, letterSpacing: '0.18em', color: 'var(--gold)', fontSize: '0.78rem' }}>
            预览 · {selected.kind}
          </p>
          <h3 style={{ margin: '0.55rem 0 0', fontFamily: 'var(--display)', fontWeight: 400, fontSize: '1.8rem' }}>
            {selected.name}
          </h3>
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
                className={`chip${carrier === item ? ' active' : ''}`}
                onClick={() => onSelectCarrier(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mock-product" aria-label={`${carrier}衍生预览`}>
            <div className="fabric" style={fabricStyle(selected)} />
            <div className="frame">
              <span>{carrier} · 衍生稿</span>
            </div>
          </div>

          <p className="preview-meta">{selected.meaning}</p>
          <div className="hero-actions" style={{ marginTop: '1.2rem' }}>
            <button type="button" className="btn btn-primary" onClick={onAskAgent}>
              一键生成衍生方案
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
