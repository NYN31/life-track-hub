import React, { useState, useEffect } from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../features/user/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import { IEducation } from '../../types/user';
import Spinner from '../common/Spinner';

const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [educations, setEducations] = useState<IEducation[]>([]);
  const [newEducation, setNewEducation] = useState<IEducation>({
    institutionName: '',
    courseName: '',
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    result: 0,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data && data.userDetails?.educations) {
      setEducations(data.userDetails.educations);
    }
  }, [data]);

  const handleAdd = () => {
    if (!newEducation.institutionName || !newEducation.courseName) return;
    setEducations([...educations, newEducation]);
    setNewEducation({
      institutionName: '',
      courseName: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      result: 0,
    });
  };

  const handleRemove = (idx: number) => {
    setEducations(educations.filter((_, i) => i !== idx));
  };

  const handleChange = (
    idx: number,
    field: keyof IEducation,
    value: string | number
  ) => {
    setEducations(
      educations.map((edu, i) => (i === idx ? { ...edu, [field]: value } : edu))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const userDetails = {
      ...data.userDetails,
      educations,
    };
    const payload = {
      ...data,
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
      className="space-y-6 max-w-2xl bg-white shadow-lg rounded-xl py-8 md:p-8 border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-4 text-blue-700">Education</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Name
          </label>
          <input
            type="text"
            placeholder="Institution Name"
            value={newEducation.institutionName}
            onChange={e =>
              setNewEducation({
                ...newEducation,
                institutionName: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            placeholder="Course Name"
            value={newEducation.courseName}
            onChange={e =>
              setNewEducation({ ...newEducation, courseName: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Year
          </label>
          <input
            type="number"
            placeholder="Start Year"
            value={newEducation.startYear}
            onChange={e =>
              setNewEducation({
                ...newEducation,
                startYear: Number(e.target.value),
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Year
          </label>
          <input
            type="number"
            placeholder="End Year"
            value={newEducation.endYear}
            onChange={e =>
              setNewEducation({
                ...newEducation,
                endYear: Number(e.target.value),
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Result
          </label>
          <input
            type="number"
            placeholder="Result"
            value={newEducation.result}
            onChange={e =>
              setNewEducation({
                ...newEducation,
                result: Number(e.target.value),
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Add
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Education List</h3>
        {educations.length === 0 && (
          <p className="text-gray-500">No education added yet.</p>
        )}
        <ul className="space-y-4">
          {educations.map((edu, idx) => (
            <li key={idx} className="border p-3 rounded-md space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={edu.institutionName}
                  onChange={e =>
                    handleChange(idx, 'institutionName', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Institution Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  type="text"
                  value={edu.courseName}
                  onChange={e =>
                    handleChange(idx, 'courseName', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Course Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Year
                </label>
                <input
                  type="number"
                  value={edu.startYear}
                  onChange={e =>
                    handleChange(idx, 'startYear', Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Start Year"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Year
                </label>
                <input
                  type="number"
                  value={edu.endYear}
                  onChange={e =>
                    handleChange(idx, 'endYear', Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="End Year"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Result
                </label>
                <input
                  type="number"
                  value={edu.result}
                  onChange={e =>
                    handleChange(idx, 'result', Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Result"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
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
        {isSaving ? 'Saving...' : 'Save Education'}
      </button>
      {success && <div className="text-green-600 mt-2 text-center">Saved!</div>}
    </form>
  );
};

export default EducationForm;
