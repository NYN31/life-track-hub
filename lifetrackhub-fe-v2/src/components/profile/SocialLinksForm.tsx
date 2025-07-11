import React, { useState, useEffect } from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../features/user/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import Spinner from '../common/Spinner';

interface SocialLink {
  socialPlatformName: string;
  link: string;
}

const SocialLinksForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [newLink, setNewLink] = useState<SocialLink>({
    socialPlatformName: '',
    link: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data && data.userDetails?.socialLinks) {
      setLinks(data.userDetails.socialLinks);
    }
  }, [data]);

  const handleAdd = () => {
    if (!newLink.socialPlatformName || !newLink.link) return;
    setLinks([...links, newLink]);
    setNewLink({ socialPlatformName: '', link: '' });
  };

  const handleRemove = (idx: number) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const handleChange = (
    idx: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setLinks(links.map((l, i) => (i === idx ? { ...l, [field]: value } : l)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const userDetails = {
      ...data.userDetails,
      socialLinks: links,
    };
    const payload = {
      ...data,
      userDetails,
    };
    const result = await updateProfile(payload as any).unwrap();
    dispatch(setUser(result));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-white shadow-lg rounded-xl p-8 border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-4 text-blue-700">Social Links</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Platform Name
          </label>
          <input
            type="text"
            placeholder="Platform Name"
            value={newLink.socialPlatformName}
            onChange={e =>
              setNewLink({ ...newLink, socialPlatformName: e.target.value })
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
            value={newLink.link}
            onChange={e => setNewLink({ ...newLink, link: e.target.value })}
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
        <h3 className="text-lg font-semibold mb-2">Social Links List</h3>
        {links.length === 0 && (
          <p className="text-gray-500">No social links added yet.</p>
        )}
        <ul className="space-y-4">
          {links.map((l, idx) => (
            <li key={idx} className="border p-3 rounded-md space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={l.socialPlatformName}
                  onChange={e =>
                    handleChange(idx, 'socialPlatformName', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Platform Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  value={l.link}
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
        {isSaving ? 'Saving...' : 'Save Social Links'}
      </button>
      {success && <div className="text-green-600 mt-2 text-center">Saved!</div>}
    </form>
  );
};

export default SocialLinksForm;
