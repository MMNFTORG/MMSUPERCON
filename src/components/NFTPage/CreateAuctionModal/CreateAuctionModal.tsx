import React, { useState } from 'react'
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'
// @ts-ignore
import TimezonePicker from 'react-bootstrap-timezone-picker'
import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment-timezone'
import * as yup from 'yup'

import { RoundButton, Spinner, TokenInfo } from '@components/index'
import { DatePeriodPicker } from '@components/NFTPage/DatePeriodPicker'

import { numberToUint256 } from '@utils/currency'

import { ReactComponent as CloseIcon } from '@assets/close.svg'
import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css'
import './CreateAuctionModal.scss'

interface Props {
  onCreate: (input: any) => Promise<void>
  show: boolean
  decimals: number
  setShow: any
  fundToken: TokenInfo
}

export interface CreateAuctionFormValues {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  name: string
  reservePrice: number
  bidIncrement: number
}

const getValidationSchema = () => {
  return yup.object().shape({
    startDate: yup.date().required('Start date is required'),
    startTime: yup.string().required('Start time is required'),
    endDate: yup.date().required('End date is required'),
    endTime: yup.string().required('End time is required'),
    name: yup.string().required('Name is required'),
    reservePrice: yup.number().required('Reserve price is required'),
    bidIncrement: yup.number().required('Bid increment is required')
  })
}

export const CreateAuctionModal = ({
  onCreate,
  show,
  setShow,
  decimals,
  fundToken
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [failed, setFailed] = useState<boolean>(false)
  const [timeZone, setTimeZone] = useState<string>(moment.tz.guess())

  const initialValues: CreateAuctionFormValues = {
    startDate: new Date().toLocaleDateString(),
    startTime: '00:00',
    endDate: new Date().toLocaleDateString(),
    endTime: '00:00',
    name: '',
    reservePrice: 5,
    bidIncrement: 5
  }

  const onSubmitHandler = async (
    values: CreateAuctionFormValues,
    formikHelpers: FormikHelpers<CreateAuctionFormValues>
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

    const contractStartTime: number =
      +getDateWithTimeZone(values.startDate, values.startTime) / 1000
    const contractEndTime: number =
      +getDateWithTimeZone(values.endDate, values.endTime) / 1000

    try {
      await onCreate({
        startTime: contractStartTime,
        endTime: contractEndTime,
        name: values.name,
        bidIncrement: numberToUint256(values.bidIncrement, decimals),
        reservePrice: numberToUint256(values.reservePrice, decimals)
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
      <Modal.Title as="h4">Create Auction</Modal.Title>
      <Modal.Body className="p-0">
        <div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Auction name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Top NFT"
                {...getFieldProps('name')}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

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
              dateFieldName={'startDate'}
              timeFieldName={'startTime'}
              label={'Start time'}
              setFieldValue={setFieldValue}
            />

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
                  Oops! Your auction isn't created. Check your data and try
                  again
                </span>
              </div>
            )}

            <div className={'text-center'}>
              <RoundButton
                type="submit"
                size="large"
                disabled={!isValid || loading}
              >
                {loading ? <Spinner /> : <span>Create</span>}
              </RoundButton>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}
