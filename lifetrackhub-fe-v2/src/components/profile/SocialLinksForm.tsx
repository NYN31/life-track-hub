import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../features/user/userApi';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';
import { FiTrash } from 'react-icons/fi';

interface SocialLink {
  socialPlatformName: string;
  link: string;
}

interface SocialLinksFormValues {
  socialLinks: SocialLink[];
}

const SocialLinksForm: React.FC = () => {
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
  } = useForm<SocialLinksFormValues>({
    defaultValues: { socialLinks: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  useEffect(() => {
    if (data && data.userDetails?.socialLinks) {
      reset({ socialLinks: data.userDetails.socialLinks });
    }
  }, [data, reset]);

  const onSubmit = async (values: SocialLinksFormValues) => {
    if (!data) return;
    const userDetails = {
      ...data.userDetails,
      socialLinks: values.socialLinks,
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
      <h3 className="text-3xl font-extrabold mb-6 text-purple-700 text-center tracking-tight">Social Links</h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="border p-5 rounded-xl bg-purple-50/30 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-700">Platform Name<span className="text-red-500">*</span></label>
                <input
                  {...register(`socialLinks.${idx}.socialPlatformName`, { required: 'Platform name is required' })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Platform Name"
                />
                {errors.socialLinks?.[idx]?.socialPlatformName && (
                  <span className="text-red-500 text-sm">{errors.socialLinks[idx]?.socialPlatformName?.message}</span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700">Link<span className="text-red-500">*</span></label>
                <input
                  {...register(`socialLinks.${idx}.link`, { required: 'Link is required' })}
                  className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  placeholder="Link"
                />
                {errors.socialLinks?.[idx]?.link && (
                  <span className="text-red-500 text-sm">{errors.socialLinks[idx]?.link?.message}</span>
                )}
              </div>
            </div>
            <button type="button" onClick={() => remove(idx)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 transition" title="Remove Social Link">
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ socialPlatformName: '', link: '' })} className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 transition w-full flex items-center justify-center gap-2">
          <span>➕ Add Social Link</span>
        </button>
      </div>
      <button type="submit" className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl w-full font-bold text-lg shadow-lg transition hover:from-purple-700 hover:to-purple-600 tracking-wide flex items-center justify-center gap-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : ''}`} disabled={isSaving}>
        {isSaving ? (
          <span className="flex items-center gap-2"><Spinner /> Saving...</span>
        ) : (
          <span>💾 Save Social Links</span>
        )}
      </button>
      {success && <div className="text-green-600 mt-4 text-center font-semibold animate-fade-in">Saved!</div>}
    </form>
  );
};

export default SocialLinksForm;
