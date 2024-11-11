'use client'
import React, { useState } from 'react'

interface InputIpaddr {
  ipaddr?: string, 
  subnet?: string,
  calcOk: boolean,
}

interface CidrInfo {
  startIp?: string,
  endIp?: string,
  ipBitCount?: number,
  ipToBinary?: string,
  ipToDecimal?: number,
  ipToHexa?: string,
  ipCount?: number,
  ipBroadcast?: string,
  ipNetwork?: string,
}

const Cidr = () => {
  const [inputIpaddr, setInputIpaddr] = useState<InputIpaddr>({
    ipaddr: '', 
    subnet: '',
    calcOk: false,
  });
  const [cidrInfo, setCidrInfo] = useState<CidrInfo>({
    startIp: '',
    endIp: '',
    ipBitCount: 0,
    ipToBinary: '',
    ipToDecimal: 0,
    ipCount: 0,
    ipBroadcast: '',
    ipNetwork: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = {[e.target.name]: e.target.value};
      setInputIpaddr((prev: InputIpaddr | null) => ({
        ...(prev || {ipaddr: '', subnet: '', calcOk: false}),
        ...inputData
      }))
  }
  
  const getBroadCastIp = (ip: string, subnet: string) => {
    const ipParts = ip.split('.').map(Number);
    const snParts = subnet.split('.').map(Number);
    const broadcastParts = ipParts.map((part, index) => { return part | (~snParts[index] & 255); });
    return broadcastParts.join('.');
  }
  const getNetworkIp = (ip: string, subnet: string) => {
    const ipParts = ip.split('.').map(Number);
    const snParts = subnet.split('.').map(Number);
    const networkParts = ipParts.map((part, index) => { return part & snParts[index]; });
    return networkParts.join('.');
  }
  const getAssignableIp = (subnet: string) => {
    const snParts = subnet.split('.').map(Number);
    const binarySubnet = snParts
        .map(part => part.toString(2).padStart(8, '0'))
        .join('');

    const networkBits = binarySubnet.split('1').length - 1;
    const hostBits = 32 - networkBits;

    return Math.pow(2, hostBits) - 2;
  }
  const getCountSubnetBits = (subnet: string) => {
    const snParts = subnet.split('.').map(Number);
    const onesCount = snParts
        .map(part => part.toString(2).padStart(8, '0'))
        .join('')
        .split('')
        .filter(bit => bit === '1').length;

    return onesCount;
  }
  const calcIpaddress = () => {
    if (inputIpaddr?.ipaddr) {
      let ipBitCount = 0;
      const ipToBinary = inputIpaddr.ipaddr.split('.').map(element => parseInt(element).toString(2).padStart(8,'0')).join(' ');
      const ipToDecimal = parseInt(ipToBinary.replaceAll(' ', ''), 2);
      const ipToHexa = ipToDecimal.toString(16).toUpperCase();
      let ipCount = 0;
      let ipBroadcast = '';
      let ipNetwork = '';
      if (inputIpaddr.subnet) {
        ipCount = getAssignableIp(inputIpaddr.subnet);
        ipBitCount = getCountSubnetBits(inputIpaddr.subnet);
        ipBroadcast = getBroadCastIp(inputIpaddr.ipaddr, inputIpaddr.subnet);
        ipNetwork = getNetworkIp(inputIpaddr.ipaddr, inputIpaddr.subnet);
      }

      const cidrInfo: Partial<CidrInfo> = {
        ipBitCount,
        ipToBinary,
        ipToDecimal,
        ipToHexa,
        ipCount,
        ipBroadcast,
        ipNetwork,
      }
      setCidrInfo((prev: CidrInfo) => ({...prev, ...cidrInfo}));
      const calcedInputIpaddr: Partial<InputIpaddr> = {
        ...inputIpaddr,
        calcOk: true,
      }
      setInputIpaddr((prev: InputIpaddr) => ({...prev, ...calcedInputIpaddr}));
    } else {
      console.warn('Invalid IP address format');
    }
  }
  
  return (
    <div className='cidr'>
      <div className='cidr__inner'>
        <div className='cidr__title'>
          <h2>CIDRとは？</h2>
        </div>
        <div className='cidr__description'>
          <p>Classless Inter-Domain Routing (CIDR) </p>
          <p>
          インターネット上のデータルーティング効率を高めるため、CIDR を使用して IP アドレスを効率的に割り当てます。IP アドレスは各デバイスに割り当てられ、通信の際に利用されます。
          </p>
        </div>
        <br />
        <hr />
        <div className='cidr__input'>
          <label>
            Ip Address
            <input type='text' name='ipaddr' value={inputIpaddr?.ipaddr} onChange={handleInputChange}></input>
          </label>
          <label>
            Subnet
            <input type='text' name='subnet' value={inputIpaddr?.subnet} onChange={handleInputChange}></input>
          </label>
          <button onClick={calcIpaddress}>calc</button>
        </div>

        <hr />
        <table>
          <tbody>
          <tr>
            <th> 項目 </th>
            <th> 値 </th>
          </tr>
          <tr>
            <td>入力値</td>
            <td> {inputIpaddr.ipaddr} </td>
          </tr>
          <tr>
            <td>入力サーブネット</td>
            <td> {inputIpaddr.subnet} </td>
          </tr>
          <tr>
            <td>CIDR</td>
            <td>{inputIpaddr.calcOk && `${cidrInfo.ipNetwork} / ${cidrInfo.ipBitCount}`}</td>
          </tr>
          <tr>
            <td>サブネット表記</td>
            <td>{inputIpaddr.calcOk && `${cidrInfo.ipNetwork} / ${cidrInfo.ipBroadcast}`}</td>
          </tr>
          <tr>
            <td>IPアドレス範囲</td>
            <td>{cidrInfo.ipNetwork} - {cidrInfo.ipBroadcast}</td>
          </tr>
          <tr>
            <td>IPアドレス数</td>
            <td>{inputIpaddr.calcOk && `${cidrInfo.ipCount}`}</td>
          </tr>
          <tr>
            <td>ネットワークIP</td>
            <td>{cidrInfo.ipNetwork}</td>
          </tr>
          <tr>
            <td>ブロードキャストIP</td>
            <td>{cidrInfo.ipBroadcast}</td>
          </tr>
          <tr>
            <td>サブネットマスク（2進数）</td>	
            <td>{cidrInfo.ipToBinary}</td>
          </tr>
          <tr>
            <td>IPアドレス（2進数）</td>
            <td>{cidrInfo.ipToBinary}</td>
          </tr>
          <tr>
            <td>IPアドレス（10進数）</td>
            <td>{inputIpaddr.calcOk && `${cidrInfo.ipToDecimal}`}</td>
          </tr>
          <tr>
            <td>IPアドレス（16進数）</td>
            <td>{cidrInfo.ipToHexa}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cidr