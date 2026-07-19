import { useMemo, useState } from 'react'
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
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { SceneAdapt } from './components/SceneAdapt'
import { TimelineGallery } from './components/TimelineGallery'

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
  const [selectedPattern, setSelectedPattern] = useState<PatternGene>(patterns[0])
  const [carrier, setCarrier] = useState<Carrier>('手机壳')
  const [sceneReady, setSceneReady] = useState(false)
  const [agentOpen, setAgentOpen] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      text: agentReplies.default,
    },
  ])

  const carriers = useMemo(
    () => selectedPattern.carriers,
    [selectedPattern],
  )

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
      const song = patterns.find((p) => p.kind === '宋锦')
      if (song) {
        setSelectedPattern(song)
        setCarrier('手机壳')
      }
    }
    if (/云锦|宝相/.test(trimmed)) {
      const yun = patterns.find((p) => p.kind === '云锦')
      if (yun) {
        setSelectedPattern(yun)
        setCarrier('汉服')
      }
    }
    if (/场景|上传|贴合/.test(trimmed)) {
      setSceneReady(true)
    }
  }

  return (
    <div className="site">
      <div className="ambient" aria-hidden />
      <Nav onOpenAgent={() => setAgentOpen(true)} />
      <main className="main">
        <Hero onTalk={() => setAgentOpen(true)} onDesign={() => {
          document.getElementById('design')?.scrollIntoView({ behavior: 'smooth' })
        }} />
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
          onAskAgent={() => sendMessage(`用${selectedPattern.kind}${selectedPattern.name}做${carrier}`)}
        />
        <TimelineGallery nodes={timeline} onAsk={(era) => sendMessage(`讲讲${era}织锦`)} />
        <SceneAdapt
          ready={sceneReady}
          onSimulate={() => {
            setSceneReady(true)
            sendMessage('帮我做场景智能适配')
          }}
        />
      </main>
      <footer className="footer">
        <div>
          <strong>锦绣千年</strong>
          <span> · 织锦智慧创意平台雏形</span>
        </div>
        <div>可对接小艺开放平台 Agent · 四大名锦知识库</div>
      </footer>
      <AgentDock
        open={agentOpen}
        messages={messages}
        onToggle={() => setAgentOpen((v) => !v)}
        onSend={sendMessage}
      />
    </div>
  )
}
