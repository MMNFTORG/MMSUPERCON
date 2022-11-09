import EducationIco1 from '@assets/Landing/education/Ecommerce.svg'
import EducationIco4 from '@assets/Landing/education/Fitness.svg'
import EducationIco2 from '@assets/Landing/education/Law.svg'
import EducationIco9 from '@assets/Landing/education/PersonalDevelopment.svg'
import EducationIco8 from '@assets/Landing/education/RealEstate.svg'
import EducationIco6 from '@assets/Landing/education/SalesAndMarketing.svg'
import EducationIco7 from '@assets/Landing/education/SocialMedia.svg'
import EducationIco3 from '@assets/Landing/education/Taxes.svg'
import EducationIco5 from '@assets/Landing/education/web3.svg'

export interface IEducationItem {
  ico: string
  title: string
  description: string
}
/* eslint-disable */
export const EDUCATIONS: Array<IEducationItem> = [
  {
    title: 'Ecommerce',
    description:
      'Staying on top of the latest trends in eCommerce can be difficult for companies. You need to stay ahead, keep up with changing environments ...',
    ico: EducationIco1
  },
  {
    title: 'Law',
    description:
      'Legal advice is an investment in your future. Learn how to set up the best possible foundation for yourself and your business in this new web3 era',
    ico: EducationIco2
  },
  {
    title: 'Taxes',
    description:
      'How crypto taxes will affect you! Learn the best tax strategy advice and how to save millions of dollars and learn from top professionals',
    ico: EducationIco3
  },
  {
    title: 'Fitness',
    description:
      "Health is wealth! It's time to learn cutting edge health and fitness tips from world's top athletes and performers, with an web3 twist",
    ico: EducationIco4
  },
  {
    title: 'Web3',
    description:
      "Bringing together today's brightest Web3, NFT, and Metaverse experts from around the world",
    ico: EducationIco5
  },
  {
    title: 'Sales and Marketing',
    description:
      'Learn new Cutting edge sales tactics and online marketing for your business',
    ico: EducationIco6
  },
  {
    title: 'Social Media',
    description:
      'Learn some of the best viral strategies to grow your brand and business on social media and stay relevant',
    ico: EducationIco7
  },
  {
    title: 'Real Estate',
    description:
      'Learn how brokerages will need to incorporate crypto into their listings and the latest marketing trends in real estate',
    ico: EducationIco8
  },
  {
    title: 'Personal Development',
    description:
      'Learn new Cutting edge sales tactics and online marketing for your business',
    ico: EducationIco9
  }
]
