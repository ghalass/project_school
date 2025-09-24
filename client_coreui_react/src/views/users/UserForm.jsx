import { CFormCheck, CFormInput, CFormSelect } from '@coreui/react'
import { USER_TYPE } from '../../utils/types'

const UserForm = ({ entity, setEntity, errors, disabled, operation }) => {
  return (
    <div>
      <div className="row">
        <div className="col-8">
          <CFormSelect
            id="floatingSelect"
            floatingClassName="mb-3"
            floatingLabel="Choisir un rôle"
            value={entity?.role}
            onChange={(e) => setEntity({ ...entity, role: e.target.value })}
            disabled={disabled || operation === 'delete'}
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
            name="activeStatus"
            id="activeTrue"
            value="true"
            label="Active"
            checked={entity?.active}
            onChange={() => setEntity({ ...entity, active: true })}
            disabled={disabled || operation === 'delete'}
          />
          <CFormCheck
            type="radio"
            name="activeStatus"
            id="activeFalse"
            value="false"
            label="Inactive"
            checked={!entity?.active}
            onChange={() => setEntity({ ...entity, active: false })}
            disabled={disabled || operation === 'delete'}
          />
        </div>
      </div>

      <div className="mb-3">
        <CFormInput
          type="text"
          floatingLabel="Nom de l'utilisateur"
          placeholder="Nom"
          value={entity.name}
          onChange={(e) => setEntity({ ...entity, name: e.target.value })}
          invalid={errors?.name}
          disabled={disabled || operation === 'delete'}
        />
        {errors?.name && <span className="text-danger fst-italic small">{errors.name}</span>}
      </div>

      <div className="mb-3">
        <CFormInput
          type="email"
          floatingLabel="Email de l'utilisateur"
          placeholder="Email"
          value={entity.email}
          onChange={(e) => setEntity({ ...entity, email: e.target.value })}
          invalid={errors?.email}
          disabled={disabled || operation === 'delete'}
        />
        {errors?.email && <span className="text-danger fst-italic small">{errors.email}</span>}
      </div>

      <div className="mb-3">
        <CFormInput
          type="password"
          floatingLabel="Mot de passe de l'utilisateur"
          placeholder="Mot de passe"
          value={entity.password}
          onChange={(e) => setEntity({ ...entity, password: e.target.value })}
          invalid={errors?.password}
          disabled={disabled || operation === 'delete'}
        />
        {errors?.password && (
          <span className="text-danger fst-italic small">{errors.password}</span>
        )}
      </div>
    </div>
  )
}

export default UserForm
