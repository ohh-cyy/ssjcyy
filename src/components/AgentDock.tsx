import { useEffect, useRef, useState } from 'react'
import type { ChatMessage } from '../data'

type AgentDockProps = {
  open: boolean
  messages: ChatMessage[]
  onToggle: () => void
  onSend: (text: string) => void
}

const suggestions = ['用宋锦做手机壳', '讲讲汉代蜀锦', '帮我做场景适配', '汉服配哪种锦']

export function AgentDock({ open, messages, onToggle, onSend }: AgentDockProps) {
  const [draft, setDraft] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function submit() {
    onSend(draft)
    setDraft('')
  }

  return (
    <div className="agent-dock">
      {open && (
        <div className="agent-panel" role="dialog" aria-label="锦绣 Agent">
          <div className="agent-head">
            <strong>锦绣 Agent</strong>
            <button type="button" onClick={onToggle} aria-label="收起">
              收起
            </button>
          </div>
          <div className="agent-body" ref={bodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`bubble ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="agent-suggest">
            {suggestions.map((item) => (
              <button key={item} type="button" onClick={() => onSend(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="agent-input">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
              placeholder="问问锦绣…"
              aria-label="对话输入"
            />
            <button type="button" onClick={submit}>
              发送
            </button>
          </div>
        </div>
      )}
      <button type="button" className="agent-toggle" onClick={onToggle}>
        {open ? '收起锦绣' : '锦绣 Agent'}
      </button>
    </div>
  )
}
