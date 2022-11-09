import React, { useMemo, useState } from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import classNames from 'classnames'
import { FormikHelpers, useFormik } from 'formik'
import * as yup from 'yup'

import {
  NormalizedCollectionInfo,
  SiteButton,
  SocialLinks,
  Spinner
} from '@/components'
import { SOCIAL_LINKS } from '@/constants'

import { SuccessWhitelistModal } from '@components/Whitelist/SuccessWhitelistModal'

import { whitelistGetters } from '@contracts/getters/collectionGetters'
import { useWhitelist } from '@contracts/hooks/useWhitelist'

import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

import './WhitelistForm.css'

export interface WLFormValues {
  email: string
  telegram_link: string | null
  twitter_link: string | null
  follow_twitter?: boolean
  follow_telegram?: boolean
  follow_discord?: boolean
}

const twitterNameRegex = /^[A-Za-z0-9_]{1,15}$/

const getValidationSchema = (collection: NormalizedCollectionInfo) => {
  return yup.object().shape({
    ...(whitelistGetters.getIsEmailRequired(collection)
      ? {
          email: yup
            .string()
            .trim()
            .email('Write email in correct format')
            .required('Email is required')
        }
      : {
          email: yup
            .string()
            .trim()
            .email('Write email in correct format')
            .optional()
        }),
    ...(whitelistGetters.getIsTelegramRequired(collection)
      ? {
          telegram_link: yup
            .string()
            .trim()
            .required('Telegram profile is required')
        }
      : {
          telegram_link: yup.string().trim().optional()
        }),
    ...(whitelistGetters.getIsTwitterRequired(collection)
      ? {
          twitter_link: yup
            .string()
            .trim()
            .matches(twitterNameRegex, {
              message:
                'Username can contain only latin letters, numbers and underscores',
              excludeEmptyString: true
            })
            .required('Twitter profile is required')
        }
      : {
          twitter_link: yup
            .string()
            .trim()
            .matches(twitterNameRegex, {
              message:
                'Username can contain only latin letters, numbers and underscores',
              excludeEmptyString: true
            })
            .optional()
        }),
    ...(whitelistGetters.getIsFollowTwitterRequired(collection)
      ? {
          follow_twitter: yup.bool().required().oneOf([true])
        }
      : {}),
    ...(whitelistGetters.getIsFollowTelegramRequired(collection)
      ? {
          follow_telegram: yup.bool().required().oneOf([true])
        }
      : {}),
    ...(whitelistGetters.getIsFollowDSRequired(collection)
      ? {
          follow_discord: yup.bool().required().oneOf([true])
        }
      : {})
  })
}

interface Props {
  collection: NormalizedCollectionInfo
}

export const WhitelistForm = ({ collection }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [failed, setFailed] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const { applyToWhitelist } = useWhitelist(
    collection.project_id,
    collection.id
  )

  const isEmailRequired = useMemo(
    () => whitelistGetters.getIsEmailRequired(collection),
    [collection]
  )
  const isTelegramRequired = useMemo(
    () => whitelistGetters.getIsTelegramRequired(collection),
    [collection]
  )
  const isTwitterRequired = useMemo(
    () => whitelistGetters.getIsTwitterRequired(collection),
    [collection]
  )
  const isFollowDSRequired = useMemo(
    () => whitelistGetters.getIsFollowDSRequired(collection),
    [collection]
  )
  const isFollowTwitterRequired = useMemo(
    () => whitelistGetters.getIsFollowTwitterRequired(collection),
    [collection]
  )
  const isFollowTelegramRequired = useMemo(
    () => whitelistGetters.getIsFollowTelegramRequired(collection),
    [collection]
  )

  const initialValues: WLFormValues = {
    email: '',
    telegram_link: '',
    twitter_link: '',
    ...(isFollowTwitterRequired
      ? {
          follow_twitter: false
        }
      : {}),
    ...(isFollowTelegramRequired
      ? {
          follow_telegram: false
        }
      : {}),
    ...(isFollowDSRequired
      ? {
          follow_discord: false
        }
      : {})
  }

  const onSubmitHandler = async (
    values: WLFormValues,
    formikHelpers: FormikHelpers<WLFormValues>
  ) => {
    if (loading) {
      return
    }
    setFailed(false)
    setLoading(true)
    const status = await applyToWhitelist({
      ...values,
      telegram_link: values.telegram_link
        ? `https://t.me/${values.telegram_link}`
        : '',
      twitter_link: values.twitter_link
        ? `https://twitter.com/${values.twitter_link}`
        : ''
    })
    setLoading(false)
    if (status) {
      formikHelpers.resetForm({ values: { ...initialValues } })
      setShowSuccessModal(true)
    } else {
      setFailed(true)
    }
  }

  const { errors, touched, handleSubmit, isValid, getFieldProps } = useFormik({
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: getValidationSchema(collection),
    onSubmit: onSubmitHandler,
    initialValues
  })

  return (
    <Form noValidate onSubmit={handleSubmit} className="whitelist-form tile">
      <h2 className="title">Get on the whitelist now!</h2>
      <Form.Group controlId="email">
        <Form.Label>Email address {isEmailRequired && '*'}</Form.Label>
        <Form.Control
          type="email"
          placeholder="username@email.com"
          {...getFieldProps('email')}
          isValid={touched.email && !errors.email}
          isInvalid={touched.email && !!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="telegram_link">
        <Form.Label>
          Telegram profile link {isTelegramRequired && '*'}
        </Form.Label>
        <InputGroup
          className={classNames({
            'is-invalid': touched.telegram_link && !!errors.telegram_link
          })}
        >
          <InputGroup.Prepend>https://t.me/</InputGroup.Prepend>
          <Form.Control
            type="url"
            placeholder="username"
            {...getFieldProps('telegram_link')}
            isValid={touched.telegram_link && !errors.telegram_link}
            isInvalid={touched.telegram_link && !!errors.telegram_link}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.telegram_link}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="twitter_link">
        <Form.Label>Twitter profile link {isTwitterRequired && '*'}</Form.Label>
        <InputGroup
          className={classNames({
            'is-invalid': touched.twitter_link && !!errors.twitter_link
          })}
        >
          <InputGroup.Prepend>https://twitter.com/</InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="username"
            {...getFieldProps('twitter_link')}
            isValid={touched.twitter_link && !errors.twitter_link}
            isInvalid={touched.twitter_link && !!errors.twitter_link}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.twitter_link}
        </Form.Control.Feedback>
      </Form.Group>
      {isFollowTwitterRequired && (
        <Form.Row>
          <Form.Group controlId="follow_twitter">
            <Form.Check
              label={`Follow ${collection.name} on Twitter`}
              {...getFieldProps('follow_twitter')}
              isInvalid={touched.follow_twitter && !!errors.follow_twitter}
            />
          </Form.Group>
          <SiteButton
            href={collection.whitelisting.fields.follow_twitter_url as string}
            color="RED"
          >
            Open on twitter
          </SiteButton>
        </Form.Row>
      )}
      {isFollowTelegramRequired && (
        <Form.Row>
          <Form.Group controlId="follow_telegram">
            <Form.Check
              label={`Follow ${collection.name} on Telegram`}
              {...getFieldProps('follow_telegram')}
              isInvalid={touched.follow_telegram && !!errors.follow_telegram}
            />
          </Form.Group>
          <SiteButton
            href={collection.whitelisting.fields.follow_telegram_url as string}
            color="RED"
          >
            Open on telegram
          </SiteButton>
        </Form.Row>
      )}
      {isFollowDSRequired && (
        <Form.Row>
          <Form.Group controlId="follow_discord">
            <Form.Check
              label={`Follow ${collection.name} on Discord`}
              {...getFieldProps('follow_discord')}
              isInvalid={touched.follow_discord && !!errors.follow_discord}
            />
          </Form.Group>
          <SiteButton
            href={collection.whitelisting.fields.follow_discord_url as string}
            color="RED"
          >
            Open on discord
          </SiteButton>
        </Form.Row>
      )}
      <SiteButton type="submit" size="large" disabled={!isValid || loading}>
        {loading ? <Spinner /> : <span>Send</span>}
      </SiteButton>
      {failed && (
        <div className="form-message form-message--warning text-center mt-3">
          <InfoIcon />
          <span>
            Oops! Your application was not submitted. Check your data and try
            again
          </span>
        </div>
      )}
      <SuccessWhitelistModal
        collectionId={collection.id}
        show={showSuccessModal}
      />

      <StayConnectedComponent />
    </Form>
  )
}

const StayConnectedComponent = () => {
  return (
    <div className={'stay-connected'}>
      <div className="stay-connected__title">Stay connected</div>

      <SocialLinks socialLinks={SOCIAL_LINKS} />
    </div>
  )
}
