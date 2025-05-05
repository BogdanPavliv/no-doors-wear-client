'use client'
import { IOrderDetailsValues, INodoorsAddressData } from '@/types/order'
import {
  getNodoorsOfficesByCityFx,
  order,
  setCashPaymentTb,
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierAddressData,
  setCourierTab,
  setMapInstance,
  setOnlinePaymentTb,
  setOrderDetailsValues,
  setPickupTab,
  setShouldLoadNodoorsData,
  setShouldShowCourierAddressData,
} from '.'

export const $nodoorsDataByCity = order
  .createStore<INodoorsAddressData[]>([])
  .on(getNodoorsOfficesByCityFx.done, (_, { result }) => result)

export const $pickupTab = order
  .createStore<boolean>(true)
  .on(setPickupTab, (_, value) => value)

export const $courierTab = order
  .createStore<boolean>(false)
  .on(setCourierTab, (_, value) => value)

export const $mapInstance = order
  .createStore<any>({})
  .on(setMapInstance, (_, map) => map)

export const $shouldLoadNodoorsData = order
  .createStore(false)
  .on(setShouldLoadNodoorsData, (_, value) => value)

export const $chosenPickupAddressData = order
  .createStore<Partial<INodoorsAddressData>>({})
  .on(setChosenPickupAddressData, (_, value) => value)

export const $chosenCourierAddressData = order
  .createStore<Partial<INodoorsAddressData>>({})
  .on(setChosenCourierAddressData, (_, value) => value)

export const $shouldShowCourierAddressData = order
  .createStore(false)
  .on(setShouldShowCourierAddressData, (_, value) => value)

export const $courierAddressData = order
  .createStore<INodoorsAddressData>({} as INodoorsAddressData)
  .on(setCourierAddressData, (_, value) => value)

export const $onlinePaymentTab = order
  .createStore<boolean>(true)
  .on(setOnlinePaymentTb, (_, value) => value)

export const $cashPaymentTab = order
  .createStore<boolean>(false)
  .on(setCashPaymentTb, (_, value) => value)

export const $orderDetailsValues = order
  .createStore<IOrderDetailsValues>({} as IOrderDetailsValues)
  .on(setOrderDetailsValues, (_, value) => value)
