// src/components/common/EntityModal.jsx
import React from 'react'
import {
  CAlert,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBellExclamation } from '@coreui/icons'

/**
 * Composant modal générique pour CRUD
 * @param {boolean} visible
 * @param {function} setVisible
 * @param {object} entity - état de l'entité
 * @param {function} setEntity
 * @param {object} errors - erreurs à afficher
 * @param {boolean} isDisabled - désactive les inputs et boutons
 * @param {string} operation - 'create' | 'update' | 'delete'
 * @param {function} onSubmit - callback pour submit
 * @param {function} onReset - reset state
 * @param {ReactNode} children - formulaire custom à afficher
 */
const EntityModal = ({
  visible,
  setVisible,
  isDisabled,
  operation,
  onSubmit,
  onReset,
  children,
  title = "Gestion de l'entité",
  errorUnique,
}) => {
  return (
    <CModal
      backdrop="static"
      visible={visible}
      onClose={() => {
        setVisible(false)
        onReset()
      }}
      aria-labelledby="EntityModalLabel"
    >
      <CModalHeader>
        <CModalTitle id="EntityModalLabel">{title}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        {children}

        {errorUnique && (
          <CAlert color="danger" className="mb-0 mt-2 py-2 d-flex align-items-center gap-1">
            <CIcon icon={cilBellExclamation} size="xxl" />
            {errorUnique}
          </CAlert>
        )}
      </CModalBody>

      <CModalFooter className="d-flex gap-1">
        {operation === 'delete' ? (
          <CButton
            disabled={isDisabled}
            onClick={onSubmit}
            size="sm"
            color="danger"
            variant="outline"
          >
            <div className="d-flex gap-1 align-items-center justify-content-end">
              {isDisabled && <CSpinner size="sm" />} <span>Supprimer</span>
            </div>
          </CButton>
        ) : (
          <CButton
            disabled={isDisabled}
            onClick={onSubmit}
            size="sm"
            color="success"
            variant="outline"
          >
            <div className="d-flex gap-1 align-items-center justify-content-end">
              {isDisabled && <CSpinner size="sm" />} <span>Sauvegarder</span>
            </div>
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  )
}

export default EntityModal
