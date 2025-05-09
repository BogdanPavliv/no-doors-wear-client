import Link from 'next/link'
import LogoFooter from '@/components/elements/LogoFooter/LogoFooter'

import FooterContacts from "./FooterContacts"
import FooterPayment from "./FooterPayment"
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type Props = {}

const Footer = (props: Props) => {
  const { lang, translations } = useLang()

  const isMedia950 = useMediaQuery(950)
  const isMedia640 = useMediaQuery(640)

  return (
    <div className='footer'>
       <div className="container">
         <div className="footer__inner">
            <div className="footer__logo">
              <LogoFooter/>
            </div>
            <div className="footer__nav">
              <h3 className="footer__title">{translations[lang].footer.navigation}</h3>
              <ul className='footer__navList'>
                <li className="footer__navItem">
                  <Link 
                    className="footer__navLink" 
                    href='/about'>
                      {translations[lang].footer.about}
                  </Link>
                </li>
                <li className="footer__navItem">
                  <Link 
                    className="footer__navLink" 
                    href='/delivery'>
                      {translations[lang].footer.delivery}
                  </Link>
                </li>
                <li className="footer__navItem">
                  <Link 
                    className="footer__navLink" 
                    href='/guarantees'>
                      {translations[lang].footer.guarantees}
                  </Link>
                </li>
                <li className="footer__navItem">
                  <Link 
                    className="footer__navLink" 
                    href='/contacts'>
                      {translations[lang].footer.contacts}
                  </Link>
                </li>
              </ul>
              {isMedia950 && <FooterContacts />}
              {isMedia950 && <FooterPayment />}
            </div>
            {!isMedia950 && <FooterContacts />}
            {!isMedia950 && <FooterPayment />}
            <div className="footer__development">
              <h3 className="footer__title">{translations[lang].footer.development}</h3>
              <a className="footer__author" href="">Bogdan Pavliv</a>
              <Link href='/privacy-policy' className="footer__privacy-link">
                {translations[lang].footer.privacy}
              </Link>
              <div className="footer__copyright">
                No Doors Technology © 2025
              </div>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Footer