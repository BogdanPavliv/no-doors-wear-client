import { useEffect } from 'react'
import { useLang } from './useLang'

export const usePageTitle = (page: string, additionalText = '') => {
  const { lang, translations } = useLang()

  useEffect(() => {
    document.title = `${lang === 'ua' ? 'NO DOORS' : 'NO DOORS'} | ${
      (translations[lang].breadcrumbs as { [index: string]: string })[page]
    }${additionalText ? ` - ${additionalText}` : ''}`
  }, [additionalText, lang, page, translations])
}
