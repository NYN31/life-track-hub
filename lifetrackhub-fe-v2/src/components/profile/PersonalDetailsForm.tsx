import React, { useState, useEffect } from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../features/user/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';

const PersonalDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [objective, setObjective] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setFirstname(data.firstname || '');
      setLastname(data.lastname || '');
      setObjective(data.userDetails?.objective || '');
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDetails = {
      ...data.userDetails,
      objective,
    };
    const payload = {
      ...data,
      firstname,
      lastname,
      userDetails,
    };

    await updateProfile(payload)
      .unwrap()
      .then(result => {
        dispatch(setUser(result));
        setSuccess(true);
      })
      .catch(() => {});
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-white shadow-lg rounded-xl p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Personal Details
      </h2>
      <div className="space-y-2">
        <label
          htmlFor="firstname"
          className="block text-sm font-semibold text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          className="mt-1 block w-full border border-blue-200 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="lastname"
          className="block text-sm font-semibold text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          className="mt-1 block w-full border border-blue-200 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="objective"
          className="block text-sm font-semibold text-gray-700"
        >
          Objective
        </label>
        <textarea
          id="objective"
          value={objective}
          onChange={e => setObjective(e.target.value)}
          className="mt-1 block w-full border border-blue-200 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-600 text-white rounded-md w-full ${
          isSaving
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
        }`}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Details'}
      </button>
      {success && <div className="text-green-600 mt-2 text-center">Saved!</div>}
    </form>
  );
};

export default PersonalDetailsForm;
