// src/views/users/UsersPage.jsx
import UserTable from './UserTable'
import UserModal from './UserModal'
import TableTitle from '../components/table/TableTitle'
import TableSearch from '../components/table/TableSearch'
import TableExport from '../components/table/TableExport'
import TablePagination from '../components/table/TablePagination'
import { useUsersPage } from '../../features/users/useUsersPage'
import { DEFAULT_PAGE } from '../../utils/constantes'

const UsersPage = () => {
  const {
    entity,
    setEntity,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    entitysPerPage,
    currentEntitys,
    setEntitysPerPage,
    totalPages,
    filteredEntitys,
    getAllQuery,
    isDisabled,
    errors,
    errorUnique,
    handleResetAll,
    handleEdit,
    handleDelete,
    handleCreate,
    handleSubmit,
    op,
  } = useUsersPage()

  return (
    <div>
      {/* Header avec titre + recherche + modal */}
      <div className="d-flex align-items-center justify-content-between gap-1 mb-2">
        <TableTitle
          title="Liste des utilisateurs"
          isDisabled={isDisabled}
          listLength={getAllQuery?.data?.length}
        />

        <div className="d-flex gap-1">
          <TableSearch
            search={search}
            handleSearch={(e) => {
              setCurrentPage(DEFAULT_PAGE)
              setSearch(e.target.value)
            }}
          />

          <UserModal
            handleCreate={handleCreate}
            entity={entity}
            setEntity={setEntity}
            errors={errors}
            isDisabled={isDisabled}
            onSubmit={handleSubmit}
            onReset={handleResetAll}
            errorUnique={errorUnique}
            op={op}
          />
        </div>
      </div>

      {/* Export + pagination */}
      <div className="d-flex justify-content-between mb-2">
        <TableExport
          tableId="myTable"
          excelFileName="Liste des utilisateurs"
          filteredEntitys={filteredEntitys}
        />
        <TablePagination
          filteredEntitysLength={filteredEntitys?.length}
          entitysPerPage={entitysPerPage}
          setEntitysPerPage={setEntitysPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handlePageChange={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Tableau */}
      <UserTable data={currentEntitys} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default UsersPage
