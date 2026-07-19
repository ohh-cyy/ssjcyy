import type { TimelineNode } from '../data'

type TimelineGalleryProps = {
  nodes: TimelineNode[]
  onAsk: (era: string) => void
}

export function TimelineGallery({ nodes, onAsk }: TimelineGalleryProps) {
  return (
    <section className="section" id="timeline">
      <div className="section-head">
        <p className="label">FEATURE 02</p>
        <h2>千年织锦时间线数字长廊</h2>
        <p className="desc">
          从汉代蜀锦起源，到明清云锦、宋锦鼎盛，再到当代壮锦民俗传承。Agent 可按偏好推送对应朝代。
        </p>
      </div>

      <div className="timeline">
        {nodes.map((node) => (
          <article key={node.id} className="timeline-node">
            <p className="era">
              {node.era} · {node.kind}
            </p>
            <h3>{node.title}</h3>
            <p className="year">{node.year}</p>
            <p className="summary">{node.summary}</p>
            <div className="hero-actions" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn btn-ghost" onClick={() => onAsk(node.era)}>
                请锦绣讲解此段
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
