import type { TimelineNode } from '../data'

type TimelineGalleryProps = {
  nodes: TimelineNode[]
  onAsk: (era: string) => void
}

export function TimelineGallery({ nodes, onAsk }: TimelineGalleryProps) {
  return (
    <section className="home-sec" id="timeline">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Feature 02</span>
          <h2>千年织锦时间线数字长廊</h2>
          <span className="lat-it">A timeline of brocade across dynasties</span>
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
              <button type="button" className="link-more" onClick={() => onAsk(node.era)}>
                请锦绣讲解此段 →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
