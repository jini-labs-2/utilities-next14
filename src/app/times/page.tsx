'use client'

import { useState } from 'react'
import { format, fromUnixTime, getUnixTime } from 'date-fns'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

export default function DateTimePage() {
  const [unixTime, setUnixTime] = useState('')
  const [dateTimeString, setDateTimeString] = useState('')

  const convertToDateTime = () => {
    try {
      const date = fromUnixTime(Number(unixTime))
      setDateTimeString(format(date, 'yyyy-MM-dd HH:mm:ss'))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setDateTimeString('無効な Unix 時間です')
    }
  }

  const convertToUnixTime = () => {
    try {
      const date = new Date(dateTimeString)
      setUnixTime(String(getUnixTime(date)))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setUnixTime('無効な日時文字列です')
    }
  }

  return (
    <div className="times__inner">
      <div className="times__title">
        <h2>日時変換</h2>
      </div>
      <div className="space-y-4">
        <div>
          <div className="times__subtitle">
            <h2> Unix時間 → 日時 </h2>
            <div className="times__input">
              <input
                type="text"
                value={unixTime}
                onChange={(e) => setUnixTime(e.target.value)}
                placeholder="Unix時間を入力"
                className="times__input_unixtime"
              />
              <button
                onClick={convertToDateTime}
                className="times__input_button"
              >
                変換
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="times__subtitle">
            <h2>日時 → Unix時間</h2>
            <div className="times__input">
              <input
                  type="text"
                  value={dateTimeString}
                  onChange={(e) => setDateTimeString(e.target.value)}
                  placeholder="YYYY-MM-DD HH:mm:ss"
                  className="times__input_datetime"
                />
                <button
                  onClick={convertToUnixTime}
                  className="times__input_submit"
                >
                  変換
                </button>
              </div>
              <input
                type="text"
                value={unixTime}
                readOnly
                className="times__converted_datetime"
              />
          </div>
        </div>
      </div>
    </div>
  )
}

