'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import styles from '@/styles/guarantees/index.module.scss'

const GuaranteesPage = () => {
  const { getDefaultTextGenerator, getTextGenerator } =
   useBreadcrumbs('guarantees')

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.guarantees}>
        <div className="container">
          <div className="guarantees__wrapper">
            <h2>
              Гарантії
            </h2>
            <h3>Одяг в нашому інтернет-магазині ретельно перевіряються на наявність подряпин і механічних пошкоджень перед продажем клієнту.</h3>
            <p>Повернути товар через "не знадобилося" або "більше не потрібно" можливо лише протягом 14 днів після його відвантаження Вам.</p>
            <h3>Весь одяг проходять ретельний контроль якості,
            що гарантує нашим клієнтам:</h3>
            <ul>
              <li>
                <span className={styles.green}>—</span> Одяг не має пошкоджень;
              </li>
              <li>
                <span className={styles.green}>—</span> Не має браку
              </li>
              <li>
                <span className={styles.green}>—</span> Відмінна якість
              </li>
            </ul>
            <h3>Продавець приймає на гарантійний обмін одягу, якщо:</h3>
            <ul>
              <li>
                <span className={styles.green}>—</span> З моменту покупки минуло менше 120 днів;
              </li>
              <li>
                <span className={styles.green}>—</span> Відсутні механічні пошкодження
              </li>
            </ul>
            <h3>Продавець НЕ приймає на гарантійний обмін АКБ, якщо:</h3>
            <ul>
              <li>
                <span className={styles.green}>—</span> Існують механічні пошкодження;
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default GuaranteesPage