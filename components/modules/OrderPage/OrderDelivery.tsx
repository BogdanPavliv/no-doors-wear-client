'use client'
import { useUnit } from 'effector-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import {
  $chosenCourierAddressData,
  $chosenPickupAddressData,
  $courierTab,
  $pickupTab,
  $shouldShowCourierAddressData,
} from '@/context/order/state'
import OrderTitle from './OrderTitle'
import TabControls from './TabControls'
import { setCourierTab, setMapInstance, setPickupTab } from '@/context/order'
import { basePropsForMotion } from '@/constants/motion'
import { getGeolocationFx, setUserGeolocation } from '@/context/user'
import { $userGeolocation } from '@/context/user/state'
import AddressesList from './AddressesList'
import { addOverflowHiddenToBody, addScriptToHead } from '@/lib/utils/common'
import {
  SearchMarkersManager,
  handleResultClearing,
  handleResultSelection,
  handleResultsFound,
  handleSelectPickupAddress,
  initSearchMarker,
} from '@/lib/utils/map'
import { useTTMap } from '@/hooks/useTTMap'
import { IAddressBBox } from '@/types/order'
import { mapOptions } from '@/constants/map'
import { openMapModal } from '@/context/modals'
import CourierAddressInfo from './CourierAddressInfo'
import styles from '@/styles/order/index.module.scss'

const OrderDelivery = () => {
  const { lang, translations } = useLang()
  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)
 
  const labelRef = useRef() as MutableRefObject<HTMLLabelElement>
  const shouldShowCourierAddressData = useUnit($shouldShowCourierAddressData)

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }

    setPickupTab(true)
    setCourierTab(false)
  }

  const handleCourierTab = () => {
    if (courierTab) {
      return
    }

    setPickupTab(false)
    setCourierTab(true)
  }

  return (
    <>
      <OrderTitle orderNumber='2' text={translations[lang].order.delivery} />
      <div className={styles.order__list__item__delivery}>
        <TabControls
          handleTab1={handlePickupTab}
          handleTab2={handleCourierTab}
          tab1Active={pickupTab}
          tab2Active={courierTab}
          tab1Text={translations[lang].order.pickup_free}
          tab2Text={translations[lang].order.courier_delivery}
        />
        {pickupTab && (
          <motion.div
            className={styles.order__list__item__delivery__pickup}
            {...basePropsForMotion}
          >
            <div className={styles.order__list__item__delivery__inner}>
              <label
                className={styles.order__list__item__delivery__label}
                ref={labelRef}
              >
                <span>{translations[lang].order.search_title}</span>
              </label>
              <AddressesList
                listClassName={styles.order__list__item__delivery__list}
              />
            </div>
            <div
              className={styles.order__list__item__delivery__map}
            >
              <iframe width="100%" height="280" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=280&amp;hl=en&amp;q=%D0%9A%D0%B8%D1%97%D0%B2,%20%D0%B2%D1%83%D0%BB.%20%D0%A5%D1%80%D0%B5%D1%89%D0%B0%D1%82%D0%B8%D0%BA%201+(My%20Business%20Name)&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
            </div>
          </motion.div>
        )}
        {courierTab && (
          <motion.div {...basePropsForMotion}>
            {!shouldShowCourierAddressData && (
              <div className={styles.order__list__item__delivery__courier}>
                <span>{translations[lang].order.where_deliver_order}</span>
                <span>{translations[lang].order.enter_address_on_map}</span>
                <button className='btn-reset'>
                  {translations[lang].order.map}
                </button>
              </div>
            )}
            {shouldShowCourierAddressData &&
              !!chosenCourierAddressData.address_line1 && (
                <CourierAddressInfo />
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}

export default OrderDelivery
