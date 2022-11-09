import React, { useCallback, useMemo, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useNetwork } from '@firestarter-private/firestarter-library'
import {
  defaultEnvironmentNetworkId,
  NetworkId,
  NetworkInfo
} from '@firestarter-private/firestarter-library/lib/constants/networks'

import { RoundButton, RoundButtonProps } from '../RoundButton'
import { Spinner } from '../Spinner'

type Props = Pick<RoundButtonProps, 'color' | 'size' | 'wide' | 'className'> & {
  text?: React.ReactNode
  networkId: NetworkId
}

const AddNetworkButton = ({
  color,
  size,
  wide,
  className,
  text,
  networkId
}: Props) => {
  const [loading, setLoading] = useState(false)
  const { getNetwork, switchNetwork } = useNetwork()

  const networkToSwitch = useMemo(
    () => getNetwork(networkId),
    [getNetwork, networkId]
  )

  const displayName = useMemo(
    () => networkToSwitch.userFriendlyName,
    [networkToSwitch]
  )

  const addNetwork = useCallback(async () => {
    if (!loading) {
      setLoading(true)
      await switchNetwork(networkId)
      setLoading(false)
    }
  }, [switchNetwork, loading])

  const getNetworkIcon = (network: NetworkInfo): string => {
    return `/networks/${network.icon}.png`
  }

  return (
    <RoundButton
      className={`add-network-button ${className}`}
      type="button"
      color={color}
      size={size}
      wide={wide}
      disabled={loading}
      onClick={addNetwork}
    >
      <span>
        {text} {displayName}
      </span>

      {loading ? (
        <Spinner />
      ) : (
        <Image
          className="ms-1"
          src={getNetworkIcon(networkToSwitch)}
          width={22}
          height={21}
        />
      )}
    </RoundButton>
  )
}

AddNetworkButton.defaultProps = {
  color: 'LIGHT',
  size: 'small',
  wide: false,
  text: 'Switch to',
  networkId: defaultEnvironmentNetworkId
}

export { AddNetworkButton }
