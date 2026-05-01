'use client'

import { useState, useEffect } from 'react'
import { Icon } from './Icon'
import { ReviewStrip } from './Header'
import { PROGRAMS, FILTER_DEFS, type Program } from '../data'

const POSTER_COLORS = ['poster-yellow', 'poster-pink', 'poster-mint', 'poster-orange', 'poster-lilac', 'poster-cream']
const posterColor = (id: string) => POSTER_COLORS[(id.charCodeAt(1) + parseInt(id.slice(1), 10)) % POSTER_COLORS.length]
const statusClass = (s: string) => s === '현재 신청 가능' ? 'live' : s === '모집 예정' ? 'soon' : 'closed'
const daysLeft = (d: string) => Math.max(1, Math.round((new Date(d.replace(/\./g, '-')).getTime() - Date.now()) / 86400000))

const Poster = ({ p, color }: { p: Program; color: string }) => (
  <div className={`poster ${color}`}>
    <div className="poster-deco">
      <svg viewBox="0 0 280 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="240" cy="160" r="60" fill="rgba(0,0,0,0.06)" />
        <circle cx="40" cy="40" r="22" fill="rgba(255,255,255,0.45)" />
        <path d="M 0 180 Q 70 155 140 180 T 280 180 L 280 200 L 0 200 Z" fill="rgba(255,255,255,0.35)" />
      </svg>
    </div>
    <div className="poster-eyebrow">{p.tag}</div>
    <div className="poster-headline">{p.title}</div>
    <div className="poster-foot">
      <span>{p.org}</span>
      <span className="badge-recruit">모집 중</span>
    </div>
    {p.status === '현재 신청 가능' && <span className="poster-stamp brand">D-{daysLeft(p.deadline)}</span>}
    {p.status === '모집 예정' && <span className="poster-stamp">곧 오픈</span>}
    {p.status === '마감' && <span className="poster-stamp">마감</span>}
  </div>
)

const ProgramCard = ({ p, onOpen, isBookmarked, onBookmark }: {
  p: Program; onOpen: (id: string) => void
  isBookmarked: boolean; onBookmark: (id: string, e: React.MouseEvent) => void
}) => (
  <div className="pcard" style={{ position: 'relative' }}>
    <button
      onClick={e => onBookmark(p.id, e)}
      style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, color: isBookmarked ? 'var(--brand)' : 'var(--ink-3)', transition: 'all .15s', cursor: 'pointer' }}
      title={isBookmarked ? '스크랩 취소' : '스크랩'}
    >
      <Icon name="bookmark" size={14} />
    </button>
    <div onClick={() => onOpen(p.id)} style={{ cursor: 'pointer', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Poster p={p} color={posterColor(p.id)} />
      <div className="pcard-body">
        <div className="pcard-tags">
          <span className={`tag ${statusClass(p.status)}`}>{p.status}</span>
          <span className="tag">{p.region}</span>
          <span className="tag">{p.mode}</span>
        </div>
        <div className="pcard-title">{p.title}</div>
        <div className="pcard-org">{p.org}</div>
        <div className="pcard-foot">
          <span><strong>{p.duration}</strong></span>
          <span>마감 <strong>{p.deadline}</strong></span>
        </div>
      </div>
    </div>
  </div>
)

const ProgramListRow = ({ p, head, isBookmarked, onBookmark, onOpen }: {
  p?: Program; head?: boolean
  isBookmarked?: boolean; onBookmark?: (id: string, e: React.MouseEvent) => void
  onOpen?: (id: string) => void
}) => {
  if (head) return (
    <div className="list-row head" style={{ gridTemplateColumns: '64px 1.6fr 1fr 100px 100px 100px 44px' }}>
      <span /><span>사업명 / 기관</span><span>참여 동기</span><span>지역 · 형태</span><span>모집 상태</span><span>마감일</span><span />
    </div>
  )
  if (!p || !onBookmark || !onOpen) return null
  return (
    <div className="list-row" style={{ gridTemplateColumns: '64px 1.6fr 1fr 100px 100px 100px 44px' }}>
      <button onClick={() => onOpen(p.id)} style={{ display: 'contents', cursor: 'pointer', background: 'none', border: 'none' }}>
        <div className={`list-thumb ${posterColor(p.id)}`}>{p.title.slice(0, 1)}</div>
        <div><div className="list-title">{p.title}</div><div className="list-org">{p.org}</div></div>
        <div className="list-cell">{p.motive.join(', ')}</div>
        <div className="list-cell">{p.region} · {p.mode}</div>
        <div><span className={`tag ${statusClass(p.status)}`}>{p.status}</span></div>
        <div className="list-cell" style={{ fontWeight: 700 }}>{p.deadline}</div>
      </button>
      <button
        onClick={e => onBookmark(p.id, e)}
        style={{ width: 30, height: 30, borderRadius: '50%', background: 'transparent', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isBookmarked ? 'var(--brand)' : 'var(--ink-3)', margin: 'auto', cursor: 'pointer' }}
      >
        <Icon name="bookmark" size={13} />
      </button>
    </div>
  )
}

type Filters = { region: string[]; motive: string[]; mode: string[]; period: string[]; status: string[] }

export const HomeView = ({ onOpen }: { onOpen: (id: string) => void }) => {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState<Filters>({ region: [], motive: [], mode: [], period: [], status: [] })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState('grid')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const toggleFilter = (key: string, val: string) => {
    setFilters(f => {
      const cur = f[key as keyof Filters]
      return { ...f, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] }
    })
  }
  const reset = () => setFilters({ region: [], motive: [], mode: [], period: [], status: [] })
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setBookmarked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const filtered = PROGRAMS.filter(p => {
    if (q && !(p.title.includes(q) || p.org.includes(q) || p.summary.includes(q))) return false
    if (filters.region.length > 0 && !filters.region.includes(p.region)) return false
    if (filters.motive.length > 0 && !filters.motive.some(m => p.motive.includes(m))) return false
    if (filters.mode.length > 0 && !filters.mode.includes(p.mode)) return false
    if (filters.period.length > 0 && !filters.period.includes(p.period)) return false
    if (filters.status.length > 0 && !filters.status.includes(p.status)) return false
    return true
  })

  const activeChips = Object.entries(filters).flatMap(([k, v]) => v.map(item => ({ k, v: item })))

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.dropdown')) setOpenDropdown(null)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <main className="shell" style={{ paddingTop: 20, paddingBottom: 36 }}>
      <div className="banner-ad">
        <div>
          <div className="banner-label">특별 안내</div>
          <h2 className="banner-title">2026년 청년 자립 지원 프로그램 모집</h2>
          <p className="banner-text">고립·은둔청년을 위한 맞춤형 지원 프로그램이 시작됩니다. 주거, 일자리, 심리상담까지 종합 지원</p>
          <button className="banner-btn">자세히 보기 <Icon name="arrow-up-right" size={13} /></button>
        </div>
        <div style={{ opacity: 0.7 }}>
          <svg width="160" height="130" viewBox="0 0 200 160" fill="none">
            <circle cx="100" cy="80" r="60" fill="rgba(37,99,235,0.1)" />
            <circle cx="140" cy="50" r="30" fill="rgba(37,99,235,0.15)" />
            <circle cx="60" cy="110" r="40" fill="rgba(37,99,235,0.08)" />
            <circle cx="100" cy="80" r="5" fill="#2563eb" />
          </svg>
        </div>
      </div>

      <ReviewStrip />

      <div style={{ paddingBottom: 16 }}>
        <div className="page-eyebrow">고립 은둔 예방</div>
        <h1 className="page-title">지원사업 검색</h1>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--line-2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)', cursor: 'pointer' }} title="초기화">
            <Icon name="reset" size={15} />
          </button>
          {FILTER_DEFS.map(f => {
            const fv = filters[f.key as keyof Filters]
            const isActive = fv.length > 0
            const isOpen = openDropdown === f.key
            return (
              <div key={f.key} className="dropdown">
                <button className={`dd-btn${isActive ? ' active' : ''}`} onClick={() => setOpenDropdown(isOpen ? null : f.key)}>
                  {isActive ? `${f.label} (${fv.length})` : f.label} <Icon name="chev-down" size={11} />
                </button>
                {isOpen && (
                  <div className="dd-panel">
                    {f.options.filter(o => !['전체', '상관없어요'].includes(o)).map(opt => (
                      <label key={opt} className="dd-opt" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="checkbox" checked={fv.includes(opt)} onChange={() => toggleFilter(f.key, opt)} style={{ accentColor: 'var(--brand)', cursor: 'pointer' }} />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="search-input" value={q} onChange={e => setQ(e.target.value)} placeholder="사업명, 기관명으로 검색..." />
          <button className="search-btn"><Icon name="search" size={13} /> 검색</button>
        </div>
      </div>

      <div className="result-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>전체 <strong>{filtered.length}</strong>건</span>
          {activeChips.length > 0 && (
            <div className="active-chips">
              {activeChips.map(({ k, v }, idx) => (
                <span key={`${k}-${v}-${idx}`} className="active-chip">
                  {v}
                  <button onClick={() => toggleFilter(k, v)}><Icon name="x" size={9} /></button>
                </span>
              ))}
              <button className="reset-btn" onClick={reset}><Icon name="reset" size={10} /> 초기화</button>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select className="sort-select" defaultValue="deadline">
            <option value="deadline">마감 임박순</option>
            <option value="latest">최신 등록순</option>
          </select>
          <div className="toggle-group">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Icon name="grid" size={11} /> 카드</button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><Icon name="list" size={11} /> 리스트</button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><div className="empty-title">조건에 맞는 사업이 없어요</div><div>필터를 줄이거나, 검색어를 다시 확인해 주세요.</div></div>
      ) : viewMode === 'grid' ? (
        <div className="cards">
          {filtered.map(p => <ProgramCard key={p.id} p={p} onOpen={onOpen} isBookmarked={bookmarked.has(p.id)} onBookmark={toggleBookmark} />)}
        </div>
      ) : (
        <div className="list">
          <ProgramListRow head />
          {filtered.map(p => <ProgramListRow key={p.id} p={p} onOpen={onOpen} isBookmarked={bookmarked.has(p.id)} onBookmark={toggleBookmark} />)}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="pagination">
          <button className="page-btn icon"><Icon name="chev-left" size={13} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn icon"><Icon name="chev-right" size={13} /></button>
        </div>
      )}
    </main>
  )
}
