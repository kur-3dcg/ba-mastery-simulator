import { useState, useRef, useEffect } from 'react'
import Calculator from './components/Calculator'
import ShopSimulator from './components/ShopSimulator'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

type Tab = 'calc' | 'shop'
type Theme = 'dark' | 'light'


export default function App() {
  const [tab, setTab] = useLocalStorage<Tab>('juktatsu_tab', 'calc')
  const [shopAmount, setShopAmount] = useLocalStorage<number>('juktatsu_shopAmount', 0)
  const [theme, setTheme] = useLocalStorage<Theme>('juktatsu_theme', 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  function handleUseResult(amount: number) {
    // ShopSimulatorのbudgetキーを直接更新してからタブ切替
    localStorage.setItem('juktatsu_budget', JSON.stringify(amount))
    setShopAmount(amount)
    setTab('shop')
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={import.meta.env.BASE_URL + 'img/Currency_Icon_MasterCoin.png'} alt="熟達証書" className="header-icon" />
        <h1 className="app-title">熟達証書シミュレーター</h1>
        <div className="header-subtitle">Blue Archive</div>

        <button
          className="theme-toggle-btn"
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          aria-label="テーマ切り替え"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <div className="hamburger-wrap" ref={menuRef}>
          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>

          {menuOpen && (
            <div className="hamburger-menu">
              <a className="hm-link" href="https://kur-3dcg.github.io/" target="_blank" rel="noreferrer">
                その他ツール
              </a>

              <div className="hm-divider" />

              <div className="hm-section-label">マニュアル</div>
              <a
                className="hm-link"
                href="https://note.com/kur7263/n/n291ed8704338"
                target="_blank"
                rel="noreferrer"
              >
                マニュアル
              </a>
              <a
                className="hm-link"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfFoYgFIl-L-CI4KeHrqMtAuERyO_JwbEwgTiXkflbyJsNcMQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
              >
                ご意見・ご感想
              </a>
              <a
                className="hm-link"
                href="https://x.com/kur_3dcg"
                target="_blank"
                rel="noreferrer"
              >
                更新・開発情報
              </a>
            </div>
          )}
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${tab === 'calc' ? 'active' : ''}`}
          onClick={() => setTab('calc')}
        >
          月間取得量計算
        </button>
        <button
          className={`tab-btn ${tab === 'shop' ? 'active' : ''}`}
          onClick={() => setTab('shop')}
        >
          ショップシミュレート
        </button>
      </nav>

      <main className="app-main">
        {tab === 'calc' && <Calculator onUseResult={handleUseResult} />}
        {tab === 'shop' && <ShopSimulator initialAmount={shopAmount} key={shopAmount} />}
      </main>
    </div>
  )
}
