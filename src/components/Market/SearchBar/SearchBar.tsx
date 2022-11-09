import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

import { DynamicImage } from '@/components'

import './SearchBar.scss'

export const SearchBar = () => {
  return (
    <div className={'searchbar'}>
      <InputGroup size={'sm'}>
        <InputGroup.Prepend>
          <button>
            <DynamicImage path={'search-icon.svg'} />
          </button>
        </InputGroup.Prepend>

        <FormControl placeholder="Search" type="text" />
      </InputGroup>
    </div>
  )
}
