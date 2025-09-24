// components/table/TableTitle.jsx
import { CBadge, CSpinner } from '@coreui/react'

const TableTitle = ({ title, isDisabled, listLength }) => {
  return (
    <div className="d-flex align-items-center gap-1 text-uppercase">
      <span>{title}</span>
      <div>
        <CBadge textBgColor="primary"> {listLength || 0}</CBadge>
      </div>
      {isDisabled && <CSpinner color="primary" size="sm" />}
    </div>
  )
}

export default TableTitle
