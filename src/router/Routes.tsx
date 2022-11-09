import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom'
import { useGasPrice } from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'

import { Calendar } from '@/pages'

import {
  Footer,
  Header,
  ScrollRestoration,
  ScrollToTop,
  Spinner,
  WrongNetworkModal
} from '@components/index'

import { sendExceptionReport } from '@utils/errors'

import { RoutesPaths } from './constants'

const AboutUs = React.lazy(() => import('@pages/AboutUs/AboutUs'))
const CollectionDetails = React.lazy(
  () => import('@pages/CollectionDetails/CollectionDetails')
)
const Collections = React.lazy(() => import('@pages/Collections/Collections'))
const Landing = React.lazy(() => import('@pages/Landing/Landing'))
const Market = React.lazy(() => import('@pages/Market/Market'))
const MyCollection = React.lazy(
  () => import('@pages/MyCollection/MyCollection')
)
const NFTAuctionPage = React.lazy(
  () => import('@pages/NFTAuctionPage/NFTAuctionPage')
)
const NFTPage = React.lazy(() => import('@pages/NFTPage/NFTPage'))
const Roadmap = React.lazy(() => import('@pages/Roadmap/Roadmap'))
const Wallet = React.lazy(() => import('@pages/Wallet/Wallet'))
const Whitelist = React.lazy(() => import('@pages/Whitelist/Whitelist'))
const SuperConference = React.lazy(
  () => import('@pages/SuperConference/SuperConference')
)

const Routes = () => {
  const { chainId } = useWeb3React()
  const { getGasPrice } = useGasPrice()

  let gasPriceListener: ReturnType<typeof setInterval>

  const gasPriceCall = useCallback(async () => {
    try {
      await getGasPrice()
    } catch (err) {
      sendExceptionReport(err)
    }
  }, [getGasPrice])

  useEffect(() => {
    gasPriceCall()
    gasPriceListener = setInterval(gasPriceCall, 30000)

    return () => clearInterval(gasPriceListener)
  }, [chainId])

  return (
    <BrowserRouter>
      <RoutesComponents />
    </BrowserRouter>
  )
}

const RoutesComponents = () => {
  const { error, account } = useWeb3React()
  const whitelistPath = useRouteMatch(RoutesPaths.WHITELIST)
  return (
    <ScrollRestoration>
      {!whitelistPath?.isExact && <Header />}
      <React.Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={RoutesPaths.MAIN} component={Landing} />
          <Route
            exact
            path={RoutesPaths.ACCOUNT.MY_COLLECTIONS}
            component={account ? MyCollection : Wallet}
          />
          <Route exact path={RoutesPaths.ABOUT_US} component={AboutUs} />
          <Route exact path={RoutesPaths.COLLECTIONS} component={Collections} />
          <Route
            exact
            path={RoutesPaths.COLLECTION_DETAILS}
            component={CollectionDetails}
          />
          <Route exact path={RoutesPaths.NFT_ASSET} component={NFTPage} />
          <Route
            exact
            path={RoutesPaths.ASSET_AUCTION}
            component={NFTAuctionPage}
          />
          <Route exact path={RoutesPaths.WHITELIST} component={Whitelist} />
          <Route exact path={RoutesPaths.ROADMAP} component={Roadmap} />
          <Route exact path={RoutesPaths.MARKET} component={Market} />
          <Route exact path={RoutesPaths.CALENDAR} component={Calendar} />
          <Route
            exact
            path={RoutesPaths.SUPER_CONFERENCE}
            component={SuperConference}
          />
          <Route path="/*" component={Landing} />
        </Switch>
      </React.Suspense>
      <ScrollToTop />
      <WrongNetworkModal error={error} />
      {!whitelistPath?.isExact && <Footer />}
    </ScrollRestoration>
  )
}
export default Routes
