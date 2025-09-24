// src/views/users/UserModal.jsx
import UserForm from './UserForm'
import EntityModal from '../components/EntityModal'

const UserModal = ({
  visible,
  setVisible,
  entity,
  setEntity,
  errors,
  isDisabled,
  operation,
  onSubmit,
  onReset,
  errorUnique,
}) => {
  return (
    <EntityModal
      visible={visible}
      setVisible={setVisible}
      isDisabled={isDisabled}
      operation={operation}
      onSubmit={onSubmit}
      onReset={onReset}
      title="Gestion d'un utilisateur"
      errorUnique={errorUnique}
    >
      <UserForm
        entity={entity}
        setEntity={setEntity}
        errors={errors}
        disabled={isDisabled}
        operation={operation}
      />
    </EntityModal>
  )
}

export default UserModal
