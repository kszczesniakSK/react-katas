import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AddressFields from './AddressFields'; // Update the path to wherever the AddressFields component is

// Zod schema for validation
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  addresses: z.array(
    z.object({
      city: z.string().min(1, 'City is required'),
      street: z.string().min(1, 'Street is required'),
      zipCode: z.string().min(5, 'Zip Code must be at least 5 characters'),
    })
  ),
});

export type UserFormType = z.infer<typeof userSchema>;

type UserFormProps = {
  initialData?: UserFormType; // Optional initial data for editing
  onSubmit: (data: UserFormType) => void; // Callback for form submission
};

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<UserFormType>({
    defaultValues: {
      name: '',
      email: '',
      addresses: [{ city: '', street: '', zipCode: '' }],
    },
    resolver: zodResolver(userSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  // Reset form when initialData changes (for both editing and creating new)
  useEffect(() => {
    if (initialData) {
      reset(initialData); // Reset the form with new initialData for editing
    } else {
      reset({
        name: '',
        email: '',
        addresses: [{ city: '', street: '', zipCode: '' }],
      }); // Reset the form with empty values for creating a new user
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <h2>Addresses</h2>
      {fields.map((field, index) => (
        <div key={field.id}>
          <AddressFields
            register={register}
            errors={errors}
            index={index}
            removeAddress={() => remove(index)} // Handler to remove address
          />
        </div>
      ))}

      <button type="button" onClick={() => append({ city: '', street: '', zipCode: '' })}>
        Add Address
      </button>

      <button type="submit">{initialData ? 'Edit' : 'Create'}</button>
    </form>
  );
};

export default UserForm;