'use client'
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Uuidv4 = () => {
  const MAX_GEN_COUNT = 20;
  const [sampleId, setSampleId] = useState<string | null>(null);
  const [generateCount, setGenerateCount] = useState(1);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  useEffect(() => {
    setSampleId(uuidv4());
  }, []);

  const handleGenerateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(MAX_GEN_COUNT, Number(e.target.value)));
    setGenerateCount(() => value);
  }
  const handleGenerateId = () => {
    const newIds = Array.from({ length: generateCount },
      () => uuidv4()
    );

    setGeneratedIds(newIds);
  }
  const handleCopyToClipboard = (ids: string[]) => {
    if (ids.length) {
      navigator.clipboard.writeText(ids.join(' '));
    }
  }

  return (
    <div className='uuid__inner'>
      <div className='uuid__title'>
        <h2> UUID v4 </h2>
      </div>
      <div className='uuid__description'>
        <h3>
        完全にランダムな値で生成されるUUIDです。
        </h3>
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
        <p>
          {generatedIds.length > 0 &&
            <>
              {generatedIds.map((item) => (
                <p className='uuid__created_id' key={item}> {item} </p>
              ))}
            </>
          }
        </p>
      </div>
    </div>
  )
}

export default Uuidv4