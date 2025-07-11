import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../features/user/userApi';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';
import { IAchievement } from '../../types/user';
import { FiTrash } from 'react-icons/fi';

interface AchievementsFormValues {
  achievements: IAchievement[];
}

const AchievementsForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [success, setSuccess] = React.useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AchievementsFormValues>({
    defaultValues: { achievements: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'achievements',
  });

  useEffect(() => {
    if (data && data.userDetails?.achievements) {
      reset({ achievements: data.userDetails.achievements });
    }
  }, [data, reset]);

  const onSubmit = async (values: AchievementsFormValues) => {
    if (!data) return;
    const userDetails = {
      ...data.userDetails,
      achievements: values.achievements,
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
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(() => {});
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-2xl bg-white shadow-2xl rounded-2xl p-10 border border-purple-100 mx-auto animate-fade-in"
    >
      <h3 className="text-3xl font-extrabold mb-6 text-purple-700 text-center tracking-tight">
        Achievements
      </h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="border p-5 rounded-xl bg-purple-50/30 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-700">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`achievements.${idx}.achievementTitle`, {
                    required: 'Title is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Title"
                />
                {errors.achievements?.[idx]?.achievementTitle && (
                  <span className="text-red-500 text-sm">
                    {errors.achievements[idx]?.achievementTitle?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">
                  Description<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`achievements.${idx}.description`, {
                    required: 'Description is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Description"
                />
                {errors.achievements?.[idx]?.description && (
                  <span className="text-red-500 text-sm">
                    {errors.achievements[idx]?.description?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-base font-semibold text-gray-700">
                Link
              </label>
              <input
                {...register(`achievements.${idx}.link`)}
                className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                placeholder="Link (optional)"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 transition"
              title="Remove Achievement"
            >
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({ achievementTitle: '', description: '', link: '' })
          }
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 transition w-full flex items-center justify-center gap-2"
        >
          <span>➕ Add Achievement</span>
        </button>
      </div>
      <button
        type="submit"
        className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl w-full font-bold text-lg shadow-lg transition hover:from-purple-700 hover:to-purple-600 tracking-wide flex items-center justify-center gap-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        disabled={isSaving}
      >
        {isSaving ? (
          <span className="flex items-center gap-2"><Spinner /> Saving...</span>
        ) : (
          <span>💾 Save Achievements</span>
        )}
      </button>
      {success && (
        <div className="text-green-600 mt-4 text-center font-semibold animate-fade-in">
          Saved!
        </div>
      )}
    </form>
  );
};

export default AchievementsForm;
