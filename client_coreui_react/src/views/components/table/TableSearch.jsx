// components/table/TableSearch.jsx
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'

const TableSearch = ({
  search,
  handleSearch,
  setEntity,
  initialVal,
  setVisible,
  visible,
  setOperation,
}) => {
  return (
    <div className="d-flex gap-1 justify-content-end">
      <input
        type="search"
        placeholder="Chercher..."
        className="form-control form-control-sm"
        value={search}
        onChange={handleSearch}
      />

      <CButton
        size="sm"
        color="primary"
        variant="outline"
        className="rounded-pill"
        onClick={() => {
          setEntity(initialVal)
          setVisible(!visible)
          setOperation('create')
        }}
      >
        <CIcon icon={cilPlus} />
      </CButton>
    </div>
  )
}

export default TableSearch
