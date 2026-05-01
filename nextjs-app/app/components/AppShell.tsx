'use client'

import { useState } from 'react'
import { Header } from './Header'
import { HomeView } from './HomeView'
import { DetailView } from './DetailView'
import { ApplyView } from './ApplyView'
import { MyView } from './MyView'

type Route = { name: string; id?: string }

export const AppShell = () => {
  const [tab, setTab] = useState('home')
  const [route, setRoute] = useState<Route>({ name: 'home' })

  const openProgram = (id: string) => { setRoute({ name: 'detail', id }); window.scrollTo(0, 0) }
  const goApply = (id: string) => { setRoute({ name: 'apply', id }); window.scrollTo(0, 0) }
  const goHome = () => { setRoute({ name: 'home' }); setTab('home'); window.scrollTo(0, 0) }
  const handleTab = (t: string) => {
    setTab(t)
    setRoute({ name: t === 'home' ? 'home' : t })
    window.scrollTo(0, 0)
  }

  const headerTab =
    route.name === 'detail' || route.name === 'apply' ? tab
    : route.name === 'my' ? 'my'
    : 'home'

  return (
    <div className="app">
      <Header tab={headerTab} onTab={handleTab} />

      {route.name === 'home' && tab === 'home' && (
        <HomeView onOpen={openProgram} />
      )}
      {route.name === 'detail' && route.id && (
        <DetailView id={route.id} onBack={goHome} onApply={goApply} />
      )}
      {route.name === 'apply' && route.id && (
        <ApplyView
          id={route.id}
          onBack={() => route.id && setRoute({ name: 'detail', id: route.id })}
          onDone={goHome}
        />
      )}
      {tab === 'my' && route.name !== 'detail' && route.name !== 'apply' && (
        <MyView onOpen={openProgram} />
      )}

      <footer className="foot">
        <div className="shell foot-row">
          <div>
            <div className="foot-brand">나와나왕</div>
            <div className="foot-info">
              고립·은둔청년 통합 정보 플랫폼<br />
              <strong>대표 전화</strong> 02-000-0000 · <strong>운영시간</strong> 평일 10:00–18:00<br />
              본 화면은 디자인 목업으로 실제 사업과 무관합니다
            </div>
          </div>
          <div className="foot-links">
            <a>이용약관</a>
            <a>개인정보처리방침</a>
            <a>오시는 길</a>
            <a>문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
