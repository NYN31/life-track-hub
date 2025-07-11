import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../features/user/userApi';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';
import { ISkill } from '../../types/user';

const COMPETENCY_OPTIONS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

const SkillsForm = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [newSkill, setNewSkill] = useState<ISkill>({
    skillName: '',
    skillExperienceYear: 0,
    skillCompetency: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data && data.userDetails?.skills) {
      setSkills(data.userDetails.skills);
    }
  }, [data]);

  const handleAdd = () => {
    if (!newSkill.skillName) return;
    setSkills([...skills, newSkill]);
    setNewSkill({ skillName: '', skillExperienceYear: 0, skillCompetency: '' });
  };

  const handleRemove = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const handleChange = (
    idx: number,
    field: keyof ISkill,
    value: string | number
  ) => {
    setSkills(
      skills.map((skill, i) =>
        i === idx ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const userDetails = {
      ...data.userDetails,
      skills,
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
      .catch()
      .finally(() => {});
  };

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Skill</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.skillName}
              onChange={e =>
                setNewSkill({ ...newSkill, skillName: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Year
            </label>
            <input
              type="number"
              placeholder="Experience Year"
              value={newSkill.skillExperienceYear}
              onChange={e =>
                setNewSkill({
                  ...newSkill,
                  skillExperienceYear: Number(e.target.value),
                })
              }
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Competency
            </label>
            <select
              value={newSkill.skillCompetency}
              onChange={e =>
                setNewSkill({ ...newSkill, skillCompetency: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select Competency</option>
              {COMPETENCY_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
        <h3 className="text-lg font-semibold mb-2">Skills List</h3>
        {skills.length === 0 && (
          <p className="text-gray-500">No skills added yet.</p>
        )}
        <ul className="space-y-4">
          {skills.map((skill, idx) => (
            <li key={idx} className="border p-3 rounded-md space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.skillName}
                  onChange={e => handleChange(idx, 'skillName', e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Skill Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Year
                </label>
                <input
                  type="number"
                  value={skill.skillExperienceYear}
                  onChange={e =>
                    handleChange(
                      idx,
                      'skillExperienceYear',
                      Number(e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Experience Year"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Competency
                </label>
                <select
                  value={skill.skillCompetency}
                  onChange={e =>
                    handleChange(idx, 'skillCompetency', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select Competency</option>
                  {COMPETENCY_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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
        disabled={isSaving}
        className={`px-4 py-2 bg-blue-600 text-white rounded-md w-full ${
          isSaving
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
        }`}
      >
        Save Skills
      </button>
      {success && <div className="text-green-600 mt-2 text-center">Saved!</div>}
    </form>
  );
};

export default SkillsForm;
