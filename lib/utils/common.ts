import { EventCallable } from 'effector'
import toast from 'react-hot-toast'
import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth'
import { setCurrentProduct } from '@/context/goods'
import {
  closeSearchModal,
  closeShareModal,
  closeSizeTable,
  showSizeTable,
} from '@/context/modals'
import { setSizeTableSizes } from '@/context/sizeTable'
import { loginCheck } from '@/context/user'
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { resetProductBySearch } from '@/context/goods'

export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const handleCloseSearchModal = () => {
  closeSearchModal()
  removeOverflowHiddenFromBody()
  resetProductBySearch()
}

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export const closeSizeTableByCheck = (showQuickViewModal: boolean) => {
  if (!showQuickViewModal) {
    removeOverflowHiddenFromBody()
  }

  closeSizeTable()
}

export const handleOpenAuthPopup = () => {
  addOverflowHiddenToBody()
  openAuthPopup()
}

export const handleCloseAuthPopup = () => {
  removeOverflowHiddenFromBody()
  closeAuthPopup()
}

export const closeAuthPopupWhenSomeModalOpened = (
  showQuickViewModal: boolean,
  showSizeTable: boolean
) => {
  if (showQuickViewModal || showSizeTable) {
    closeAuthPopup()
    return
  }

  handleCloseAuthPopup()
}

export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  if (!auth?.accessToken) {
    setIsAuth(false)
    return false
  }

  return true
}

export const triggerLoginCheck = () => {
  if (!isUserAuth()) {
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  loginCheck({ jwt: auth.accessToken })
}

export const isItemInList = (array: ICartItem[], productId: string) =>
  array.some((item) => item.productId === productId)

export const handleShowSizeTable = (product: IProduct) => {
  setCurrentProduct(product)
  setSizeTableSizes({ sizes: product.sizes, type: product.type })
  addOverflowHiddenToBody()
  showSizeTable()
}

export const getCartItemCountBySize = (
  cartItems: ICartItem[],
  currentSize: string
) =>
  cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())
    ?.count || 0

export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  event: EventCallable<T>,
  setShouldShowEmpty: (arg0: boolean) => void,
  message: string,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string)

  if (!items) {
    items = []
  }

  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )

  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)

  if (!updatedItems.length) {
    setShouldShowEmpty(true)
  }
}

export const showCountMessage = (count: string, lang: string) => {
  if (count == '11' || count == '12' || count == '13' || count == '14') {
    return lang === 'ua' ? 'товарів' : 'items'
  }

  if (count.endsWith('1')) {
    return lang === 'ua' ? 'товар' : 'item'
  }

  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
    return lang === 'ua' ? 'товару' : 'items'
  }

  return lang === 'ua' ? 'товарів' : 'items'
}

export const checkOffsetParam = (offset: string | string[] | undefined) =>
  offset && !isNaN(+offset) && +offset >= 0

export const getSearchParamsUrl = () => {
  const paramsString = window.location.search
  const urlParams = new URLSearchParams(paramsString)

  return urlParams
}

export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  const urlParams = getSearchParamsUrl()
  urlParams.set(key, `${value}`)
  const newPath = `${pathname}?${urlParams.toString()}`
  window.history.pushState({ path: newPath }, '', newPath)
}

export const checkPriceParam = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const getCheckedArrayParam = (param: string) => {
  try {
    const sizesArr = JSON.parse(decodeURIComponent(param))

    if (Array.isArray(sizesArr) && sizesArr.length) {
      return sizesArr
    }
  } catch (error) {
    return false
  }
}

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const getWatchedProductFromLS = () => {
  let watchedProducts: IProduct[] = JSON.parse(
    localStorage.getItem('watched') as string
  )

  if (!watchedProducts || !Array.isArray(watchedProducts)) {
    watchedProducts = []
  }

  return watchedProducts
}

export const handleCloseShareModal = () => {
  removeOverflowHiddenFromBody()
  closeShareModal()
}

export const addScriptToHead = (src: string) => {
  const script = document.createElement('script')
  document.head.appendChild(script)

  script.src = src
}

export const isValidAvatarImage = (image: File) => {
  const allowedExtension = /^image\/(png|jpe?g|gif|bmp|webp)$/

  if (!image) {
    return false
  }

  const imageType = image.type

  if (!allowedExtension.test(imageType)) {
    toast.error(
      `Неприпустимий формат ${
        imageType.split('/')[1]
      }! Допускається лише jpeg, jpg, png, gif, bmp и webp`
    )
    return false
  }

  if (Math.round(image.size / 1024) > 2000) {
    toast.error('Вага картинки не повинна перевищувати 2 МБ!')
    return false
  }

  return true
}

export const generateArticleCode = (type: string) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'

  const getRandomLetters = (length: number) => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    return result
  }

  const getRandomNumbers = (length: number) => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return result
  }

  const articleCode = `${type.substring(0, 3).toUpperCase()}-${getRandomLetters(
    3
  )}-${getRandomNumbers(4)}`
  return articleCode
}
