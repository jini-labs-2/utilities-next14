'use client'
import React, { useState, useEffect } from 'react';

interface LidGenerateOption {
  prefix: string,
  length: number,
}
const Lid = () => {
  const MAX_GEN_COUNT = 20;
  const MAX_ID_LENGTH = 9;
  const [sampleId, setSampleId] = useState<string>('');
  const [generateCount, setGenerateCount] = useState<number>(1);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);
  const [generateOptions, setGenerateOptions] = useState<LidGenerateOption>({prefix: '', length: 0});

  const generateId = ({prefix, length}: LidGenerateOption) =>
      `${prefix || 'prefix-'}${Math.random().toString(36).substr(2, length || 9)}`;

  useEffect(() => {
    setSampleId(`${'prefix-'}${Math.random().toString(36).substr(2, 9)}`)
  }, [])

  const handleGenerateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(MAX_GEN_COUNT, Number(e.target.value)));
    setGenerateCount(value);
  }
  const handelGenerateOptionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const options = {
      ...generateOptions,
      [e.target.name]: (e.target.name === 'length')
        ? Math.max(1, Math.min(MAX_ID_LENGTH, Number(e.target.value)))
        : e.target.value
    }
    setGenerateOptions(() => options);
  }

  const handleGenerateId = () => {
    const newIds: string[] = [];
    if (!generateCount || generateCount <= 0) {
      newIds.push(generateId(generateOptions));
    } else {
      for (let i = 0; i < generateCount; i++) {
        newIds.push(generateId(generateOptions));
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
        <h2> LID (Local Idetifier) </h2>
      </div>
      <div className='uuid__description'>
        <h3>
        特定のシステムやローカル環境内でのみ一意である必要があります。UUIDに比べて生成が軽量で、他のシステムやデバイスとの衝突の可能性があるため、主に限定的な範囲で使用されます。
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
          Prefix 
          <input
            className='uuid_create_input_count'
            type='text'
            name='prefix' 
            onChange={handelGenerateOptionOnChange}
            ></input>
          <br />
          Length 
          <input
            className='uuid_create_input_count'
            type='number'
            name='length' 
            value={generateOptions.length}
            placeholder='Max 9'
            min='1'
            max='9'
            onChange={handelGenerateOptionOnChange}
            ></input>
          <br />
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

export default Lid