import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const BuyersListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/about'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          {translations[lang].main_menu.about}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link href='/delivery' className='nav-menu__accordion__item__link'>
          {translations[lang].main_menu.delivery}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/guarantees'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.guarantees}
        </Link>
      </li>
    </>
  )
}

export default BuyersListItems
