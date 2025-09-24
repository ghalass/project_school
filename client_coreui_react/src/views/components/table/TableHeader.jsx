// components/table/TableHeader.jsx
import TableTitle from './TableTitle'
import TableSearch from './TableSearch'
import TableExport from './TableExport'
import TablePagination from './TablePagination'

const TableHeader = (props) => {
  return (
    <div>
      <div className="row text-center">
        <div className="col-sm mb-2">
          <TableTitle
            title={props.title}
            isDisabled={props.isDisabled}
            listLength={props.listLength}
          />
        </div>
        <div className="col-sm mb-2">
          <TableSearch
            search={props.search}
            handleSearch={props.handleSearch}
            setEntity={props.setEntity}
            initialVal={props.initialVal}
            setVisible={props.setVisible}
            visible={props.visible}
            setOperation={props.setOperation}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm col-md-2 text-center text-sm-start mb-2">
          <TableExport
            tableId={props.tableId}
            excelFileName={props.excelFileName}
            currentEntitys={props.currentEntitys}
          />
        </div>
        <div className="col-sm col-md-10 mb-2">
          <TablePagination
            filteredEntitys={props.filteredEntitys}
            entitysPerPage={props.entitysPerPage}
            setEntitysPerPage={props.setEntitysPerPage}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
            handlePageChange={props.handlePageChange}
            totalPages={props.totalPages}
          />
        </div>
      </div>
    </div>
  )
}

export default TableHeader
