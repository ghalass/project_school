import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CBadge,
  CButton,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import {
  createUserQuery,
  deleteUserQuery,
  fecthUsersQuery,
  updateUserQuery,
} from '../../hooks/useUsers'
import { exportExcel, getMultiplesOf } from '../../utils/func'
import { useQuery } from '@tanstack/react-query'
import { cilCloudDownload, cilPenNib, cilPlus, cilTrash } from '@coreui/icons'
import { USER_TYPE } from '../../utils/types'
import TableHead from './TableHead'

const Users = () => {
  const getAllQuery = useQuery(fecthUsersQuery())

  const [visible, setVisible] = useState(false)
  const [operation, setOperation] = useState('')
  const initialVal = { id: '', name: '', email: '', password: '', active: true }

  const [entity, setEntity] = useState(initialVal)
  const createMutation = createUserQuery()
  const deleteMutation = deleteUserQuery()
  const updateMutation = updateUserQuery()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password || '',
      role: entity.role,
      active: entity.active,
    }

    switch (operation) {
      case 'create':
        createMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
            toast.success('Ajouté avec succès.')
          },
        })
        break
      case 'delete':
        deleteMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
            toast.success('Supprimé avec succès.')
          },
        })
        break
      case 'update':
        updateMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
            toast.success('Modifié avec succès.')
          },
        })
        break
      default:
        break
    }
  }

  const handleResetAll = () => {
    setEntity(initialVal)
    createMutation.reset()
    deleteMutation.reset()
    updateMutation.reset()
    setOperation('create')
  }

  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setCurrentPage(1)
    const newSearchValue = e.target.value
    if (newSearchValue !== search) {
      setSearch(newSearchValue)
    }
  }
  // Filter the entitys based on the search query
  const filteredEntitys = getAllQuery.data?.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase()),
  )

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [entitysPerPage, setEntitysPerPage] = useState(10)
  // Calculate current entitys to display
  const indexOfLastEntity = currentPage * entitysPerPage
  const indexOfFirstEntity = indexOfLastEntity - entitysPerPage
  const currentEntitys = filteredEntitys?.slice(indexOfFirstEntity, indexOfLastEntity)
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // Calculate total pages
  const totalPages = Math.ceil(filteredEntitys?.length / entitysPerPage)

  return (
    <div>
      <TableHead
        title="Liste des utilisateurs"
        getAllQuery={getAllQuery}
        search={search}
        handleSearch={handleSearch}
        setEntity={setEntity}
        initialVal={initialVal}
        setVisible={setVisible}
        visible={visible}
        setOperation={setOperation}
        tableId={'myTable'}
        excelFileName={'Liste des utilisateurs'}
        currentEntitys={currentEntitys}
        entitysPerPage={entitysPerPage}
        setEntitysPerPage={setEntitysPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        filteredEntitys={filteredEntitys}
      />

      <CTable responsive striped hover id="myTable">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nom de l'utilisateur</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rôle</CTableHeaderCell>
            <CTableHeaderCell scope="col">Active</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentEntitys && currentEntitys?.length > 0 ? (
            currentEntitys?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="danger"
                    variant="outline"
                    className="rounded-pill"
                    onClick={() => {
                      setEntity(item)
                      setOperation('delete')
                      setVisible(!visible)
                    }}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>{' '}
                  <CButton
                    size="sm"
                    color="primary"
                    variant="outline"
                    className="rounded-pill"
                    onClick={() => {
                      setEntity(item)
                      setOperation('update')
                      setVisible(!visible)
                    }}
                  >
                    <CIcon icon={cilPenNib} />
                  </CButton>{' '}
                  {item?.name}
                </CTableDataCell>

                <CTableDataCell>{item?.email}</CTableDataCell>
                <CTableDataCell>{item?.role?.replace('_', ' ')}</CTableDataCell>
                <CTableDataCell>
                  {item?.active ? (
                    <i className="bi bi-toggle2-on text-primary"></i>
                  ) : (
                    <i className="bi bi-toggle2-off text-secondary"></i>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={2}>Aucune donnée trouvée.</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      {/* CREATE/UPDATE/DELETE  */}
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
          handleResetAll()
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Gestion d'un utilisateur</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-8">
              <CFormSelect
                id="floatingSelect"
                floatingClassName="mb-3"
                floatingLabel="Choisir un rôle"
                aria-label="Floating label select example"
                value={entity?.role}
                onChange={(e) => setEntity({ ...entity, role: e.target.value })}
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending ||
                  operation === 'delete'
                }
              >
                <option></option>
                {USER_TYPE.map((u_type, index) => (
                  <option key={index} value={u_type.value}>
                    {u_type.title}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="col">
              <CFormCheck
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox1"
                value="option1"
                label="Active"
                checked={entity?.active}
                onChange={(e) => setEntity({ ...entity, active: true })}
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending ||
                  operation === 'delete'
                }
              />
              <CFormCheck
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox2"
                value="option2"
                label="InActive"
                checked={!entity?.active}
                onChange={(e) => setEntity({ ...entity, active: false })}
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending ||
                  operation === 'delete'
                }
              />
            </div>
          </div>

          <CFormInput
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Nom de l'utilisateur"
            placeholder="pg11"
            value={entity.name}
            onChange={(e) => setEntity({ ...entity, name: e.target.value })}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending ||
              operation === 'delete'
            }
          />

          <CFormInput
            type="email"
            id="floatingInputemail"
            floatingClassName="mb-3"
            floatingLabel="Email de l'utilisateur"
            placeholder="email"
            value={entity.email}
            onChange={(e) => setEntity({ ...entity, email: e.target.value })}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending ||
              operation === 'delete'
            }
          />

          <CFormInput
            type="password"
            id="floatingInputpassword"
            floatingClassName="mb-3"
            floatingLabel="Mode de passe de l'utilisateur"
            placeholder="password"
            value={entity.password}
            onChange={(e) => setEntity({ ...entity, password: e.target.value })}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending ||
              operation === 'delete'
            }
          />

          {createMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {createMutation.error.message}
            </CAlert>
          )}

          {updateMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {updateMutation.error.message}
            </CAlert>
          )}

          {deleteMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {deleteMutation.error.message}
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter className="d-flex gap-1">
          {operation === 'delete' && (
            <CButton
              disabled={
                createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
              }
              onClick={handleSubmit}
              size="sm"
              color="danger"
              variant="outline"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {deleteMutation.isPending && <CSpinner size="sm" />} <span>Supprimer</span>
              </div>
            </CButton>
          )}

          {operation !== 'delete' && (
            <CButton
              disabled={
                deleteMutation.isPending || createMutation.isPending || updateMutation.isPending
              }
              onClick={handleSubmit}
              size="sm"
              color="success"
              variant="outline"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {(createMutation.isPending || updateMutation.isPending) && <CSpinner size="sm" />}{' '}
                <span>Sauvegarder</span>
              </div>
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Users
