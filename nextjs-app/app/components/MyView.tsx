'use client'

import { useState } from 'react'
import { Crumb } from './Header'
import { PROGRAMS } from '../data'

const POSTER_COLORS = ['poster-yellow', 'poster-pink', 'poster-mint', 'poster-orange', 'poster-lilac', 'poster-cream']
const posterColor = (id: string) => POSTER_COLORS[(id.charCodeAt(1) + parseInt(id.slice(1), 10)) % POSTER_COLORS.length]

export const MyView = ({ onOpen }: { onOpen: (id: string) => void }) => {
  const [tab, setTab] = useState('saved')

  const saved = PROGRAMS.slice(0, 3)
  const applied = [
    { p: PROGRAMS[0], state: '서류 검토 중', badge: 'badge-applied', date: '2026.04.22 신청' },
    { p: PROGRAMS[2], state: '참여 확정', badge: 'badge-progress', date: '시작 5월 20일' },
  ]
  const done = [{ p: PROGRAMS[6], state: '6주 수료', badge: 'badge-done', date: '2026.03.14 수료' }]

  return (
    <main className="shell">
      <Crumb trail={['내 스크랩']} />
      <div style={{ display: 'flex', alignItems: 'flex-end', padding: '20px 0 28px', borderBottom: '1px solid var(--line)', marginBottom: 0 }}>
        <div>
          <div className="page-eyebrow">마이페이지</div>
          <h1 className="page-title">내 스크랩</h1>
        </div>
      </div>

      <div className="my-grid" style={{ marginTop: 24 }}>
        <aside className="profile-card">
          <div className="profile-avatar">지</div>
          <div className="profile-name">지원님</div>
          <div className="profile-handle">@quietly_2026 · 만 26세</div>
          <div className="profile-stats">
            <div className="profile-stat"><div className="profile-stat-num">3</div><div className="profile-stat-lbl">스크랩</div></div>
            <div className="profile-stat"><div className="profile-stat-num">2</div><div className="profile-stat-lbl">신청</div></div>
            <div className="profile-stat"><div className="profile-stat-num">1</div><div className="profile-stat-lbl">수료</div></div>
          </div>
          <div style={{ marginTop: 14, padding: 10, background: 'var(--bg-soft)', borderRadius: 4, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55, textAlign: 'left', border: '1px solid var(--line)' }}>
            <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 3 }}>담당 매니저 · 윤서연</strong>
            평일 10:00–18:00 · 1:1 채팅
          </div>
          <button className="btn btn-ghost" style={{ marginTop: 10 }}>매니저에게 메시지</button>
        </aside>

        <section>
          <div className="tabs-sub">
            <button className={`tab-sub${tab === 'saved' ? ' active' : ''}`} onClick={() => setTab('saved')}>스크랩한 사업 · 3</button>
            <button className={`tab-sub${tab === 'applied' ? ' active' : ''}`} onClick={() => setTab('applied')}>신청 · 진행 · 2</button>
            <button className={`tab-sub${tab === 'done' ? ' active' : ''}`} onClick={() => setTab('done')}>수료 · 1</button>
          </div>

          <div className="my-list">
            {tab === 'saved' && saved.map(p => (
              <div key={p.id} className="my-item">
                <div className={`list-thumb ${posterColor(p.id)}`}>{p.title.slice(0, 1)}</div>
                <div><div className="list-title">{p.title}</div><div className="list-org">{p.org} · 마감 {p.deadline}</div></div>
                <span className="badge badge-applied">스크랩됨</span>
                <button className="btn btn-ghost" style={{ width: 'auto', height: 32, padding: '0 12px', fontSize: 12 }} onClick={() => onOpen(p.id)}>자세히</button>
              </div>
            ))}
            {tab === 'applied' && applied.map(({ p, state, badge, date }) => (
              <div key={p.id} className="my-item">
                <div className={`list-thumb ${posterColor(p.id)}`}>{p.title.slice(0, 1)}</div>
                <div><div className="list-title">{p.title}</div><div className="list-org">{p.org} · {date}</div></div>
                <span className={`badge ${badge}`}>{state}</span>
                <button className="btn btn-ghost" style={{ width: 'auto', height: 32, padding: '0 12px', fontSize: 12 }} onClick={() => onOpen(p.id)}>상세</button>
              </div>
            ))}
            {tab === 'done' && done.map(({ p, state, badge, date }) => (
              <div key={p.id} className="my-item">
                <div className={`list-thumb ${posterColor(p.id)}`}>{p.title.slice(0, 1)}</div>
                <div><div className="list-title">{p.title}</div><div className="list-org">{p.org} · {date}</div></div>
                <span className={`badge ${badge}`}>{state}</span>
                <button className="btn btn-ghost" style={{ width: 'auto', height: 32, padding: '0 12px', fontSize: 12 }}>후기 작성</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
