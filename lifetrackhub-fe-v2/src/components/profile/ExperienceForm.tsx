import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../features/user/userApi';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';
import { IExperience } from '../../types/user';
import { FiTrash } from 'react-icons/fi';

interface ExperienceFormValues {
  experiences: IExperience[];
}

const ExperienceForm: React.FC = () => {
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
  } = useForm<ExperienceFormValues>({
    defaultValues: { experiences: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  useEffect(() => {
    if (data && data.userDetails?.experiences) {
      reset({ experiences: data.userDetails.experiences });
    }
  }, [data, reset]);

  const onSubmit = async (values: ExperienceFormValues) => {
    if (!data) return;
    const userDetails = {
      ...data.userDetails,
      experiences: values.experiences,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl bg-white shadow-2xl rounded-2xl p-10 border border-purple-100 mx-auto animate-fade-in">
      <h3 className="text-3xl font-extrabold mb-6 text-purple-700 text-center tracking-tight">Experience</h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="border p-5 rounded-xl bg-purple-50/30 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-700">Organization<span className="text-red-500">*</span></label>
                <input
                  {...register(`experiences.${idx}.organizationName`, { required: 'Organization is required' })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Organization Name"
                />
                {errors.experiences?.[idx]?.organizationName && (
                  <span className="text-red-500 text-sm">{errors.experiences[idx]?.organizationName?.message}</span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">Designation<span className="text-red-500">*</span></label>
                <input
                  {...register(`experiences.${idx}.designation`, { required: 'Designation is required' })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Designation"
                />
                {errors.experiences?.[idx]?.designation && (
                  <span className="text-red-500 text-sm">{errors.experiences[idx]?.designation?.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-base font-semibold text-gray-700">Start Date<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.startDate`, { required: 'Start date is required' })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Start Date"
                />
                {errors.experiences?.[idx]?.startDate && (
                  <span className="text-red-500 text-sm">{errors.experiences[idx]?.startDate?.message}</span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.endDate`)}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="End Date"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">Link</label>
                <input
                  {...register(`experiences.${idx}.link`)}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Link (optional)"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-base font-semibold text-gray-700">Description</label>
              <input
                {...register(`experiences.${idx}.description`)}
                className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                placeholder="Description (optional)"
              />
            </div>
            <button type="button" onClick={() => remove(idx)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 transition" title="Remove Experience">
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ organizationName: '', designation: '', description: '', startDate: '', endDate: '', link: '' })} className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 transition w-full flex items-center justify-center gap-2">
          <span>➕ Add Experience</span>
        </button>
      </div>
      <button type="submit" className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl w-full font-bold text-lg shadow-lg transition hover:from-purple-700 hover:to-purple-600 tracking-wide flex items-center justify-center gap-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : ''}`} disabled={isSaving}>
        {isSaving ? (
          <span className="flex items-center gap-2"><Spinner /> Saving...</span>
        ) : (
          <span>💾 Save Experience</span>
        )}
      </button>
      {success && <div className="text-green-600 mt-4 text-center font-semibold animate-fade-in">Saved!</div>}
    </form>
  );
};

export default ExperienceForm;
