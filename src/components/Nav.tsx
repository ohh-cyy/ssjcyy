type NavProps = {
  onOpenAgent: () => void
}

export function Nav({ onOpenAgent }: NavProps) {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <strong>锦绣千年</strong>
        <span>JINXIU</span>
      </a>
      <nav className="nav-links" aria-label="主导航">
        <a href="#design">衍生设计</a>
        <a href="#timeline">时间长廊</a>
        <a href="#scene">场景适配</a>
      </nav>
      <button type="button" className="nav-cta" onClick={onOpenAgent}>
        唤起锦绣 Agent
      </button>
    </header>
  )
}
