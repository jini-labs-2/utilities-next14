'use client'

import { useState } from 'react'
import { format, fromUnixTime, getUnixTime } from 'date-fns'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ja } from 'date-fns/locale/ja';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

export default function DateTimePage() {
  const [unixTime, setUnixTime] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateTimeString, setDateTimeString] = useState('')
  const [inputDate, setInputDate] = useState<Date>();
  registerLocale('ja', ja)

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
      setUnixTime(String(getUnixTime(inputDate ?? new Date())))
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
      <div>
        <div className="times__subtitle">
          <h3>日時 → Unix時間</h3>
          <div className="times__input">
              <DatePicker
                className='times__input_picker'
                selected={inputDate}
                onChange={(date) => {setInputDate(date || new Date())}}
                showTimeSelect
                locale='ja'
                dateFormat='YYY/MM/dd hh:mm:ss'
                timeFormat='HH:mm:ss'
                timeIntervals={1}
                timeCaption='Time'
                placeholderText='YYYY/MM/DD HH:mm:ss'
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
      <div className="space-y-4">
        <div>
          <div className="times__subtitle">
            <h3> Unix時間 → 日時 </h3>
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
      </div>
    </div>
  )
}

