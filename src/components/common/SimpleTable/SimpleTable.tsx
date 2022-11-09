import React from 'react'

import { Spinner } from '../Spinner'

import './SimpleTable.css'

export interface TableColumn {
  id: string
  title: string
  width?: number
  headerClass?: string
  bodyClass?: string
}

export interface TableData {
  [k: TableColumn['id']]: React.ReactNode
}

interface Props {
  wrapperClass?: string
  tableClass?: string
  columns: TableColumn[]
  data: TableData[]
  loading: boolean
  rowClass?: string | ((item: TableData, index?: number) => string | undefined)
}

const SimpleTable = ({
  columns,
  data,
  tableClass,
  wrapperClass,
  loading,
  rowClass
}: Props) => {
  const renderRow = (item: TableData, index: number) => {
    const rowClassName = rowClass
      ? typeof rowClass === 'string'
        ? rowClass
        : rowClass(item, index)
      : ''

    return (
      <tr key={index} className={`simple-table__row ${rowClassName}`}>
        {columns.map((col) => (
          <td
            key={`${index}-${col.id}`}
            className={col.bodyClass}
            width={col.width}
          >
            <div className="simple-table__cell">{item[col.id]}</div>
          </td>
        ))}
      </tr>
    )
  }

  return (
    <div className={`simple-table-wrapper ${wrapperClass ?? ''}`}>
      <table className={`simple-table ${tableClass ?? ''}`}>
        <thead className="simple-table__head">
          <tr className="simple-table__head-row">
            {columns.map((col) => (
              <th className={col.headerClass} key={col.id}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="simple-table__body">
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="simple-table__empty-cell">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : !data.length ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="simple-table__empty-cell text-big">
                  <span>No data is available now</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  )
}

SimpleTable.defaultProps = {
  loading: false
}

export { SimpleTable }
