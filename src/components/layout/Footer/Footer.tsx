import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import { BottomBanner, SiteButton, SocialLinks } from '@/components'
import { SOCIAL_LINKS } from '@/constants'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import FirestarterLogo from '@assets/firestarter-logo.svg'
import logo from '@assets/logo-big.png'
import SnowballLogo from '@assets/snowball-logo.svg'

import './Footer.scss'

const FooterCopyright = () => (
  <div className="footer__copyright">
    © 2022 MILLIONAIRE MENTOR.COM, ALL RIGHTS RESERVED
  </div>
)

const FooterMenu = () => (
  <Row>
    <ul className={'footer-menu'}>
      <li className={'footer-menu__item'}>
        <Link to={RoutesPaths.ABOUT_US}>who we are</Link>
      </li>
      <li className={'footer-menu__item'}>
        <Link to={RoutesPaths.ROADMAP}>Our roadmap</Link>
      </li>

      <li className={'footer-menu__item'}>
        <Link to={RoutesPaths.SUPER_CONFERENCE}>Super Conference</Link>
      </li>
    </ul>
  </Row>
)

const FooterSocialBlock = () => (
  <Col lg={4} className={'footer__social'}>
    <h4 className="footer-title">Stay connected</h4>
    <SocialLinks socialLinks={SOCIAL_LINKS} />
  </Col>
)

const FooterSubscribeForm = () => (
  <Col lg={4} className={'footer__subscribe'}>
    <h4 className="footer-title">Our newsletter</h4>
    <p>STAY UP TO DATE WITH LATEST NEWS & INFORMATIONS</p>

    <div className="contact-form">
      <form>
        <input
          type="text"
          className="contact-form__input"
          placeholder={'Your Email...'}
        />
        <SiteButton color={'RED'} size={'large'}>
          Join us
        </SiteButton>
      </form>
    </div>
  </Col>
)

export const Footer = () => {
  const { lg } = useMediaDimensions()

  return (
    <>
      <BottomBanner />

      <footer className={'footer'}>
        <Container>
          <Row>
            {lg && <FooterSubscribeForm />}

            <Col lg={4}>
              <a
                href={'/'}
                className={'d-flex justify-content-center footer__logo'}
              >
                <Image src={logo} alt={'logo'} />
              </a>
            </Col>

            {lg && <FooterSocialBlock />}
          </Row>

          <FooterMenu />

          {!lg && <FooterSubscribeForm />}

          {!lg && <FooterSocialBlock />}

          <div
            className={
              'd-flex justify-content-lg-between flex-wrap justify-content-center'
            }
          >
            <div className="footer__partnership">
              <span>In partnership with</span>
              <a href="https://firestarter.fi" target={'_blank'}>
                <Image src={FirestarterLogo} alt={'firestarter logo'} />
              </a>
              <a href="https://snowball.money" target={'_blank'}>
                <Image src={SnowballLogo} alt={'snowball logo'} />
              </a>
            </div>

            <FooterCopyright />
          </div>
        </Container>
      </footer>
    </>
  )
}
