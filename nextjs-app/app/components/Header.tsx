'use client'

import { useState, useEffect } from 'react'
import { Icon } from './Icon'
import { REVIEWS } from '../data'

export const Header = ({ tab, onTab }: { tab: string; onTab: (t: string) => void }) => (
  <>
    <div className="utility">
      <div className="shell utility-row">
        <div className="utility-left">
          <span>고립·은둔청년 통합 정보 플랫폼</span>
          <span className="sep" />
          <span>운영시간 평일 10:00–18:00</span>
        </div>
        <div className="utility-right">
          <a>도움말</a><span className="sep" /><a>1:1 문의</a><span className="sep" /><a>로그인</a><span className="sep" /><a>회원가입</a>
        </div>
      </div>
    </div>
    <header className="hdr">
      <div className="shell hdr-row">
        <button className="brand" onClick={() => onTab('home')}>
          <div className="brand-logo">나와나왕</div>
          <div className="brand-sub">고립·은둔청년<br />통합 정보 플랫폼</div>
        </button>
        <nav className="tabs">
          <button className={`tab${tab === 'home' ? ' active' : ''}`} onClick={() => onTab('home')}>지원사업 검색</button>
          <button className={`tab${tab === 'my' ? ' active' : ''}`} onClick={() => onTab('my')}>내 스크랩</button>
        </nav>
        <div className="hdr-actions">
          <button className="icon-btn" aria-label="검색"><Icon name="search" size={18} /></button>
          <button className="icon-btn" aria-label="알림"><Icon name="bell" size={18} /></button>
          <button className="avatar" onClick={() => onTab('my')}>지</button>
        </div>
      </div>
    </header>
  </>
)

export const Crumb = ({ trail }: { trail: string[] }) => (
  <div className="crumb">
    <span style={{ display: 'inline-grid', placeItems: 'center' }}><Icon name="home" size={12} /></span>
    {trail.map((t, i) => (
      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="chev-right" size={10} />
        <span className={i === trail.length - 1 ? 'here' : ''}>{t}</span>
      </span>
    ))}
  </div>
)

export const ReviewStrip = () => {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false)
      setTimeout(() => { setI(x => (x + 1) % REVIEWS.length); setShow(true) }, 350)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const r = REVIEWS[i]

  const prev = () => { setShow(false); setTimeout(() => { setI(x => (x - 1 + REVIEWS.length) % REVIEWS.length); setShow(true) }, 200) }
  const next = () => { setShow(false); setTimeout(() => { setI(x => (x + 1) % REVIEWS.length); setShow(true) }, 200) }

  return (
    <div className="review-strip">
      <span className="review-strip-label">참여 후기</span>
      <div className="review-strip-text" style={{ opacity: show ? 1 : 0 }}>
        &ldquo;{r.body}&rdquo; — <strong>{r.program}</strong>
      </div>
      <span className="review-strip-meta">{r.handle} · {r.weeks}</span>
      <div className="review-strip-nav">
        <button onClick={prev} aria-label="이전"><Icon name="chev-left" size={13} /></button>
        <button onClick={next} aria-label="다음"><Icon name="chev-right" size={13} /></button>
      </div>
    </div>
  )
}
