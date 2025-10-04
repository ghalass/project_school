import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilPeople } from '@coreui/icons'
import { CCol, CRow, CWidgetStatsF } from '@coreui/react'

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <CRow>
        <CCol xs={6}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CIcon icon={cilPeople} height={24} />}
            title="Utilisateurs"
            value="89.9%"
          />
        </CCol>
        <CCol xs={6}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title="Widget title"
            value="89.9%"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
