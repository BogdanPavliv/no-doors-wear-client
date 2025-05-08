'use client'
import { MutableRefObject, useState, useRef } from "react";
import Link from 'next/link'
import { useUnit } from 'effector-react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import Menu from './Menu'
import SearchInput from './SearchInput'
import { openMenu, openSearchModal } from '@/context/modals'
import {
  addOverflowHiddenToBody,
  handleOpenAuthPopup,
  triggerLoginCheck,
} from '@/lib/utils/common'
import Logo from '@/components/elements/Logo/Logo'
import { useLang } from '@/hooks/useLang'
import CartPopup from './CartPopup/CartPopup'
import HeaderProfile from './HeaderProfile'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  addProductsFromLSToCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'
import { AllowedLangs } from '@/constants/lang'
import { setLang } from '@/context/lang'
import {
  addProductsFromLSToFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  addProductsFromLSToComparison,
  setComparisonFromLS,
  setShouldShowEmptyComparison,
} from '@/context/comparison'
import { loginCheckFx } from '@/context/user'
import { $favorites, $favoritesFromLS } from '@/context/favorites/state'
import { $isAuth } from '@/context/auth/state'
import { $comparison, $comparisonFromLs } from '@/context/comparison/state'
import { $cart, $cartFromLs } from '@/context/cart/state'

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(false);
  const selectTitleRef = useRef() as MutableRefObject<HTMLDivElement>
  const selectOptionUaRef = useRef() as MutableRefObject<HTMLDivElement>
  const selectOptionEnRef = useRef() as MutableRefObject<HTMLDivElement>
  const isAuth = useUnit($isAuth)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const { lang, translations } = useLang()
  // const user = useUnit($user)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLs)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const isMedia991 = useMediaQuery(991)
  
  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  const handleSwitchSelect = () => {
    setSelectedLanguage(selectedLanguage => !selectedLanguage)
  }

  const handleSwitchLang = (lang: string) => {
    if (lang ==='ua') {
      setLang(lang as AllowedLangs)
      localStorage.setItem('lang', JSON.stringify(lang))

      const langChosen = JSON.parse(localStorage.getItem('lang') as string)
      console.log(langChosen);
      
      selectTitleRef.current.textContent = langChosen && 'Українська'
    } else {
      setLang(lang as AllowedLangs)
      localStorage.setItem('lang', JSON.stringify(lang))

      const langChosen = JSON.parse(localStorage.getItem('lang') as string)
      selectTitleRef.current.textContent = langChosen && 'English'
    }
    
  }
  
  const handleSwitchLangToUa = () => handleSwitchLang('ua')
  const handleSwitchLangToEn = () => handleSwitchLang('en')

  useEffect(()=> {
    console.log(selectTitleRef.current.textContent);
    const langChosen = JSON.parse(localStorage.getItem('lang') as string)
    console.log(langChosen);
      if (langChosen === 'ua') {
        selectTitleRef.current.textContent = langChosen && 'Українська'
      } else {
        selectTitleRef.current.textContent = langChosen && 'English'
      }
  }, [])

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    const favoritesFromLS = JSON.parse(
      localStorage.getItem('favorites') as string
    )
    const comparisonFromLS = JSON.parse(
      localStorage.getItem('comparison') as string
    )

    if (lang) {
      if (lang === 'ua' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (!favoritesFromLS || !favoritesFromLS?.length) {
      setShouldShowEmptyFavorites(true)
    }

    if (!cart || !cart?.length) {
      setShouldShowEmpty(true)
    }

    if (auth?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmpty(true)
      } else {
        setCartFromLS(cart)
      }
    }

    if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
      if (!favoritesFromLS.length) {
        setShouldShowEmptyFavorites(true)
      } else {
        setFavoritesFromLS(favoritesFromLS)
      }
    }

    if (comparisonFromLS && Array.isArray(comparisonFromLS)) {
      if (!comparisonFromLS.length) {
        setShouldShowEmptyComparison(true)
      } else {
        setComparisonFromLS(comparisonFromLS)
      }
    }
  }, [])

  useEffect(() => {
    if (isAuth) {
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)
      const favoritesFromLS = JSON.parse(
        localStorage.getItem('favorites') as string
      )
      const comparisonFromLS = JSON.parse(
        localStorage.getItem('comparison') as string
      )

      if (cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }

      if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
        addProductsFromLSToFavorites({
          jwt: auth.accessToken,
          favoriteItems: favoritesFromLS,
        })
      }

      if (comparisonFromLS && Array.isArray(comparisonFromLS)) {
        addProductsFromLSToComparison({
          jwt: auth.accessToken,
          comparisonItems: comparisonFromLS,
        })
      }
    }
  }, [isAuth])

  return (
    <div className='header'>
        <div className="header__wrapper">
          <div className="header__top">
            <div className="container">
              <div className="header__top--content">
                {!isMedia991 &&
                  <div className="header__top--content-left">
                    <ul className="header__top--nav-list">
                      <li className="header__top--nav-item">
                        <Link 
                          className="header__top--nav-link" 
                          href='/about'>
                            Про компанію
                        </Link>
                      </li>
                      <li className="header__top--nav-item">
                        <Link 
                          className="header__top--nav-link" 
                          href='/delivery'>
                            Доставка та оплата
                        </Link>
                      </li>
                      <li className="header__top--nav-item">
                        <Link 
                          className="header__top--nav-link" 
                          href='/guarantees'>
                            Гарантії
                        </Link>
                      </li>
                      <li className="header__top--nav-item">
                        <Link 
                          className="header__top--nav-link" 
                          href='/contacts'>
                            Контакти
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
                <div className="header__top--content-right">
                  <ul className="header__top--actions-list">
                    {!isMedia991 &&
                      <li className="header__top--actions-item">
                        <a href="" className="header__top--actions-btn">+38 (050) 237-44-49</a>
                      </li>
                    }
                    {!isMedia991 &&
                     (<li className="header__top--actions-item">
                        <div className="header__top--actions-select-wrapper">
                          <div className={`${selectedLanguage ? 'header__top--actions-select-title active' : 'header__top--actions-select-title'}`} ref={selectTitleRef} onClick={handleSwitchSelect}></div>
                          {selectedLanguage && 
                            (<div className="header__top--actions-options" id="language">
                              <div className="header__top--actions-option" ref={selectOptionUaRef} onClick={handleSwitchLangToUa}>Українська</div>
                              <div className="header__top--actions-option" ref={selectOptionEnRef} onClick={handleSwitchLangToEn}>English</div>
                            </div>)
                          }
                        </div>
                      </li>)
                    }
                    <li className="header__top--actions-item">
                      <Link 
                        className="header__bottom--icon header__bottom--icon-compare" 
                        href='/comparison'>
                          {!!currentComparisonByAuth.length && (
                            <span className='not-empty' />
                          )}
                      </Link>
                    </li>
                    <li className="header__top--actions-item header__top--actions-item-profile">
                      {isAuth ? (
                        <HeaderProfile />
                      ) : loginCheckSpinner ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        <button 
                          className="header__top--actions-btn header__top--actions-btn-profile"
                          onClick={handleOpenAuthPopup}
                        />
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header__bottom">
            <div className="container">
              <div className="header__bottom--content">
                <div className="header__bottom--content-top">
                  {isMedia991 &&
                    <>
                      <button className="header__burger" onClick={handleOpenMenu}>
                        Меню
                      </button>
                      <Menu />
                    </>
                  }
                  <div className="header__bottom--logo">
                    <Logo />
                  </div>
                  {!isMedia991 &&
                    <SearchInput /> 
                  }
                  <div className="header__bottom--actions">
                    <ul className="header__bottom--list">
                      {isMedia991 && 
                        <li className="header__bottom--item">
                          <div className="header__bottom--icon header__bottom--icon-search">
                                
                          </div>
                          <div className="header__bottom--text">
                            <button
                              className='header__links__item__btn header__links__item__btn--search'
                              onClick={handleOpenSearchModal}
                            >
                              Знайти
                            </button>
                          </div>
                        </li>
                      }
                      <li className="header__bottom--item">
                        <div className="header__bottom--icon header__bottom--icon-favorites">
                          {!!currentFavoritesByAuth.length && (<span className='not-empty' />)}
                        </div>
                        <div className="header__bottom--text">
                          <Link
                            href='/favorites'
                            className='header__links__item__btn header__links__item__btn--favorites'
                          >
                            Вибране
                          </Link>
                        </div>
                      </li>
                      <li className="header__bottom--item">
                        <div className="header__bottom--icon header__bottom--icon-cart">
                          {!!currentCartByAuth.length && <span className='not-empty' />}
                        </div>
                        <div className="header__bottom--text">
                          <CartPopup />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header
