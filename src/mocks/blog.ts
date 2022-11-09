import BlogImage1 from '@assets/Landing/blog/blog-image1.png'
import BlogImage2 from '@assets/Landing/blog/blog-image2.png'
import BlogImage3 from '@assets/Landing/blog/blog-image3.png'

export interface IBlogArticle {
  id: number
  image: string
  title: string
  date: string
  author: string
  label: 'business'
  link: string
}

export const LATEST_BLOG_ARTICLES: Array<IBlogArticle> = [
  {
    id: 0,
    title: 'CEO Welcome letter from the desk of Jason Stone',
    label: 'business',
    image: BlogImage1,
    date: '2022-06-02T12:00:00.000Z',
    author: 'BT wade foxx I ceo',
    link: 'https://www.instagram.com/jason__stone/?hl=en'
  },
  {
    id: 1,
    title: 'A brief introduction to MMNFT utilities',
    label: 'business',
    image: BlogImage2,
    date: '2022-06-09T12:00:00.000Z',
    author: 'BT wade foxx I ceo',
    link: 'https://www.instagram.com/jason__stone/?hl=en'
  },
  {
    id: 2,
    title: 'Road map blog',
    label: 'business',
    image: BlogImage3,
    date: '2022-06-08T12:00:00.000Z',
    author: 'BT wade foxx I ceo',
    link: 'https://www.instagram.com/jason__stone/?hl=en'
  }
]
