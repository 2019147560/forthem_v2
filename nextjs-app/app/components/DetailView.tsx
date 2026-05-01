'use client'

import { Icon } from './Icon'
import { Crumb } from './Header'
import { PROGRAMS } from '../data'

const POSTER_COLORS = ['poster-yellow', 'poster-pink', 'poster-mint', 'poster-orange', 'poster-lilac', 'poster-cream']
const posterColor = (id: string) => POSTER_COLORS[(id.charCodeAt(1) + parseInt(id.slice(1), 10)) % POSTER_COLORS.length]
const statusClass = (s: string) => s === '현재 신청 가능' ? 'live' : s === '모집 예정' ? 'soon' : 'closed'

export const DetailView = ({ id, onBack, onApply }: { id: string; onBack: () => void; onApply: (id: string) => void }) => {
  const p = PROGRAMS.find(x => x.id === id)
  if (!p) return null

  const sc = statusClass(p.status)
  const pct = Math.round(((p.spots - p.spotsLeft) / p.spots) * 100)

  return (
    <main className="shell">
      <Crumb trail={['고립 은둔 예방', '지원사업 검색', p.title]} />
      <button className="back" onClick={onBack}><Icon name="chev-left" size={13} /> 사업 목록으로</button>

      <section className="detail-head">
        <div className="detail-tags">
          <span className={`tag ${sc}`}>{p.status}</span>
          <span className="tag">{p.region}</span>
          <span className="tag">{p.mode}</span>
          <span className="tag">{p.tag}</span>
        </div>
        <h1 className="detail-title">{p.title}</h1>
        <p className="detail-sub">{p.summary}</p>
      </section>

      <div className="detail-grid">
        <div>
          <div className="info-table">
            <div className="info-row">
              <div className="info-k">주관 기관</div><div className="info-v">{p.org}</div>
              <div className="info-k">진행 지역</div><div className="info-v">{p.region}</div>
            </div>
            <div className="info-row">
              <div className="info-k">진행 형태</div><div className="info-v">{p.mode}</div>
              <div className="info-k">참여 기간</div><div className="info-v">{p.duration}</div>
            </div>
            <div className="info-row">
              <div className="info-k">신청 마감</div><div className="info-v" style={{ fontWeight: 700 }}>{p.deadline}</div>
              <div className="info-k">모집 인원</div><div className="info-v">{p.spots}명</div>
            </div>
          </div>

          <h2 className="detail-h">프로그램 소개</h2>
          <p className="detail-body">{p.detail}</p>

          <h2 className="detail-h" style={{ marginTop: 32 }}>신청자격</h2>
          <p className="detail-body">{p.qualificationDetail || '만 19~34세 고립·은둔 청년으로, 프로그램 참여를 희망하는 분이라면 누구나 신청 가능합니다.'}</p>

          <h2 className="detail-h" style={{ marginTop: 32 }}>사업 커리큘럼</h2>
          {p.curriculum && p.curriculum.length > 0 ? (
            <div style={{ position: 'relative', paddingLeft: 36, marginTop: 20 }}>
              <div style={{ position: 'absolute', left: 11, top: 10, bottom: 10, width: 2, background: 'var(--line-2)' }} />
              {p.curriculum.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < p.curriculum!.length - 1 ? 20 : 0 }}>
                  <div style={{ position: 'absolute', left: -21, top: 4, width: 10, height: 10, borderRadius: '50%', background: 'var(--brand)', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--line-2)' }} />
                  <div style={{ padding: '10px 14px', background: '#fff', border: '1px solid var(--line)', borderRadius: 7 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand)', marginBottom: 4 }}>{item.week}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 7, marginTop: 14, border: '1px solid var(--line)' }}>
              <ul style={{ paddingLeft: 18 }}>
                {p.bullets.map((b, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: 6 }}>{b}</li>)}
              </ul>
            </div>
          )}
        </div>

        <aside>
          <div className="apply-card">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 12 }}>신청 안내</div>
            <div className="apply-row"><span className="apply-row-k">기간</span><span className="apply-row-v">{p.duration}</span></div>
            <div className="apply-row"><span className="apply-row-k">형태</span><span className="apply-row-v">{p.mode}</span></div>
            <div className="apply-row"><span className="apply-row-k">마감</span><span className="apply-row-v" style={{ color: 'var(--danger)' }}>{p.deadline}</span></div>
            <div className="apply-row"><span className="apply-row-k">잔여</span><span className="apply-row-v">{p.spotsLeft}/{p.spots}명</span></div>
            <div className="spots-bar"><div className="spots-bar-fill" style={{ width: `${pct}%` }} /></div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 16 }}>{p.spots - p.spotsLeft}명 신청 완료</div>
            <div className="btn-row" style={{ flexDirection: 'column' }}>
              <button className="btn btn-primary" disabled={p.status === '마감'} onClick={() => p.status !== '마감' && onApply(p.id)}>
                {p.status === '마감' ? '모집 마감' : '신청하기'}
              </button>
              <button className="btn btn-ghost">스크랩</button>
            </div>
            {p.contact && (
              <div className="contact-block">
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.04em', marginBottom: 8 }}>문의</div>
                {p.contact.phone && <div className="contact-item"><Icon name="phone" size={13} /> {p.contact.phone}</div>}
                {p.contact.kakao && <div className="contact-item"><span style={{ fontSize: 11, background: '#fee500', color: '#000', padding: '2px 5px', borderRadius: 3, fontWeight: 700 }}>K</span> {p.contact.kakao}</div>}
                {p.contact.email && <div className="contact-item"><Icon name="mail" size={13} /> {p.contact.email}</div>}
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
