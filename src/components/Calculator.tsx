import { useState } from 'react'
import {
  calcMonthlyAcquisition,
  calcDailyGain,
  DEFAULT_DAILY_SETTINGS,
  type DailySettings,
  type CalcResult,
  formatNum,
  formatDate,
} from '../utils/calculator'
import { useLocalStorage } from '../hooks/useLocalStorage'

type Props = {
  onUseResult: (amount: number) => void
}

function todayStr() {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

export default function Calculator({ onUseResult }: Props) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const resetDay = 1
  const [settings, setSettings] = useLocalStorage<DailySettings>('juktatsu_settings', DEFAULT_DAILY_SETTINGS)
  const [result, setResult] = useState<CalcResult | null>(null)
  const [usePartialCalc, setUsePartialCalc] = useLocalStorage('juktatsu_use_partial', false)
  const [startDateStr, setStartDateStr] = useState(todayStr)
  const [currentAmount, setCurrentAmount] = useLocalStorage('juktatsu_current_amount', 0)

  const dailyGain = calcDailyGain(settings)

  function handleCalc() {
    let fromDate: Date | undefined
    if (usePartialCalc && startDateStr) {
      const [y, m, d] = startDateStr.split('-').map(Number)
      fromDate = new Date(y, m - 1, d)
    }
    setResult(calcMonthlyAcquisition(year, month, resetDay, settings, fromDate))
  }

  function updateSetting<K extends keyof DailySettings>(key: K, value: DailySettings[K]) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="calc-container">
      <h2 className="section-title">月間取得量シミュレーター</h2>

      <div className="card">
        <h3 className="card-title">対象月</h3>
        <div className="form-row">
          <label>年</label>
          <input
            type="number"
            className="input-small"
            value={year}
            min={2020}
            max={2030}
            onChange={e => setYear(Number(e.target.value))}
          />
          <label>月</label>
          <select
            className="input-small"
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
        </div>

        <hr className="card-divider" />

        <div className="form-row">
          <label>現在の所持数</label>
          <input
            type="number"
            className="input-small"
            value={currentAmount}
            min={0}
            onChange={e => setCurrentAmount(Number(e.target.value))}
          />
          <label style={{ marginLeft: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              checked={usePartialCalc}
              onChange={e => setUsePartialCalc(e.target.checked)}
            />
            月途中から計算する
          </label>
          {usePartialCalc && (
            <>
              <input
                type="date"
                className="input-small"
                value={startDateStr}
                onChange={e => setStartDateStr(e.target.value)}
              />
              <button
                className="btn-today"
                onClick={() => setStartDateStr(todayStr())}
              >
                今日
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">1日あたりの取得設定</h3>

        <div className="settings-rows">
          <div className="settings-row">
            <div className="setting-item">
              <label>自動回復 (AP/日)</label>
              <input
                type="number"
                className="input-small"
                value={settings.autoRecovery}
                min={0}
                onChange={e => updateSetting('autoRecovery', Number(e.target.value))}
              />
            </div>
            <div className="setting-item">
              <label>カフェ (AP/日)</label>
              <input
                type="number"
                className="input-small"
                value={settings.cafe}
                min={0}
                max={740}
                onChange={e => updateSetting('cafe', Number(e.target.value))}
              />
              <span className="hint">上限740</span>
            </div>
            <div className="setting-item setting-item-check">
              <label>
                <input
                  type="checkbox"
                  checked={settings.circleEntry}
                  onChange={e => updateSetting('circleEntry', e.target.checked)}
                />
                サークル入場 (+10/日)
              </label>
            </div>
            <div className="setting-item setting-item-check">
              <label>
                <input
                  type="checkbox"
                  checked={settings.freePackage}
                  onChange={e => updateSetting('freePackage', e.target.checked)}
                />
                無料パッケージ (+10/日)
              </label>
            </div>
          </div>

          <div className="settings-row">
            <div className="setting-item setting-item-check">
              <label>
                <input
                  type="checkbox"
                  checked={settings.dailyMission}
                  onChange={e => updateSetting('dailyMission', e.target.checked)}
                />
                デイリー (+150/日)
              </label>
            </div>
            <div className="setting-item setting-item-check">
              <label>
                <input
                  type="checkbox"
                  checked={settings.weeklyMission}
                  onChange={e => updateSetting('weeklyMission', e.target.checked)}
                />
                ウィークリー (+200/週)
              </label>
            </div>
          </div>

          <div className="settings-row">
            <div className="setting-item">
              <label>2weekスタミナパッケージ</label>
              <select
                className="input-small"
                value={settings.stamPackageDays}
                onChange={e => updateSetting('stamPackageDays', Number(e.target.value) as 0 | 14 | 28 | 42)}
              >
                <option value={0}>なし</option>
                <option value={14}>14日</option>
                <option value={28}>28日</option>
                <option value={42}>42日</option>
              </select>
              <span className="hint">+150/日</span>
            </div>
            <div className="setting-item">
              <label>アニバーサリーAPパッケージ</label>
              <select
                className="input-small"
                value={settings.annivPackageDays}
                onChange={e => updateSetting('annivPackageDays', Number(e.target.value) as 0 | 7 | 14 | 21 | 28 | 35)}
              >
                <option value={0}>なし</option>
                <option value={7}>7日</option>
                <option value={14}>14日</option>
                <option value={21}>21日</option>
                <option value={28}>28日</option>
                <option value={35}>35日</option>
              </select>
              <span className="hint">+160/日</span>
            </div>
          </div>

          <div className="settings-row">
            <div className="setting-item">
              <label>石割 (回/日)</label>
              <input
                type="number"
                className="input-small"
                value={settings.gemSpending}
                min={0}
                onChange={e => updateSetting('gemSpending', Number(e.target.value))}
              />
              <span className="hint">×120 AP</span>
            </div>
          </div>

          <div className="settings-row">
            <div className="setting-item">
              <label>中級ドリンク (個/日)</label>
              <input
                type="number"
                className="input-small"
                value={settings.midDrink}
                min={0}
                onChange={e => updateSetting('midDrink', Number(e.target.value))}
              />
              <span className="hint">×60 AP</span>
            </div>
            <div className="setting-item">
              <label>初級ドリンク (個/日)</label>
              <input
                type="number"
                className="input-small"
                value={settings.lowDrink}
                min={0}
                onChange={e => updateSetting('lowDrink', Number(e.target.value))}
              />
              <span className="hint">×30 AP</span>
            </div>
          </div>
        </div>

        <div className="daily-gain-summary">
          1日あたり合計: <strong>{formatNum(dailyGain)} AP</strong>
          {settings.weeklyMission && <span className="hint"> + ウィークリー200/週</span>}
        </div>

        <div className="bonus-row">
          <label>
            <input
              type="checkbox"
              checked={settings.hasMonthlyBonus}
              onChange={e => updateSetting('hasMonthlyBonus', e.target.checked)}
            />
            マンスリー上限アップ (週上限 +2,000)
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.hasHalfMonthlyBonus}
              onChange={e => updateSetting('hasHalfMonthlyBonus', e.target.checked)}
            />
            ハーフマンスリー上限アップ (週上限 +1,000)
          </label>
        </div>
      </div>

      <button className="btn-primary btn-calc" onClick={handleCalc}>
        計算する
      </button>

      {result && (
        <div className="card result-card">
          <h3 className="card-title">計算結果 — {year}年{month}月</h3>
          <p className="bonus-hint">週上限: {formatNum(result.weekCap)}</p>

          <table className="week-table">
            <thead>
              <tr>
                <th>期間</th>
                <th className="th-right">日数</th>
                <th className="th-right">日次合計</th>
                {settings.weeklyMission && <th className="th-right">週ミッション</th>}
                <th className="th-right">理論値</th>
                <th className="th-right">取得量</th>
                <th className="th-right">損失</th>
              </tr>
            </thead>
            <tbody>
              {result.weeks.map((w, i) => (
                <tr key={i} className={w.rawGain > w.cap ? 'row-capped' : ''}>
                  <td>{formatDate(w.start)} 〜 {formatDate(w.end)}</td>
                  <td className="td-right">{w.days}日</td>
                  <td className="td-right">{formatNum(w.dailyGainTotal)}</td>
                  {settings.weeklyMission && (
                    <td className="td-right weekly-bonus">+{formatNum(w.weeklyBonus)}</td>
                  )}
                  <td className="td-right">{formatNum(w.rawGain)}</td>
                  <td className="td-right capped">{formatNum(w.cappedGain)}</td>
                  <td className="td-right loss">
                    {w.rawGain > w.cappedGain ? `-${formatNum(w.rawGain - w.cappedGain)}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="result-summary">
            {(usePartialCalc || currentAmount > 0) ? (
              <>
                <div className="result-row">
                  <span>{usePartialCalc ? '残り日数の取得予定' : '月間合計'}</span>
                  <span>{formatNum(result.grandTotal)}</span>
                </div>
                <div className="result-row">
                  <span>現在の所持数</span>
                  <span>{formatNum(currentAmount)}</span>
                </div>
                <div className="result-row total">
                  <span>合計</span>
                  <span className="total-num">{formatNum(result.grandTotal + currentAmount)}</span>
                </div>
              </>
            ) : (
              <div className="result-row total">
                <span>月間合計</span>
                <span className="total-num">{formatNum(result.grandTotal)}</span>
              </div>
            )}
          </div>

          <button
            className="btn-secondary"
            onClick={() => onUseResult(result.grandTotal + currentAmount)}
          >
            この金額でショップをシミュレート →
          </button>
        </div>
      )}
    </div>
  )
}
