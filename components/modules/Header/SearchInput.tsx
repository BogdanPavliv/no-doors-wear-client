import Link from 'next/link'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { useMemo, useState, useTransition } from 'react'
import { useLang } from '@/hooks/useLang'
import { handleCloseSearchModal } from '@/lib/utils/common'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import {
  loadProductBySearch,
  loadProductBySearchFx,
  resetProductBySearch,
} from '@/context/goods'
import { $productsBySearch } from '@/context/goods/state'
import { basePropsForMotion } from '@/constants/motion'

const SearchInput = () => {
    const { lang, translations } = useLang()
    const [, setSearchValue] = useState('')
    const [, startTransition] = useTransition()
    const delayCallback = useDebounceCallback(1000)
    const productsBySearch = useUnit($productsBySearch)
    const spinner = useUnit(loadProductBySearchFx.pending)
  
    const searchedProductsCategories = useMemo(
      () =>
        productsBySearch.items?.length
          ? [...new Set(productsBySearch.items.map((item) => item.category))]
          : [],
      [productsBySearch.items]
    )
  
    const searchedProductsTypes = useMemo(
      () =>
        productsBySearch.items?.length
          ? [
            ...new Map(
              productsBySearch.items.map((item) => [item.type, item])
            ).values(),
          ]
          : [],
      [productsBySearch.items]
    )
  
    const handleInputFocus = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
      e.target.classList.add('with_value')
    }
  
    const handleInputBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
      if (e.target.value) {
        return
      }
  
      e.target.classList.remove('with_value')
    }
  
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => setSearchValue(e.target.value))
  
      if (!e.target.value.length) {
        delayCallback(() => '')
        resetProductBySearch()
        return
      }
  
      delayCallback(() => loadProductBySearch({ search: e.target.value.trim() }))
    }

  return (
    <div className="header__bottom--search">
        <div className="header__bottom--search-wrapper">
            <div className="header__bottom--search-content">
                <input 
                className="header__input" 
                type="text" 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleSearchInputChange}
                />
                <button className="header__serach--button">Знайти</button>
            </div>
           
           {!!searchedProductsCategories.length && !!searchedProductsTypes.length && (
                <motion.div {...basePropsForMotion} className="header__bottom--search-result">
                    {!!searchedProductsCategories.length && (
                        <motion.ul {...basePropsForMotion} className='list-reset search-modal__links search-modal__categories'>
                            {searchedProductsCategories.map((category) => (
                            <li key={category}>
                                <Link
                                href={`/catalog/${category}`}
                                onClick={handleCloseSearchModal}
                                >
                                {(translations[lang].breadcrumbs as { [index: string]: string })[category]}
                                </Link>
                            </li>
                            ))}
                        </motion.ul>
                    )}
                    {!!searchedProductsTypes.length && (
                        <motion.ul {...basePropsForMotion} className='list-reset search-modal__links'>
                            {searchedProductsTypes.map((item) => (
                            <li key={item.type}>
                                <Link
                                href={`/catalog/${item.category}?type=${item.type}`}
                                onClick={handleCloseSearchModal}
                                >
                                {(translations[lang].comparison as { [index: string]: string })[item.type]}
                                </Link>
                            </li>
                            ))}
                        </motion.ul>
                    )}
                    {(spinner) && (
                        <motion.span className='search-modal__spinner' {...basePropsForMotion}>
                        <FontAwesomeIcon icon={faSpinner} spin color='#181818' size='3x' />
                        </motion.span>
                    )}
                    {!spinner && (
                        <motion.ul {...basePropsForMotion} className='list-reset search-modal__results'>
                            {(productsBySearch.items || []).map((item) => (
                                <li key={item._id} className='search-modal__results__item'>
                                <Link
                                    href={`/catalog/${item.category}/${item._id}`}
                                    className='search-modal__results__item__link'
                                    onClick={handleCloseSearchModal}
                                >
                                    <div className='search-modal__results__item__left'>
                                    <Image
                                        src={item.images[0].url}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className='search-modal__results__item__img'
                                    />
                                    </div>
                                    <div className='search-modal__results__item__inner'>
                                    <p>{item.name}</p>
                                    <p>{item.category}</p>
                                    <p>{item.type}</p>
                                    </div>
                                </Link>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </motion.div>
            )}
        
        </div>
    </div> 
  )
}

export default SearchInput