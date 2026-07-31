import { useState, useEffect, useRef } from 'react'
import { SHOP_ITEMS, type ShopItem } from '../data/shopItems'
import { formatNum } from '../utils/calculator'
import { useLocalStorage } from '../hooks/useLocalStorage'

type CartEntry = {
  item: ShopItem
  qty: number
}

type ItemState = {
  cannotBuy: boolean
  purchased: boolean
}

type Props = {
  initialAmount?: number
}

export default function ShopSimulator({ initialAmount = 0 }: Props) {
  const [budget, setBudget] = useLocalStorage<number>('juktatsu_budget', initialAmount)
  const [inputBudget, setInputBudget] = useState(String(budget))
  // カートはMapをJSON化できないため [id, qty][] の形でキャッシュ
  const [cartEntries, setCartEntries] = useLocalStorage<[string, number][]>('juktatsu_cart', [])
  const [cart, setCartState] = useState<Map<string, number>>(() => new Map(cartEntries))
  const [filter, setFilter] = useLocalStorage<'all' | 'divine_s' | 'divine_limited' | 'divine_dist' | 'other'>('juktatsu_filter', 'all')
  const [search, setSearch] = useState('')
  const [itemStates, setItemStates] = useLocalStorage<Record<string, ItemState>>('juktatsu_itemStates', {})
  // マウント時のスナップショット（ソート用）— リアルタイムには並び替えない
  const sortSnapshot = useRef(itemStates)

  // cartが変わったらlocalStorageにも保存
  useEffect(() => {
    setCartEntries([...cart.entries()])
  }, [cart, setCartEntries])

  // フィルタータブ切替時にソートスナップショットを更新
  useEffect(() => {
    sortSnapshot.current = itemStates
  }, [filter])

  const totalSpent = [...cart.entries()].reduce((sum, [id, qty]) => {
    const item = SHOP_ITEMS.find(i => i.id === id)
    return sum + (item ? item.price * qty : 0)
  }, 0)
  const remaining = budget - totalSpent

  function setQty(item: ShopItem, qty: number) {
    const clamped = Math.max(0, Math.min(qty, item.stock))
    setCartState(prev => {
      const next = new Map(prev)
      if (clamped === 0) next.delete(item.id)
      else next.set(item.id, clamped)
      return next
    })
  }

  function getQty(id: string) {
    return cart.get(id) ?? 0
  }

  function canAdd(item: ShopItem) {
    const qty = getQty(item.id)
    return qty < item.stock && remaining >= item.price
  }

  function handleBudgetApply() {
    const v = Number(inputBudget.replace(/,/g, ''))
    if (!isNaN(v) && v >= 0) setBudget(v)
  }

  function updateItemState(id: string, patch: Partial<ItemState>) {
    setItemStates(prev => {
      const current = prev[id] ?? { cannotBuy: false, purchased: false }
      return { ...prev, [id]: { ...current, ...patch } }
    })
  }

  function getItemState(id: string): ItemState {
    return itemStates[id] ?? { cannotBuy: false, purchased: false }
  }

  const filteredItems = SHOP_ITEMS
    .filter(item => {
      if (filter !== 'all' && item.category !== filter) return false
      if (search && !item.name.includes(search)) return false
      return true
    })
    .sort((a, b) => {
      const snap = sortSnapshot.current
      const aEnd = (snap[a.id]?.cannotBuy || snap[a.id]?.purchased) ? 1 : 0
      const bEnd = (snap[b.id]?.cannotBuy || snap[b.id]?.purchased) ? 1 : 0
      return aEnd - bEnd
    })

  const cartDisplay: CartEntry[] = [...cart.entries()]
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ item: SHOP_ITEMS.find(i => i.id === id)!, qty }))
    .filter(e => e.item)

  const CATEGORY_LABELS = {
    all: 'すべて',
    divine_s: '神名文字（フェス限）',
    divine_limited: '神名文字（限定）',
    divine_dist: '神名文字（配布）',
    other: 'その他',
  }

  return (
    <div className="shop-container">
      <h2 className="section-title">ショップシミュレーター</h2>

      {/* 所持数入力 */}
      <div className="card budget-card">
        <h3 className="card-title">所持熟達証書</h3>
        <div className="budget-row">
          <img src={import.meta.env.BASE_URL + 'img/Currency_Icon_MasterCoin.png'} alt="熟達証書" className="budget-icon" />
          <input
            type="text"
            className="input-budget"
            value={inputBudget}
            onChange={e => setInputBudget(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleBudgetApply()}
            placeholder="0"
          />
          <button className="btn-primary" onClick={handleBudgetApply}>適用</button>
        </div>
        <div className="budget-stats">
          <div className={`stat-item ${remaining < 0 ? 'stat-negative' : ''}`}>
            <span className="stat-label">残り</span>
            <span className="stat-value">{formatNum(remaining)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">消費</span>
            <span className="stat-value">{formatNum(totalSpent)}</span>
          </div>
        </div>
      </div>

      <div className="shop-layout">
        {/* 左: 商品一覧 */}
        <div className="shop-main">
          {/* フィルター */}
          <div className="filter-bar">
            <input
              type="text"
              className="input-search"
              placeholder="キャラ名で検索..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="filter-tabs">
              {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="item-grid">
            {filteredItems.map(item => {
              const qty = getQty(item.id)
              const itemTotal = item.price * qty
              const affordable = remaining + itemTotal >= item.price
              const state = getItemState(item.id)
              return (
                <div
                  key={item.id}
                  className={`item-card ${qty > 0 ? 'item-selected' : ''} ${!affordable && qty === 0 ? 'item-unaffordable' : ''} ${state.purchased ? 'item-purchased' : ''} ${state.cannotBuy ? 'item-cannot-buy' : ''}`}
                >
                  {item.image && (
                    <div className="item-img-wrap">
                      <img src={item.image} alt={item.name} className="item-img" />
                    </div>
                  )}
                  <div className="item-name">{item.name}</div>
                  <div className="item-price-row">
                    <span className="item-price"><img src={import.meta.env.BASE_URL + 'img/Currency_Icon_MasterCoin.png'} alt="" className="coin-icon" />{formatNum(item.price)}</span>
                    <span className="item-stock">在庫 {item.stock}</span>
                  </div>
                  <div className="item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item, qty - 1)}
                      disabled={qty === 0}
                    >−</button>
                    <span className="qty-value">{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item, qty + 1)}
                      disabled={!canAdd(item)}
                    >＋</button>
                    {item.stock > 1 && (
                      <button
                        className="qty-btn qty-max"
                        onClick={() => {
                          const maxByBudget = Math.floor((remaining + item.price * qty) / item.price)
                          setQty(item, Math.min(item.stock, maxByBudget))
                        }}
                      >MAX</button>
                    )}
                  </div>
                  {qty > 0 && (
                    <div className="item-subtotal">小計: {formatNum(itemTotal)}</div>
                  )}
                  <div className="item-flags">
                    <label className="item-flag-label item-flag-purchased">
                      <input
                        type="checkbox"
                        checked={state.purchased}
                        onChange={e => updateItemState(item.id, { purchased: e.target.checked })}
                      />
                      購入済み
                    </label>
                    <label className="item-flag-label item-flag-cannot-buy">
                      <input
                        type="checkbox"
                        checked={state.cannotBuy}
                        onChange={e => updateItemState(item.id, { cannotBuy: e.target.checked })}
                      />
                      購入不可
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 右: カート */}
        <div className="cart-panel">
          <h3 className="cart-title">購入リスト</h3>
          {cartDisplay.length === 0 ? (
            <p className="cart-empty">まだ選択していません</p>
          ) : (
            <>
              <div className="cart-items">
                {cartDisplay.map(({ item, qty }) => (
                  <div key={item.id} className="cart-item">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                    )}
                    <div className="cart-item-body">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-detail">
                        {formatNum(item.price)} × {qty} = {formatNum(item.price * qty)}
                      </div>
                    </div>
                    <button
                      className="cart-remove"
                      onClick={() => setQty(item, 0)}
                    >✕</button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span>合計</span>
                <span className="cart-total-num">{formatNum(totalSpent)}</span>
              </div>
              <div className={`cart-remaining ${remaining < 0 ? 'cart-over' : ''}`}>
                <span>残り</span>
                <span>{formatNum(remaining)}</span>
              </div>
              <button
                className="btn-danger"
                onClick={() => setCartState(new Map())}
              >
                リセット
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
