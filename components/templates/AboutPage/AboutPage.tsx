'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import styles from '@/styles/about/index.module.scss'
import Image from 'next/image';

type Props = {}

const AboutPage = (props: Props) => {
  const { getDefaultTextGenerator, getTextGenerator } =
  useBreadcrumbs('about')

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.about}>
        <div className='container'>
        <h1 className={styles.about__title}>Про компанію No Doors</h1>
        <div className={styles.about__inner}>
          <div className={styles.about__inner__left}>
            <p className={styles.about__text}>
              Ласкаво просимо до No doors! Ми пропонуємо стильний одяг, оригінальні аксесуари, унікальні сувеніри та якісну канцелярію, які підкреслять вашу індивідуальність, подарують радість близьким і стануть незамінними в роботі чи навчанні. Усе це – за доступними цінами, із швидкою доставкою та зручним сервісом, що робить шопінг у нас простим і приємним.
            </p>
            <p className={styles.about__text}>
              Ми ретельно обираємо товари, щоб ви завжди отримували найкращу якість. Наша мета – допомогти вам знайти щось особливе, що принесе радість і натхнення. Долучайтеся до спільноти No doors, де кожна покупка стає частиною вашої історії!
            </p>
          </div>
          <div className={styles.about__inner__right}>
            <Image className={styles.about__img} width={630} height={403} src="/img/about/about-img.jpg" alt="About image" />
          </div>
        </div>
        </div>
      </section>
      <section className={styles.advantages}>
        <div className="container">
          <ul className={styles.advantages__list}>
            <li className={styles.advantages__item}>
              <img className={styles.advantages__item_img} src="/img/about/discount.svg" alt="" />
              <p className={styles.advantages__item_text}>Хороші ціни</p>
            </li>
            <li className={styles.advantages__item}>
              <img className={styles.advantages__item_img} src="/img/about/safe.svg" alt="" />
              <p className={styles.advantages__item_text}>Даємо гарантію</p>
            </li>
            <li className={styles.advantages__item}>
              <img className={styles.advantages__item_img} src="/img/about/factory.svg" alt="" />
              <p className={styles.advantages__item_text}>Працюємо безпосередньо з виробниками</p>
            </li>
            <li className={styles.advantages__item}>
              <img className={styles.advantages__item_img} src="/img/about/quality.svg" alt="" />
              <p className={styles.advantages__item_text}>Контроль якості продукції</p>
            </li>
            <li className={styles.advantages__item}>
              <img className={styles.advantages__item_img} src="/img/about/broken.svg" alt="" />
              <p className={styles.advantages__item_text}>Відсоток браку зведений до мінімуму</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default AboutPage