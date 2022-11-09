import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'
import { useWeb3React } from '@web3-react/core'
import classNames from 'classnames'

import { SiteButton, SocialLinks } from '@/components'
import { SOCIAL_LINKS } from '@/constants'

import { useMediaDimensions } from '@hooks/useMediaDimensions'
import { useWalletConnect } from '@hooks/useWalletConnect'

import { shorterETHAddress } from '@utils/string'

import logo from '@assets/logo.png'
import { ReactComponent as CrownIco } from '@assets/red-crown.svg'
import { ReactComponent as SearchIco } from '@assets/search-ico.svg'

import './Header.css'

interface Props {}

export const Header = (props: Props) => {
  const { onClickWallet } = useWalletConnect()
  const { account, active } = useWeb3React()
  const { lg } = useMediaDimensions()
  const location = useLocation()

  const aboutUsPath = useRouteMatch(RoutesPaths.ABOUT_US)
  const roadmapPath = useRouteMatch(RoutesPaths.ROADMAP)
  const marketPath = useRouteMatch(RoutesPaths.MARKET)
  const superConferencePath = useRouteMatch(RoutesPaths.SUPER_CONFERENCE)
  const [key, setKey] = useState<number>(+new Date())

  useEffect(() => {
    setKey(+new Date())
  }, [location.pathname])

  const SocialMedia = () => (
    <div className={'menu-social'}>
      <div className="menu-social__title">Stay connected</div>
      <SocialLinks socialLinks={SOCIAL_LINKS} />
    </div>
  )

  const ConnectWalletButton = () => (
    <div className="header__web3-actions">
      <span
        className={classNames({
          'header__connect-wallet': true,
          active: active
        })}
        onClick={onClickWallet}
      >
        <CrownIco />
        {active ? shorterETHAddress(account!) : 'Connect Wallet'}
      </span>
    </div>
  )

  const RightActionButtonGroup = () => {
    return (
      <div className={'d-inline-flex'}>
        {lg && <ConnectWalletButton />}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </div>
    )
  }

  return (
    <header>
      <Container>
        <Navbar expand={'lg'} key={key} className="header__navbar-menu">
          <Navbar.Brand>
            <Link to={RoutesPaths.MAIN}>
              <img src={logo} alt="Logo" className="d-inline-block align-top" />
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav.Link
              as={Link}
              active={aboutUsPath?.isExact}
              to={RoutesPaths.ABOUT_US}
            >
              who we are
            </Nav.Link>

            <Nav.Link
              as={Link}
              active={roadmapPath?.isExact}
              to={RoutesPaths.ROADMAP}
            >
              Our roadmap
            </Nav.Link>
            <Nav.Link
              as={Link}
              active={superConferencePath?.isExact}
              to={RoutesPaths.SUPER_CONFERENCE}
            >
              Super Conference
            </Nav.Link>
            {!lg && (
              <>
                <ConnectWalletButton />
                <SocialMedia />
              </>
            )}
          </Navbar.Collapse>

          <RightActionButtonGroup />
        </Navbar>
      </Container>
    </header>
  )
}
