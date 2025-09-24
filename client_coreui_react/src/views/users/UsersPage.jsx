import { useCallback, useState } from 'react'
import { useUserMutations } from '../../hooks/useUsers'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import TableHeader from '../components/table/TableHeader'
import parseApiErrors from '../../utils/parseApiErrors'
import useEntityPagination from '../../hooks/useEntityPagination'
import UserTable from './UserTable'
import UserModal from './UserModal'

const UsersPage = () => {
  const [visible, setVisible] = useState(false)
  const [operation, setOperation] = useState('')
  const initialVal = {
    id: '',
    name: '',
    email: '',
    password: '',
    active: true,
    role: '',
    lastName: '',
  }
  const [entity, setEntity] = useState(initialVal)

  const mutations = useUserMutations()
  const getAllQuery = useQuery(mutations.fetch)

  const currentMutation = mutations[operation]
  const isDisabled = currentMutation?.isPending
  const errors = parseApiErrors(currentMutation?.error)
  const errorUnique = typeof errors === 'string' && errors

  const handleResetAll = () => {
    setEntity(initialVal)
    currentMutation.reset()
    setOperation('create')
  }

  const messages = {
    create: 'Ajouté avec succès.',
    update: 'Modifié avec succès.',
    delete: 'Supprimé avec succès.',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    currentMutation.mutate(entity, {
      onSuccess: () => {
        setVisible(false)
        handleResetAll()
        toast.success(messages[operation])
      },
    })
  }

  // Hook Recherche + pagination
  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    entitysPerPage,
    setEntitysPerPage,
    currentEntitys,
    totalPages,
    filteredEntitys,
  } = useEntityPagination(getAllQuery.data)

  const handleEdit = useCallback((user) => {
    setEntity(user)
    setOperation('update')
    setVisible(true)
  }, [])

  const handleDelete = useCallback((user) => {
    setEntity(user)
    setOperation('delete')
    setVisible(true)
  }, [])

  return (
    <div>
      <TableHeader
        title="Liste des utilisateurs"
        isDisabled={isDisabled}
        listLength={getAllQuery?.data?.length}
        search={search}
        handleSearch={(e) => {
          setCurrentPage(1)
          setSearch(e.target.value)
        }}
        setEntity={setEntity}
        initialVal={initialVal}
        setVisible={setVisible}
        visible={visible}
        setOperation={setOperation}
        tableId="myTable"
        excelFileName="Liste des utilisateurs"
        currentEntitys={currentEntitys}
        entitysPerPage={entitysPerPage}
        setEntitysPerPage={setEntitysPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
        totalPages={totalPages}
        filteredEntitys={filteredEntitys}
      />

      <UserTable data={currentEntitys} onEdit={handleEdit} onDelete={handleDelete} />

      {/* ✅ Modal externalisé */}
      <UserModal
        visible={visible}
        setVisible={setVisible}
        entity={entity}
        setEntity={setEntity}
        errors={errors}
        isDisabled={isDisabled}
        operation={operation}
        onSubmit={handleSubmit}
        onReset={handleResetAll}
        errorUnique={errorUnique}
      />
    </div>
  )
}

export default UsersPage
