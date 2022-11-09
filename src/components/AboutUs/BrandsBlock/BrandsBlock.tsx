import React from 'react'
import { Image } from 'react-bootstrap'

import BrandLogo5 from '@assets/about-us/brands/Adidas.png'
import BrandLogo8 from '@assets/about-us/brands/Blueprint.png'
import BrandLogo14 from '@assets/about-us/brands/BSM.png'
import BrandLogo11 from '@assets/about-us/brands/e40.png'
import BrandLogo3 from '@assets/about-us/brands/Ea.png'
import BrandLogo7 from '@assets/about-us/brands/ecco.png'
import BrandLogo10 from '@assets/about-us/brands/ESGN.png'
import BrandLogo6 from '@assets/about-us/brands/Hennessy.png'
import BrandLogo13 from '@assets/about-us/brands/Lagree.png'
import BrandLogo2 from '@assets/about-us/brands/Netflix.png'
import BrandLogo1 from '@assets/about-us/brands/Nike.png'
import BrandLogo15 from '@assets/about-us/brands/Soles.png'
import BrandLogo4 from '@assets/about-us/brands/Spotify.png'
import BrandLogo9 from '@assets/about-us/brands/stock.png'
import BrandLogo12 from '@assets/about-us/brands/Waka.png'

import './BrandsBlock.scss'

interface IBrandsBlockProps {}

const BRANDS: Array<Record<string, string>> = [
  {
    image: BrandLogo1
  },
  {
    image: BrandLogo2
  },
  {
    image: BrandLogo3
  },
  {
    image: BrandLogo4
  },
  {
    image: BrandLogo5
  },
  {
    image: BrandLogo6
  },
  {
    image: BrandLogo7
  },
  {
    image: BrandLogo8
  },
  {
    image: BrandLogo9
  },
  {
    image: BrandLogo10
  },
  {
    image: BrandLogo11
  },
  {
    image: BrandLogo12
  },
  {
    image: BrandLogo13
  },
  {
    image: BrandLogo14
  },
  {
    image: BrandLogo15
  }
]

export const BrandsBlock = ({}: IBrandsBlockProps): JSX.Element => {
  return (
    <div className="brands-block">
      {BRANDS.map((item) => (
        <div className={'brands-block__item'} key={item.image}>
          <Image src={item.image} />
        </div>
      ))}
    </div>
  )
}
