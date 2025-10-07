import { useNavigate } from 'react-router-dom';
import TableHeader from '../common/TableHeader';
import { USER_TABLE_HEADERS } from '../../constants/table-headers/user-table-header';
import { UserResponseDto } from '../../types/user';
import Spinner from '../common/Spinner';

const UserSearchResult: React.FC<{
  results: UserResponseDto[];
  isLoading: boolean;
}> = ({ results, isLoading }) => {
  const navigate = useNavigate();

  const getTableContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (results.length === 0) {
      return (
        <tr>
          <td colSpan={USER_TABLE_HEADERS.length} className="text-center p-4">
            No users found.
          </td>
        </tr>
      );
    }

    return (
      <>
        {results.map(user => {
          const columns = [
            user.email,
            user.name,
            user.role,
            user.accountStatus,
            user.accountType,
            new Date(user.createdDate).toLocaleString(),
            new Date(user.lastModifiedDate).toLocaleString(),
          ];

          return (
            <tr
              key={user.email}
              onClick={() => navigate(`/user-management/users/${user.email}`)}
              className="hover:bg-purple-200 dark:hover:bg-purple-800 cursor-pointer"
            >
              {columns.map((value, i) => (
                <td
                  key={i}
                  className="px-2 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                >
                  {value}
                </td>
              ))}
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader header={USER_TABLE_HEADERS} />
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {getTableContent()}
        </tbody>
      </table>
    </div>
  );
};

export default UserSearchResult;
