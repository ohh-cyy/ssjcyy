import { useEffect, useMemo, useState } from 'react'
import {
  agentReplies,
  patterns,
  timeline,
  type Carrier,
  type ChatMessage,
  type PatternGene,
} from './data'
import { AgentDock } from './components/AgentDock'
import { DesignStudio } from './components/DesignStudio'
import { HomePage } from './components/HomePage'
import { Nav } from './components/Nav'
import { SceneAdapt } from './components/SceneAdapt'
import { TimelineGallery } from './components/TimelineGallery'
import { parseHash, setHash, type PageId } from './routing'

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function replyFor(text: string) {
  if (/手机壳|壳/.test(text)) return agentReplies['手机壳']
  if (/汉服|服饰/.test(text)) return agentReplies['汉服']
  if (/时间|历史|朝代|千年/.test(text)) return agentReplies['时间']
  if (/场景|拍摄|上传|贴合|礼盒|家居/.test(text)) return agentReplies['场景']
  return agentReplies.default
}

export default function App() {
  const [page, setPage] = useState<PageId>(() =>
    typeof window === 'undefined' ? 'home' : parseHash(),
  )
  const [selectedPattern, setSelectedPattern] = useState<PatternGene>(patterns[0])
  const [carrier, setCarrier] = useState<Carrier>('手机壳')
  const [sceneReady, setSceneReady] = useState(false)
  const [agentOpen, setAgentOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      text: agentReplies.default,
    },
  ])

  const carriers = useMemo(() => selectedPattern.carriers, [selectedPattern])

  useEffect(() => {
    const onHash = () => setPage(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  function navigate(next: PageId) {
    setPage(next)
    setHash(next)
  }

  function selectKind(kind: PatternGene['kind']) {
    const found = patterns.find((p) => p.kind === kind)
    if (found) {
      setSelectedPattern(found)
      setCarrier(found.carriers[0])
    }
  }

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = { id: createId(), role: 'user', text: trimmed }
    const agentMsg: ChatMessage = {
      id: createId(),
      role: 'agent',
      text: replyFor(trimmed),
    }
    setMessages((prev) => [...prev, userMsg, agentMsg])
    setAgentOpen(true)

    if (/宋锦|万字/.test(trimmed)) {
      selectKind('宋锦')
      navigate('design')
    }
    if (/云锦|宝相/.test(trimmed)) {
      selectKind('云锦')
      navigate('design')
    }
    if (/蜀锦|团花/.test(trimmed)) {
      selectKind('蜀锦')
      navigate('design')
    }
    if (/壮锦/.test(trimmed)) {
      selectKind('壮锦')
      navigate('design')
    }
    if (/时间|历史|朝代|千年/.test(trimmed)) {
      navigate('timeline')
    }
    if (/场景|上传|贴合/.test(trimmed)) {
      setSceneReady(true)
      navigate('scene')
    }
  }

  return (
    <div className={`site${page === 'home' ? ' is-home' : ' is-page'}`}>
      <Nav page={page} onNavigate={navigate} onOpenAgent={() => setAgentOpen(true)} />

      <main>
        {page === 'home' && <HomePage onNavigate={(next) => navigate(next)} />}

        {page === 'design' && (
          <DesignStudio
            patterns={patterns}
            selected={selectedPattern}
            carrier={carrier}
            carriers={carriers}
            onSelectPattern={(pattern) => {
              setSelectedPattern(pattern)
              if (!pattern.carriers.includes(carrier)) {
                setCarrier(pattern.carriers[0])
              }
            }}
            onSelectCarrier={setCarrier}
            onAskAgent={() =>
              sendMessage(`用${selectedPattern.kind}${selectedPattern.name}做${carrier}`)
            }
          />
        )}

        {page === 'timeline' && (
          <TimelineGallery
            nodes={timeline}
            onAsk={(era) => sendMessage(`讲讲${era}织锦`)}
          />
        )}

        {page === 'scene' && (
          <SceneAdapt
            ready={sceneReady}
            onSimulate={() => {
              setSceneReady(true)
              sendMessage('帮我做场景智能适配')
            }}
          />
        )}
      </main>

      {page !== 'home' && (
        <footer className="site-foot">
          <div className="wrap row">
            <div>
              <strong>锦绣千年</strong>
              <span> · 织锦智慧创意平台雏形</span>
            </div>
            <button type="button" className="link-more" onClick={() => navigate('home')}>
              返回首页 →
            </button>
          </div>
        </footer>
      )}

      <AgentDock
        open={agentOpen}
        messages={messages}
        onToggle={() => setAgentOpen((v) => !v)}
        onSend={sendMessage}
      />
    </div>
  )
}
