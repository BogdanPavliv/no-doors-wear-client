import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import {
  getNodoorsOfficesByCityFx,
  setChosenPickupAddressData,
  setShouldLoadNodoorsData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import {
  $chosenPickupAddressData,
  $nodoorsDataByCity,
  $shouldLoadNodoorsData,
} from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import { useTTMap } from '@/hooks/useTTMap'
import { IAddressesListProps, INodoorsAddressData } from '@/types/order'
import PickupAddressItem from './PickupAddressItem'
import styles from '@/styles/order/index.module.scss'

const AddressesList = ({
  listClassName,
  handleSelectAddressByMarkers,
}: IAddressesListProps) => {
  const { lang, translations } = useLang()
  const nodoorsDataByCity = useUnit($nodoorsDataByCity)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const shouldLoadNodoorsData = useUnit($shouldLoadNodoorsData)
  const { handleSelectAddress } = useTTMap()
  const loadNodoorsDataSpinner = useUnit(
    getNodoorsOfficesByCityFx.pending
  )

  const handleChosenAddressData = (data: Partial<INodoorsAddressData>) => {
    setShouldLoadNodoorsData(false)
    setChosenPickupAddressData(data)
    setShouldShowCourierAddressData(false)
  }

  return (
    <>
      {shouldLoadNodoorsData && (
        <>
          {loadNodoorsDataSpinner && (
            <span
              className={styles.order__list__item__delivery__inner__spinner}
            >
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
            </span>
          )}
          {!loadNodoorsDataSpinner && (
            <ul className={`list-reset ${listClassName}`}>
              {nodoorsDataByCity?.length ? (
                nodoorsDataByCity.map((item) => (
                  <PickupAddressItem
                    key={item.place_id}
                    addressItem={item}
                    handleChosenAddressData={handleChosenAddressData}
                    handleSelectAddress={
                      handleSelectAddressByMarkers || handleSelectAddress
                    }
                  />
                ))
              ) : (
                <span>{translations[lang].common.nothing_is_found}</span>
              )}
            </ul>
          )}
        </>
      )}
      {!!chosenPickupAddressData.address_line1 && !shouldLoadNodoorsData && (
        <div className={styles.order__list__item__delivery__pickup__choose}>
          <span>{chosenPickupAddressData.address_line1}</span>
          <span>
            {chosenPickupAddressData.address_line2},{' '}
            {chosenPickupAddressData.city}
          </span>
        </div>
      )}
    </>
  )
}

export default AddressesList
