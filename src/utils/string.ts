import Web3 from 'web3'

export const shorterETHAddress = (str: string, fromStart = 6, fromEnd = -4) => {
  let addr = toChecksumAddress(str)
  return addr?.length > 8
    ? addr.slice(0, fromStart) + '...' + addr.slice(fromEnd)
    : addr
}

export const getIPFSGateway = (url: string) =>
  url.replace('ipfs://', 'https://ipfs.infura.io/ipfs/')

export const toChecksumAddress = Web3.utils.toChecksumAddress

export const copyToClipBoard = async (text: string): Promise<boolean> => {
  const copy = () => {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text)
    }
    const el = document.createElement('input')
    el.setAttribute('readonly', 'readonly')
    el.setAttribute('style', 'position: fixed; top:0; left:0; opacity:0;')
    el.setAttribute('value', text)
    document.body.appendChild(el)
    el.setSelectionRange(0, text.length)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  try {
    await copy()
    return true
  } catch (err) {
    return false
  }
}
