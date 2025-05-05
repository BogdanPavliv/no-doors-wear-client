import Image from 'next/image';

const FooterPayment = () => {
  return (
    <div className="footer__payment">
        <h3 className="footer__title">Способи оплати</h3>
        <div className="footer__payment-img-wrapper">
            <Image className='footer__img' width={70} height={23} src='/img/visa.svg' alt='Visa'/>
            <Image className='footer__img' width={38} height={29} src='/img/mastercard.svg' alt='Mastercard'/>
            <Image className='footer__img' width={48} height={29} src='/img/maestro.svg' alt='Maestro'/>
        </div>
    </div>
  )
}

export default FooterPayment