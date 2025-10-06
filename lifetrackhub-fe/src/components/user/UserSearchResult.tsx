import TableHeader from '../common/TableHeader';
import { USER_TABLE_HEADERS } from '../../constants/table-headers/user-table-header';
import { UserResponseDto } from '../../types/user';

const UserSearchResult: React.FC<{ results: UserResponseDto[] }> = ({
  results,
}) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader header={USER_TABLE_HEADERS} />
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
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
              <tr key={user.id}>
                {columns.map((value, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {value}
                  </td>
                ))}
                <td>
                  <button className="btn-secondary text-xs uppercase">
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserSearchResult;
