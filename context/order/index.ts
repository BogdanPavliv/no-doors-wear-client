'use client'
import toast from 'react-hot-toast'
import { createDomain } from 'effector'
import {
  IgetNodoorsOfficesByCityFx,
  IMakePaymentFx,
  IOrderDetailsValues,
  IPaymentNotifyFx,
  INodoorsAddressData,
} from '@/types/order'
import api from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'

export const order = createDomain()
export const setPickupTab = order.createEvent<boolean>()
export const setCourierTab = order.createEvent<boolean>()
export const setMapInstance = order.createEvent<any>()
export const setShouldLoadNodoorsData = order.createEvent<boolean>()
export const setChosenPickupAddressData =
  order.createEvent<Partial<INodoorsAddressData>>()
export const setChosenCourierAddressData =
  order.createEvent<Partial<INodoorsAddressData>>()
export const setShouldShowCourierAddressData = order.createEvent<boolean>()
export const getNodoorsOfficesByCity =
  order.createEvent<IgetNodoorsOfficesByCityFx>()
export const setCourierAddressData = order.createEvent<INodoorsAddressData>()
export const setOnlinePaymentTb = order.createEvent<boolean>()
export const setCashPaymentTb = order.createEvent<boolean>()
export const makePayment = order.createEvent<IMakePaymentFx>()
export const setOrderDetailsValues = order.createEvent<IOrderDetailsValues>()

export const getNodoorsOfficesByCityFx = order.createEffect(
  async ({ city, lang }: IgetNodoorsOfficesByCityFx) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
      const baseUrl = `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${apiKey}`
      const { data } = await api.get(`${baseUrl}&text=${city}&lang=${lang}`)
      const nodoorsData = await api.get(
        `${baseUrl}&text=nodoors&filter=place:${data.results[0].place_id}`
      )

      return nodoorsData.data.results
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const makePaymentFx = order.createEffect(
  async ({ jwt, amount, description, metadata }: IMakePaymentFx) => {
    try {
      const { data } = await api.post(
        '/api/payment',
        { amount, description, metadata },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        handleJWTError(data.error.name, {
          repeatRequestMethodName: 'makePaymentFx',
          payload: { amount, description },
        })
      }

      localStorage.setItem('paymentId', JSON.stringify(data.result.id))
      window.location.href = data.result.confirmation.confirmation_url
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const checkPaymentFx = order.createEffect(
  async ({ paymentId }: { paymentId: string }) => {
    try {
      const { data } = await api.post('/api/payment/check', { paymentId })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const paymentNotifyFx = order.createEffect(
  async ({ message, email }: IPaymentNotifyFx) => {
    try {
      const { data } = await api.post('/api/payment/notify', { message, email })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
