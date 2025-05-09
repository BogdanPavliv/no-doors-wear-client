import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <a
          href='tel:+380502374449'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +38 (050) 237 44 49
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='mailto:test@gmail.com'
          className='nav-menu__accordion__item__link'
        >
          Email
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://www.facebook.com/'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.facebook}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link href='https://instagram.com' className='nav-menu__accordion__item__link'>
          {translations[lang].main_menu.instagram}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems
