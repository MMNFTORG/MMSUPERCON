import axios from 'axios'

export const binance = axios.create({
  baseURL: 'https://www.binance.com/api/v3'
})

export const getPricesByTokenSymbol = async (
  symbol: string
): Promise<string> => {
  const {
    data: { price }
  } = await binance.get<{ price: string }>('/ticker/price', {
    params: {
      symbol: `${symbol}USDT`
    }
  })

  return price
}
