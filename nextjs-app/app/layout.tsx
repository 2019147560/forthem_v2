import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나와나왕 - 고립·은둔청년 통합 정보 플랫폼',
  description: '은둔·고립청년을 위한 지원사업 검색, 신청, 복지정보를 한곳에서 찾아보세요.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
