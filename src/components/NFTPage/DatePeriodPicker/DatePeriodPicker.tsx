import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
// @ts-ignore
import TimePicker from 'react-bootstrap-time-picker'
import { addSeconds, format } from 'date-fns'

interface IDatePeriodPickerProps {
  getFieldProps: (name: string) => Record<string, any>
  touched: Record<string, any>
  errors: Record<string, any>
  dateFieldName: string
  timeFieldName: string
  label: string
  setFieldValue: (name: string, value: any) => void
}

export const DatePeriodPicker = ({
  getFieldProps,
  dateFieldName,
  timeFieldName,
  errors,
  label,
  touched,
  setFieldValue
}: IDatePeriodPickerProps) => {
  const timeFieldProps = getFieldProps(timeFieldName)

  const convertHM = (seconds: number) => {
    const helperDate = addSeconds(new Date(0), seconds)
    return format(helperDate, 'HH:mm')
  }

  const convertToSecond = (time: string) => {
    const [hours, minutes] = time.split(':')
    return +hours * 3600 + +minutes * 60
  }

  return (
    <div>
      <Form.Group controlId={dateFieldName}>
        <Form.Label>{label}</Form.Label>
        <Row>
          <Col md={6}>
            <Form.Control
              type="date"
              {...getFieldProps(dateFieldName)}
              isValid={touched[dateFieldName] && !errors[dateFieldName]}
              isInvalid={touched[dateFieldName] && !!errors[dateFieldName]}
              min={new Date().toLocaleDateString('en-ca')}
            />
          </Col>
          <Col md={6}>
            <TimePicker
              start="00:00"
              end="24:00"
              step={30}
              {...timeFieldProps}
              value={convertToSecond(timeFieldProps.value)}
              onChange={(e: number) =>
                setFieldValue(timeFieldName, convertHM(e))
              }
            />
          </Col>
        </Row>

        <Form.Control.Feedback type="invalid">
          {errors[dateFieldName]}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  )
}
