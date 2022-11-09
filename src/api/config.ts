import axios from 'axios'

import { sendEnvExceptionReport } from '@utils/errors'

import {
  signatureInterceptorCallback,
  walletAddressInterceptor
} from './interceptors'

const apiUrl = process.env.REACT_APP_API_SERVER_URL

if (!apiUrl) {
  // eslint-disable-next-line
  sendEnvExceptionReport(new Error("API url isn't provided"))
}

const instance = axios.create({
  baseURL: apiUrl
})

const instanceWithSignature = axios.create({
  baseURL: apiUrl
})

instance.interceptors.request.use(walletAddressInterceptor)
instanceWithSignature.interceptors.request.use(walletAddressInterceptor)
instanceWithSignature.interceptors.request.use(signatureInterceptorCallback)

export { instance, instanceWithSignature }
