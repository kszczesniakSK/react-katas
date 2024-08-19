import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { UserFormType } from '../pages/UserFormPage';

type AddressFieldsProps = {
  register: UseFormRegister<UserFormType>;
  errors: FieldErrors<UserFormType>; // Errors passed in for validation
  index: number;
  removeAddress: () => void;
};

const AddressFields: React.FC<AddressFieldsProps> = ({ register, errors, index, removeAddress }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <div>
        <label>City</label>
        <input {...register(`addresses.${index}.city`)} placeholder="City" />
        {errors?.addresses?.[index]?.city && <p>{errors.addresses[index]?.city?.message}</p>}
      </div>

      <div>
        <label>Street</label>
        <input {...register(`addresses.${index}.street`)} placeholder="Street" />
        {errors?.addresses?.[index]?.street && <p>{errors.addresses[index]?.street?.message}</p>}
      </div>

      <div>
        <label>Zip Code</label>
        <input {...register(`addresses.${index}.zipCode`)} placeholder="Zip Code" />
        {errors?.addresses?.[index]?.zipCode && <p>{errors.addresses[index]?.zipCode?.message}</p>}
      </div>

      <button type="button" onClick={removeAddress}>
        Remove Address
      </button>
    </div>
  );
};

export default AddressFields;