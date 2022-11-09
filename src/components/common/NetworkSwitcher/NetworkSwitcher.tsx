import React, { useCallback, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useNetwork } from '@firestarter-private/firestarter-library'
import {
  NetworkId,
  NetworkInfo,
  supportedNetworks
} from '@firestarter-private/firestarter-library/lib/constants/networks'
import classNames from 'classnames'

import './NetworkSwitcher.css'

const getNetworkContent = (network: NetworkInfo): React.ReactNode => {
  const getNetworkIcon = (network: NetworkInfo): string => {
    return `/networks/${network.icon}.png`
  }

  return (
    <>
      <img
        className="network-switcher__icon"
        src={getNetworkIcon(network)}
        alt={network.icon.toUpperCase()}
      />
      <span className="network-switcher__text">{network.userFriendlyName}</span>
    </>
  )
}

export const NetworkSwitcher = () => {
  const [switching, setSwitching] = useState(false)

  const { currentNetwork, checkIfSelected, switchNetwork } = useNetwork()

  const handleSwitch = useCallback(
    async (id: NetworkId) => {
      setSwitching(true)
      await switchNetwork(id)
      setSwitching(false)
    },
    [switchNetwork]
  )

  if (!currentNetwork) {
    return null
  }

  return (
    <DropdownButton
      title={getNetworkContent(currentNetwork)}
      className={classNames({
        'network-switcher__dropdown': true,
        disabled: switching
      })}
      style={{ color: currentNetwork.color }}
    >
      {Object.values(supportedNetworks).map((network: NetworkInfo) => (
        <Dropdown.Item
          key={network.networkId}
          className={classNames({
            'network-switcher__item': true,
            selected: checkIfSelected(network.networkId)
          })}
          onClick={() => handleSwitch(network.networkId)}
          as={'div'}
          style={{
            color: checkIfSelected(network.networkId) ? network.color : ''
          }}
        >
          {getNetworkContent(network)}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}
