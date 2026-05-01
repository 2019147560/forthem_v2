'use client'

import { useState } from 'react'
import { Icon } from './Icon'
import { Crumb } from './Header'
import { PROGRAMS } from '../data'

type ApplyData = {
  nick: string; age: string; region: string; motive: string
  current: string; expect: string; pace: string; contact: string
  mode: string; consent1: boolean; consent2: boolean
}

export const ApplyView = ({ id, onBack, onDone }: { id: string; onBack: () => void; onDone: () => void }) => {
  const p = PROGRAMS.find(x => x.id === id)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ApplyData>({
    nick: '', age: '', region: '', motive: '', current: '',
    expect: '', pace: '', contact: '', mode: '', consent1: false, consent2: false,
  })

  if (!p) return null

  const set = (k: keyof ApplyData, v: string | boolean) => setData(d => ({ ...d, [k]: v }))

  const stepDefs = ['기본 정보', '나의 상태', '참여 방식', '확인 및 제출', '완료']

  const canNext = () => {
    if (step === 0) return data.nick && data.age && data.region
    if (step === 1) return data.motive && data.current
    if (step === 2) return data.pace && data.mode && data.contact
    if (step === 3) return data.consent1 && data.consent2
    return true
  }

  const regions = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충청', '전라', '경상', '제주']

  return (
    <main className="shell">
      <Crumb trail={['고립 은둔 예방', '지원사업 검색', p.title, '신청']} />
      <button className="back" onClick={onBack}><Icon name="chev-left" size={13} /> {p.title}</button>

      <div className="apply-shell">
        <aside className="steps">
          {stepDefs.map((s, i) => (
            <div key={i} className={`step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
              <div className="step-num">{i < step ? <Icon name="check" size={11} /> : i + 1}</div>
              <div className="step-label">{s}</div>
            </div>
          ))}
        </aside>

        {step === 0 && (
          <div className="form-card">
            <h2 className="form-h">기본 정보를 알려주세요</h2>
            <p className="form-sub">실명 대신 닉네임으로도 괜찮아요. 익명으로 진행되는 프로그램입니다.</p>
            <div className="field">
              <div className="field-label">닉네임 또는 이름 <span className="req">*</span><span className="field-help">— 진행 중에만 사용</span></div>
              <input className="input" value={data.nick} onChange={e => set('nick', e.target.value)} placeholder="예: 봄볕" />
            </div>
            <div className="field">
              <div className="field-label">나이 <span className="req">*</span></div>
              <div className="choice-row">
                {['만 19~24세', '만 25~29세', '만 30~34세'].map(v => (
                  <button key={v} className={`choice${data.age === v ? ' selected' : ''}`} onClick={() => set('age', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <div className="field-label">거주 지역 <span className="req">*</span></div>
              <div className="choice-row">
                {regions.map(v => (
                  <button key={v} className={`choice${data.region === v ? ' selected' : ''}`} onClick={() => set('region', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="form-foot">
              <span />
              <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(1)}>다음 <Icon name="chev-right" size={13} /></button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="form-card">
            <h2 className="form-h">지금의 나를 알려주세요</h2>
            <p className="form-sub">정답은 없어요. 솔직하게 적을수록 매니저가 더 잘 도와드릴 수 있어요.</p>
            <div className="field">
              <div className="field-label">참여 동기 <span className="req">*</span></div>
              <div className="choice-row">
                {['일상 회복', '사회 복귀', '관계 형성', '아직 잘 모르겠어요'].map(v => (
                  <button key={v} className={`choice${data.motive === v ? ' selected' : ''}`} onClick={() => set('motive', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <div className="field-label">최근 일상이 어떤지 짧게 적어주세요 <span className="req">*</span><span className="field-help">— 한두 문장이면 충분</span></div>
              <textarea className="textarea" value={data.current} onChange={e => set('current', e.target.value)} placeholder="예: 외출은 일주일에 한 번 정도. 가족 외에는 거의 말을 하지 않아요." />
            </div>
            <div className="field">
              <div className="field-label">이 프로그램에서 기대하는 것 <span className="field-help">— 선택</span></div>
              <textarea className="textarea" value={data.expect} onChange={e => set('expect', e.target.value)} placeholder="비워둬도 괜찮아요." />
            </div>
            <div className="form-foot">
              <button className="btn btn-ghost" onClick={() => setStep(0)}><Icon name="chev-left" size={13} /> 이전</button>
              <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(2)}>다음 <Icon name="chev-right" size={13} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-card">
            <h2 className="form-h">참여 방식을 골라주세요</h2>
            <p className="form-sub">언제든 바꿀 수 있어요. 결정한 대로 묶이지 않습니다.</p>
            <div className="field">
              <div className="field-label">참여 페이스 <span className="req">*</span></div>
              <div className="choice-row">
                {['천천히, 한 번에 하나씩', '주 1회 정도', '주 2회 이상도 가능'].map(v => (
                  <button key={v} className={`choice${data.pace === v ? ' selected' : ''}`} onClick={() => set('pace', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <div className="field-label">선호하는 참여 형태 <span className="req">*</span></div>
              <div className="choice-row">
                {['온라인만', '오프라인만', '둘 다 괜찮아요'].map(v => (
                  <button key={v} className={`choice${data.mode === v ? ' selected' : ''}`} onClick={() => set('mode', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <div className="field-label">연락 받을 방법 <span className="req">*</span></div>
              <div className="choice-row">
                {['문자', '카카오톡', '이메일', '앱 내 알림만'].map(v => (
                  <button key={v} className={`choice${data.contact === v ? ' selected' : ''}`} onClick={() => set('contact', v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="form-foot">
              <button className="btn btn-ghost" onClick={() => setStep(1)}><Icon name="chev-left" size={13} /> 이전</button>
              <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(3)}>다음 <Icon name="chev-right" size={13} /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-card">
            <h2 className="form-h">제출 전 한 번만 확인해 주세요</h2>
            <p className="form-sub">신청 정보는 본인과 담당 매니저 외에는 공개되지 않아요.</p>
            <div style={{ background: 'var(--bg-soft)', borderRadius: 4, padding: 14, marginBottom: 18, border: '1px solid var(--line)' }}>
              <div className="apply-row"><span className="apply-row-k">신청 사업</span><span className="apply-row-v">{p.title}</span></div>
              <div className="apply-row"><span className="apply-row-k">닉네임</span><span className="apply-row-v">{data.nick || '—'}</span></div>
              <div className="apply-row"><span className="apply-row-k">나이 / 지역</span><span className="apply-row-v">{data.age} · {data.region}</span></div>
              <div className="apply-row"><span className="apply-row-k">참여 동기</span><span className="apply-row-v">{data.motive}</span></div>
              <div className="apply-row"><span className="apply-row-k">참여 페이스</span><span className="apply-row-v">{data.pace}</span></div>
              <div className="apply-row"><span className="apply-row-k">연락 방법</span><span className="apply-row-v">{data.contact}</span></div>
            </div>
            <label className="consent">
              <input type="checkbox" checked={data.consent1} onChange={e => set('consent1', e.target.checked)} />
              <div><strong>(필수)</strong> 위 정보가 사업 운영기관과 담당 매니저에게 전달되는 것에 동의합니다. 정보는 사업 종료 후 6개월 뒤 자동 파기됩니다.</div>
            </label>
            <div style={{ height: 8 }} />
            <label className="consent">
              <input type="checkbox" checked={data.consent2} onChange={e => set('consent2', e.target.checked)} />
              <div><strong>(필수)</strong> 본인은 어떤 단계에서든 참여를 중단하거나 정보 삭제를 요청할 수 있음을 이해했습니다.</div>
            </label>
            <div className="form-foot">
              <button className="btn btn-ghost" onClick={() => setStep(2)}><Icon name="chev-left" size={13} /> 이전</button>
              <button className="btn btn-ink" disabled={!canNext()} onClick={() => setStep(4)}>제출하기</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-card confirm-card">
            <div className="confirm-mark">✓</div>
            <h2 className="form-h" style={{ fontSize: 22, border: 'none', padding: 0 }}>신청이 접수됐어요</h2>
            <p className="form-sub" style={{ fontSize: 14, maxWidth: 420, margin: '10px auto 24px' }}>
              담당 매니저가 영업일 기준 2~3일 내 연락 드릴게요.<br />마음의 부담 없이, 천천히 기다려 주세요.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn btn-ghost" style={{ width: 'auto', padding: '0 20px' }} onClick={onDone}>홈으로</button>
              <button className="btn btn-primary" style={{ width: 'auto', padding: '0 20px' }} onClick={onDone}>내 신청 보기</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
