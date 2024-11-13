'use client'
import React, { useState, useEffect } from 'react';
import { v3 as uuidv3 } from 'uuid';

const Uuidv3 = () => {
  const [sampleId, setSampleId] = useState<string>('');
  const [idName, setIdName] = useState<string>('');
  const [generatedId, setGeneratedId] = useState<string[]>([]);

  useEffect(() => {
    setSampleId(() => uuidv3('default', uuidv3.URL));
  }, [])

  const hadleIdNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdName(() => e.target.value)
  }
  const handleGenerateId = () => {
    const nameSpace = uuidv3.URL;
    if (!idName) {
      alert('nameを入力してください。')
      return;
    }
    const uid = uuidv3(idName, nameSpace);
    setGeneratedId(() => [uid]);
  }
  const handleCopyToClipboard = (ids: string[]) => {
    if (ids.length) {
      navigator.clipboard.writeText(ids.join(' '));
    }
  }
  return (
    <div className='uuid__inner'>
      <div className='uuid__title'>
        <h2> UUID v3 </h2>
      </div>
      <div className='uuid__description'>
      名前空間（Namespace）と名前（Name）の組み合わせで一意な識別子を生成します。ハッシュ関数（MD5）を使用して生成され、同じ名前空間と名前からは常に同じUUIDが生成されるため、一貫した識別が必要な場合に適しています。
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
        <div>
          {generatedId}
        </div>
      </div>
    </div>
  )
}

export default Uuidv3