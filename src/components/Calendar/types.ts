export interface IMonthData<T> {
  [key: string]: T[]
}

export interface IEventData {
  date: string
  image: any
  link: string
  name: string
  artist: IArtistData
  description: string
}

export interface IArtistData {
  name: string
  image: any
}
