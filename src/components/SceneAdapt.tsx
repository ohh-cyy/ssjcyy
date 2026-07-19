type SceneAdaptProps = {
  ready: boolean
  onSimulate: () => void
}

export function SceneAdapt({ ready, onSimulate }: SceneAdaptProps) {
  return (
    <section className="home-sec" id="scene">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Feature 03</span>
          <h2>织锦场景智能适配</h2>
          <span className="lat-it">Scene-aware pattern matching</span>
          <p className="desc">
            拍摄汉服、礼盒、家居配饰等实物，识别场景属性并匹配四大名锦方案，生成实景贴合预览，支持二次微调。
          </p>
        </div>

        <div className="scene-grid">
          <button
            type="button"
            className={`upload-zone${ready ? ' on' : ''}`}
            onClick={onSimulate}
          >
            <div>
              <h3>{ready ? '已识别：礼盒场景' : '上传实物照片'}</h3>
              <p>
                {ready
                  ? '检测到礼盒立面与暖色环境光，推荐云锦宝相花 / 蜀锦团花。'
                  : '点击模拟拍摄汉服、礼盒或帆布包，体验智能匹配流程。'}
              </p>
            </div>
          </button>

          <div className="adapt-result">
            <h3>{ready ? '适配方案' : '等待识别'}</h3>
            {ready ? (
              <ul className="adapt-list">
                <li>主推：云锦 · 宝相花 — 典礼礼盒、金线勾边、庄重华贵</li>
                <li>备选：蜀锦 · 团花缠枝 — 喜庆圆满，适合节庆礼赠</li>
                <li>可编辑：面料肌理、纹样缩放、色温微调、多锦混搭</li>
              </ul>
            ) : (
              <p className="meta" style={{ margin: 0, lineHeight: 1.8 }}>
                识别完成后，将在此展示锦种方案与实景贴合预览入口。二次编辑能力将在下一阶段接入画布。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
