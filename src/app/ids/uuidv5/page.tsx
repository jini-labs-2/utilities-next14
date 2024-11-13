'use client'
import React, { useState, useEffect } from 'react';
import { v5 as uuidv5 } from 'uuid';

const Uuid5 = () => {
  const [sampleId, setSampleId] = useState<string>('');
  const [idName, setIdName] = useState<string>('');
  const [generatedId, setGeneratedId] = useState<string[]>([]);

  useEffect(() => {
    setSampleId(() => uuidv5('default', uuidv5.URL));
  }, [])

  const hadleIdNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdName(() => e.target.value)
  }
  const handleGenerateId = () => {
    const nameSpace = uuidv5.URL
    if (!idName) {
      alert('nameを入力してください。')
      return;
    }
    const uid = uuidv5(idName, nameSpace);
    setGeneratedId([uid]);
  }
  const handleCopyToClipboard = (ids: string[]) => {
    if (ids.length) {
      navigator.clipboard.writeText(ids.join(' '));
    }
  }
  return (
<div className='uuid__inner'>
      <div className='uuid__title'>
        <h2> UUID v5 </h2>
      </div>
      <div className='uuid__description'>
      UUID v3と似てますが、MD5の代わりにSHA-1ハッシュを使用して安全性が上がります。
      </div>
      <div className='uuid__sample'>
        <h3 className='uuid__sample_title'>サンプル</h3>
        <h3 className='uuid__sample_id'>
          {sampleId}
          <span className='uuid__id_copy' onClick={() => handleCopyToClipboard([sampleId])}>コピー</span>
        </h3>
      </div>
      <div className='uuid__create'>
        <label>
          <input
            className='uuid_create_input_count'
            type='text' 
            placeholder='名前を入力してください'
            onChange={hadleIdNameOnChange}
          />
        </label>
        <button onClick={handleGenerateId}>生成</button>
      </div>
      <div className='uuid__created_ids'>
        <p>
          {generatedId}
        </p>
      </div>
    </div>
  )
}

export default Uuid5