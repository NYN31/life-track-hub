import React, { useState, useEffect } from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../features/user/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';
import { IAchievement } from '../../types/user';

const AchievementsForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<IAchievement>({
    achievementTitle: '',
    description: '',
    link: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data && data.userDetails?.achievements) {
      setAchievements(data.userDetails.achievements);
    }
  }, [data]);

  const handleAdd = () => {
    if (!newAchievement.achievementTitle) return;
    setAchievements([...achievements, newAchievement]);
    setNewAchievement({ achievementTitle: '', description: '', link: '' });
  };

  const handleRemove = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx));
  };

  const handleChange = (
    idx: number,
    field: keyof IAchievement,
    value: string
  ) => {
    setAchievements(
      achievements.map((ach, i) =>
        i === idx ? { ...ach, [field]: value } : ach
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const userDetails = {
      ...data.userDetails,
      achievements,
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
      <h3 className="text-2xl font-bold mb-4 text-blue-700">Achievements</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            value={newAchievement.achievementTitle}
            onChange={e =>
              setNewAchievement({
                ...newAchievement,
                achievementTitle: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            value={newAchievement.description}
            onChange={e =>
              setNewAchievement({
                ...newAchievement,
                description: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="text"
            placeholder="Link"
            value={newAchievement.link}
            onChange={e =>
              setNewAchievement({ ...newAchievement, link: e.target.value })
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
        <h3 className="text-lg font-semibold mb-2">Achievements List</h3>
        {achievements.length === 0 && (
          <p className="text-gray-500">No achievements added yet.</p>
        )}
        <ul className="space-y-4">
          {achievements.map((ach, idx) => (
            <li key={idx} className="border p-3 rounded-md space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={ach.achievementTitle}
                  onChange={e =>
                    handleChange(idx, 'achievementTitle', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={ach.description}
                  onChange={e =>
                    handleChange(idx, 'description', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  value={ach.link}
                  onChange={e => handleChange(idx, 'link', e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Link"
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
        {isSaving ? 'Saving...' : 'Save Achievements'}
      </button>
      {success && <div className="text-green-600 mt-2 text-center">Saved!</div>}
    </form>
  );
};

export default AchievementsForm;
