'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import styles from '@/styles/contacts/index.module.scss'

const ContactsPage = () => {
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('contacts')
  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.contacts}>
        <div className="container">
          <h2 className={`site-title ${styles.contacts__title}`}>
            Контакти
          </h2>
          <div className={styles.contacts__inner}>
            <div className={styles.contacts__left}>
              <ul className={styles.contacts__list}>
                <li className={`${styles.contacts__item} ${styles.phone}`}>
                  <h3 className={styles.contacts__item__title}>Телефон</h3>
                  <a className={styles.contacts__item__link} href="#">+38 (050) 237-44-49</a>
                </li>
                <li className={`${styles.contacts__item} ${styles.location}`}>
                  <h3 className={styles.contacts__item__title}>Адреса</h3>
                  <a className={styles.contacts__item__link} href="#">м. Київ, вул. Хрещатик, 1</a>
                </li>
                <li className={`${styles.contacts__item} ${styles.socials}`}>
                  <h3 className={styles.contacts__item__title}>Соціальні мережі:</h3>
                  <a className={styles.contacts__item__link} href="#">facebook.com/long_link_name</a>
                  <a className={styles.contacts__item__link} href="#">instagram.com/long_ling_name</a>
                </li>
                <li className={`${styles.contacts__item} ${styles.details}`}>
                  <h3 className={styles.contacts__item__title}>Реквізити:</h3>
                  <p className={styles.contacts__item__text}>
                    ТОВ "No Doors Technology" <br />
                    ІПН: 3123386455 <br />
                    ОГРН: 1163123062222 <br />
                    КПП: 312301001
                  </p>
                </li>
              </ul>
            </div>
            <div className={styles.contacts__right}>
              <div className={styles.contacts__map}>
              <iframe width="100%" height="381" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=280&amp;hl=en&amp;q=%D0%9A%D0%B8%D1%97%D0%B2,%20%D0%B2%D1%83%D0%BB.%20%D0%A5%D1%80%D0%B5%D1%89%D0%B0%D1%82%D0%B8%D0%BA%201+(My%20Business%20Name)&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactsPage