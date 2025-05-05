import Link from 'next/link'

const LogoFooter = () => {
  return (
    <Link className='logo' href='/'>
      <img className='logo__img' src='/img/logo-footer.svg' alt='NO DOORS logo' />
    </Link>
  )
}

export default LogoFooter