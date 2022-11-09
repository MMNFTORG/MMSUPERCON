import { captureException, Severity, withScope } from '@sentry/react'
import { Context, Primitive } from '@sentry/types'

export const ignoreErrors = [
  /.*Non-Error promise rejection captured with keys.*/gm,
  /.*User denied transaction signature.*/gm,
  /.*requesting data from a block number that does not exist.*/gm,
  /.*AbortError.*/gm,
  /.*Aborted.*/gm
]

interface ExceptionAdditionalParams {
  level?: Severity
  customContext?: { key: string; context: Context | null }
  tags?: { [p: string]: Primitive }
}

export const TAGS = {
  REASON: {
    ENV_VARIABLES: 'env_variables',
    DEVICE_DETECTION: 'device_detection'
  }
}

export const sendExceptionReport = (
  exception: any,
  params: ExceptionAdditionalParams = {}
) => {
  console.error({
    exception,
    params
  })
  withScope((scope) => {
    scope.setLevel(params?.level || Severity.Error)
    params?.customContext &&
      scope.setContext(params.customContext.key, params.customContext.context)
    params?.tags && scope.setTags(params.tags)
    captureException(exception)
  })
}

export const sendEnvExceptionReport = (exception: any) =>
  sendExceptionReport(exception, {
    tags: {
      reason: TAGS.REASON.ENV_VARIABLES
    }
  })
