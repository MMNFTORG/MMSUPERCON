import React, { useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
// @ts-ignore
import TimezonePicker from 'react-bootstrap-timezone-picker'
import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment-timezone'
import * as yup from 'yup'

import { RoundButton, Spinner, TokenInfo } from '@components/index'
import { DatePeriodPicker } from '@components/NFTPage/DatePeriodPicker'

import { numericToBalance } from '@utils/currency'

import { ReactComponent as CloseIcon } from '@assets/close.svg'
import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

interface Props {
  onReset: (input: any) => Promise<void>
  show: boolean
  newReservePrice: number
  decimals: number
  setShow: any
  fundToken: TokenInfo
}

export interface ResetAuctionFormValues {
  endDate: string
  endTime: string
  reservePrice: number
  bidIncrement: number
}

const getValidationSchema = () => {
  return yup.object().shape({
    endDate: yup.date().required('End date is required'),
    endTime: yup.string().required('End time is required'),
    reservePrice: yup.number().required('Reserve price is required'),
    bidIncrement: yup.number().required('Bid increment is required')
  })
}

export const ResetAuctionModal = ({
  onReset,
  show,
  setShow,
  newReservePrice,
  decimals,
  fundToken
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [failed, setFailed] = useState<boolean>(false)
  const [timeZone, setTimeZone] = useState<string>(moment.tz.guess())

  const initialValues: ResetAuctionFormValues = {
    endDate: new Date().toLocaleDateString(),
    endTime: '00:00',
    reservePrice: newReservePrice,
    bidIncrement: 5
  }

  const onSubmitHandler = async (
    values: ResetAuctionFormValues,
    formikHelpers: FormikHelpers<ResetAuctionFormValues>
  ) => {
    if (loading) {
      return
    }
    setFailed(false)
    setLoading(true)

    const getDateWithTimeZone = (date: string, time: string): Date => {
      const zoneOffset = moment.tz(timeZone).format('Z')
      return new Date(`${date} ${time}${zoneOffset}`)
    }
    const contractEndTime: number =
      +getDateWithTimeZone(values.endDate, values.endTime) / 1000

    try {
      await onReset({
        endTime: contractEndTime,
        bidIncrement: numericToBalance(String(values.bidIncrement), decimals),
        reservePrice: numericToBalance(String(values.reservePrice), decimals)
      })
      setLoading(false)
      formikHelpers.resetForm({ values: { ...initialValues } })
      setShow(false)
    } catch (e) {
      setLoading(false)
      setFailed(true)
    }
  }

  const {
    errors,
    touched,
    handleSubmit,
    isValid,
    getFieldProps,
    setFieldValue
  } = useFormik({
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: getValidationSchema(),
    onSubmit: onSubmitHandler,
    initialValues
  })

  return (
    <Modal
      show={show}
      centered
      className="create-auction-modal"
      contentClassName="tile"
      onHide={() => setShow(false)}
      onBackdropClick={() => setShow(false)}
      backdrop="static"
    >
      <button className="close-button" onClick={() => setShow(false)}>
        <CloseIcon />
      </button>
      <Modal.Title as="h4">Update Auction</Modal.Title>
      <Modal.Body className="p-0">
        <div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Time zone</Form.Label>

              <div>
                <TimezonePicker
                  absolute={false}
                  defaultValue={moment.tz.guess()}
                  placeholder="Select timezone..."
                  onChange={(tz: string) => setTimeZone(tz)}
                />
              </div>
            </Form.Group>

            <DatePeriodPicker
              touched={touched}
              errors={errors}
              getFieldProps={getFieldProps}
              dateFieldName={'endDate'}
              timeFieldName={'endTime'}
              label={'End Time'}
              setFieldValue={setFieldValue}
            />

            <Form.Group controlId="reservePrice">
              <Form.Label>Reserve price</Form.Label>
              <Row className={'align-items-center'}>
                <Col xs={9}>
                  <Form.Control
                    type="number"
                    placeholder="5"
                    {...getFieldProps('reservePrice')}
                    isValid={touched.reservePrice && !errors.reservePrice}
                    isInvalid={touched.reservePrice && !!errors.reservePrice}
                  />
                </Col>
                <Col xs={3}>
                  <span className="token-name">{fundToken.name}</span>
                </Col>
              </Row>
              <Form.Control.Feedback type="invalid">
                {errors.reservePrice}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="bidIncrement">
              <Form.Label>Bid increment</Form.Label>

              <Row className={'align-items-center'}>
                <Col xs={9}>
                  <Form.Control
                    type="number"
                    placeholder="5"
                    {...getFieldProps('bidIncrement')}
                    isValid={touched.bidIncrement && !errors.bidIncrement}
                    isInvalid={touched.bidIncrement && !!errors.bidIncrement}
                  />
                </Col>
                <Col xs={3}>
                  <span className="token-name">{fundToken.name}</span>
                </Col>
              </Row>

              <Form.Control.Feedback type="invalid">
                {errors.bidIncrement}
              </Form.Control.Feedback>
            </Form.Group>

            {failed && (
              <div className="form-message form-message--warning text-center mt-3">
                <InfoIcon />
                <span>
                  Oops! Your auction isn't reset. Check your data and try again
                </span>
              </div>
            )}

            <div className={'text-center'}>
              <RoundButton
                type="submit"
                size="large"
                disabled={!isValid || loading}
              >
                {loading ? <Spinner /> : <span>Update</span>}
              </RoundButton>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}
