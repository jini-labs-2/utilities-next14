'use client'
import React, { useState, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';

const Uuidv1 = () => {
  const MAX_GEN_COUNT = 20;
  const [sampleId, setSampleId] = useState<string>('');
  const [generateCount, setGenerateCount] = useState(1);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  useEffect(() => {
    setSampleId(uuidv1());
  }, [])

  const handleGenerateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(MAX_GEN_COUNT, Number(e.target.value)));
    setGenerateCount(() => value);
  }
  const handleGenerateId = () => {
    const newIds: string[] = [];

    if (!generateCount || generateCount <= 0) {
      newIds.push(uuidv1())
    } else {
      for (let i = 0; i < generateCount; i++) {
        newIds.push(uuidv1());
      }
    }
    setGeneratedIds(() => newIds);
  }
  const handleCopyToClipboard = (ids: string[]) => {
    if (ids.length) {
      navigator.clipboard.writeText(ids.join(' '));
    }
  }
  return (
    <div className='uuid__inner'>
      <div className='uuid__title'>
        <h2> UUID v1 </h2>
      </div>
      <div className='uuid__description'>
        タイムスタンプとMACアドレス（またはハードウェアアドレス）に基づいて生成。生成時間とデバイスに依存するため、一意性が確保されやすい、MACアドレスが含まれるためプライバシーリスクがある。
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
            type='number' 
            onChange={handleGenerateCount}
            value={generateCount}
            placeholder='Max 20'
            min='1'
            max='20'
          /> 件
        </label>
        <button onClick={handleGenerateId}>生成</button>
      </div>
      <div className='uuid__created_ids'>
        <div>
          {generatedIds.length > 0 &&
            <>
              {generatedIds.map((item) => (
                <p className='uuid__created_id' key={item}> {item} </p>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Uuidv1