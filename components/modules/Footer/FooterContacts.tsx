const FooterContacts = () => {
  return (
    <div className="footer__contacts">
      <h3 className="footer__title">Контакти</h3>
      <ul className='footer__contactsList'>
        <li className="footer__contactsItem call">
          <a className="footer__contactsLink" href="">
            +38 (050) 237-44-49
          </a>
        </li>
        <li className="footer__contactsItem facebook">
          <a className="footer__contactsLink" href="">
            facebook.com/nodoors
          </a>
        </li>
        <li className="footer__contactsItem instagram">
          <a className="footer__contactsLink" href="">
            instagram.com/nodoors
          </a>
        </li>
      </ul>
    </div>
  )
}

export default FooterContacts