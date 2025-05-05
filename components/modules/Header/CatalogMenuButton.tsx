import { ICatalogMenuButtonProps } from '@/types/modules'

const CatalogMenuButton = ({
  name,
  isActive,
  handler,
}: ICatalogMenuButtonProps) => (
  <button
    className='btn-reset catalog-menu__list__item__btn'
    onClick={handler}
    style={{
      color: isActive ? '#1E1E1E' : '#777c85',
    }}
  >
    {name}
  </button>
)

export default CatalogMenuButton
