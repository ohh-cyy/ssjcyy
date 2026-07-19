import { pages, type PageId } from '../routing'

type NavProps = {
  page: PageId
  onNavigate: (page: PageId) => void
  onOpenAgent: () => void
}

export function Nav({ page, onNavigate, onOpenAgent }: NavProps) {
  const isHome = page === 'home'

  return (
    <header className={`site-nav${isHome ? ' on-home' : ''}`}>
      <div className="site-nav-inner">
        <button type="button" className="nav-brand" onClick={() => onNavigate('home')}>
          <strong>锦绣千年</strong>
          <span>Jīnxiù</span>
        </button>

        <nav className="nav-links" aria-label="主导航">
          {pages.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link${page === item.id ? ' on' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="nav-agent" onClick={onOpenAgent}>
          锦绣 Agent
        </button>
      </div>
    </header>
  )
}
