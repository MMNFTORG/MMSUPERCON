import { IEventData, IMonthData } from '@components/Calendar/types'

import calendarImage1 from '@assets/calendar/calendar-1.jpg'
import calendarImage2 from '@assets/calendar/calendar-2.jpg'
import calendarImage3 from '@assets/calendar/calendar-3.jpg'
import artistLogo from '@assets/logo.png'

export const EVENTS_DATA: IEventData[] = [
  {
    date: '2022-06-07T00:00:00.000Z',
    // eslint-disable-next-line
    name: `The 7's Club`,
    image: calendarImage1,
    link: '/collection/1',
    artist: {
      name: 'Known Gallery',
      image: artistLogo
    },
    description:
      'The Known Gallery is a Los Angeles art gallery that showcases contemporary pieces from new and established artists from around the world. Owned and operated by the founding members of the L.A graffiti group The Seventh Letter, the gallery has strong ties to the west coast graffiti'
  },
  {
    date: '2022-06-11T00:00:00.000Z',
    name: 'The Roadmap Tour: California',
    image: calendarImage2,
    link: '/collection/2',
    artist: {
      name: 'Known Gallery',
      image: artistLogo
    },
    description:
      'The Known Gallery is a Los Angeles art gallery that showcases contemporary pieces from new and established artists from around the world. Owned and operated by the founding members of the L.A...'
  },
  {
    date: '2022-07-12T00:00:00.000Z',
    name: 'The Roadmap Tour: Mexico',
    image: calendarImage3,
    link: '/collection/4',
    artist: {
      name: 'Known Gallery',
      image: artistLogo
    },
    description:
      'The Known Gallery is a Los Angeles art gallery that showcases contemporary pieces from new and established artists from around the world. Owned and operated by the founding members of the L.A ...'
  }
]
