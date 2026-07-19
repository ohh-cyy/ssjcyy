type HomePageProps = {
  onNavigate: (page: 'design' | 'timeline' | 'scene') => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section className="landing" aria-label="锦绣千年首页">
      <img
        className="landing-bg"
        src="/hero-home.png"
        alt="锦绣千年 · 四大名锦东方织造"
      />
      <div className="landing-veil" aria-hidden />

      <div className="landing-body">
        <h1 className="sr-only">锦绣千年</h1>
        <p className="sr-only">四大名锦 东方织造</p>

        <nav className="landing-links" aria-label="功能入口">
          <button type="button" onClick={() => onNavigate('design')}>
            衍生设计
          </button>
          <button type="button" onClick={() => onNavigate('timeline')}>
            时间长廊
          </button>
          <button type="button" onClick={() => onNavigate('scene')}>
            场景适配
          </button>
        </nav>
      </div>
    </section>
  )
}
