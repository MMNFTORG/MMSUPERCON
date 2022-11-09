export interface IConferenceEvent {
  id: number
  day: number
  title: string
}

export const CONFERENCE_EVENTS: Array<IConferenceEvent> = [
  {
    id: 0,
    day: 1,
    title: 'Marketing event with Elon Musk'
  },
  {
    id: 1,
    day: 2,
    title: 'event with Joe Rogan'
  },
  {
    id: 2,
    day: 3,
    title: 'Fitness with Jonah Hill'
  },
  {
    id: 3,
    day: 4,
    title: 'Finance event with Jason Stone'
  }
]
