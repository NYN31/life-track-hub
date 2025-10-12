import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQuery from '../../../helper/hooks/useQuery';
import { getDateToString, getStrToDate } from '../../../helper/utils/get-date';
import { getValidParams } from '../../../helper/utils/get-valid-params';
import { useLazyGetUsersQuery } from '../../../features/user/userApi';
import { UserResponseDto } from '../../../types/user';
import { OptionType } from '../../../types/common';
import CommonSearchBox from '../../../components/common/CommonSearchBox';
import OnClickFilterIcon from '../../../components/common/button/OnClickFilterIcon';
import ErrorMessage from '../../../components/common/ErrorMessage';
import Pagination from '../../../components/common/Pagination';
import UserSearchResult from '../../../components/user/UserSearchResult';
import { useToast } from '../../../context/toast-context';
import {
  USER_ACCOUNT_TYPE_OPTIONS,
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
} from '../../../constants/select-options/user-options';
import CustomSelect from '../../../components/common/form/CustomSelect';
import { PAGE_SIZE_OPTIONS } from '../../../constants/select-options/common';

const UserListContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Query params
  const queryPageNo = useQuery().get('page') || '0';
  const queryPageSize = useQuery().get('size') || '10';
  const queryEmail = useQuery().get('email') || '';
  const queryRole = useQuery().get('role') || '';
  const queryAccountStatus = useQuery().get('accountStatus') || '';
  const queryAccountType = useQuery().get('accountType') || '';
  const queryStartDate = getStrToDate(useQuery().get('start') || null);
  const queryEndDate = getStrToDate(useQuery().get('end') || null);

  // State
  const [results, setResults] = useState<UserResponseDto[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(-1);

  const [email, setEmail] = useState(queryEmail);
  const [role, setRole] = useState<OptionType | null>(
    queryRole ? { value: queryRole, label: queryRole } : null
  );
  const [accountStatus, setAccountStatus] = useState<OptionType | null>(
    queryAccountStatus
      ? { value: queryAccountStatus, label: queryAccountStatus }
      : null
  );
  const [accountType, setAccountType] = useState<OptionType | null>(
    queryAccountType
      ? { value: queryAccountType, label: queryAccountType }
      : null
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    queryStartDate,
    queryEndDate,
  ]);
  const [pageSize, setPageSize] = useState<OptionType>({
    value: queryPageSize,
    label: `${queryPageSize} per page`,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [triggerGetUsers] = useLazyGetUsersQuery();

  const handleUpdateElementSizePerPage = (option: OptionType | null) => {
    if (option) {
      setPageSize(option);
      updateAndPushUrl(
        0,
        option.value,
        email,
        role?.value || '',
        accountStatus?.value || '',
        accountType?.value || '',
        dateRange
      );
    }
  };

  const updateAndPushUrl = (
    page: number,
    size: string,
    email: string,
    role: string,
    accountStatus: string,
    accountType: string,
    dateRange: [Date | null, Date | null]
  ) => {
    const validParams = getValidParams(
      `page=${page}&size=${size}&email=${email}&role=${role}&accountStatus=${accountStatus}&accountType=${accountType}&start=${getDateToString(
        dateRange[0]
      )}&end=${getDateToString(dateRange[1])}`
    );
    navigate(`/user-management/users${validParams}`);
  };

  const handleSearch = async (
    pageId: number,
    pageSize: string,
    email: string,
    role: string,
    accountStatus: string,
    accountType: string,
    dateRange: [Date | null, Date | null]
  ) => {
    setErrorMessage('');
    setIsLoading(true);

    await triggerGetUsers({
      page: pageId,
      size: parseInt(pageSize),
      email: email || null,
      role: role || null,
      accountStatus: accountStatus || null,
      accountType: accountType || null,
      start: getDateToString(dateRange[0]) || null,
      end: getDateToString(dateRange[1]) || null,
    })
      .unwrap()
      .then(response => {
        const { hasNext, hasPrevious, totalPages, pageNumber, content } =
          response;
        setHasNext(hasNext);
        setHasPrevious(hasPrevious);
        setTotalPages(totalPages);
        setPageNumber(pageNumber);
        setResults(content);

        if (content.length === 0) {
          setErrorMessage('No users found within filter criteria');
          toast('No users found within filter criteria', 'info', 3000);
        }
      })
      .catch((error: any) => {
        setErrorMessage(error?.data?.message);
        setResults([]);
        toast(error?.data?.message, 'error', 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUsersSearch = () => {
    updateAndPushUrl(
      0,
      pageSize.value,
      email,
      role?.value || '',
      accountStatus?.value || '',
      accountType?.value || '',
      dateRange
    );
  };

  const handleReset = () => {
    const pageNo = 0;
    const email = '';
    const role = '';
    const accountStatus = '';
    const accountType = '';
    const startDate = null;
    const endDate = null;
    updateAndPushUrl(pageNo, '10', email, role, accountStatus, accountType, [
      startDate,
      endDate,
    ]);
    if (
      queryEmail ||
      queryRole ||
      queryAccountStatus ||
      queryAccountType ||
      queryStartDate ||
      queryEndDate
    ) {
      setEmail(email);
      setRole({ value: '', label: '' });
      setAccountStatus({ value: '', label: '' });
      setAccountType({ value: '', label: '' });
      setDateRange([startDate, endDate]);
    }
    setResults([]);
  };

  const handleNextPage = () => {
    const nextPageNo = Number(queryPageNo) + 1;
    updateAndPushUrl(
      nextPageNo,
      queryPageSize,
      queryEmail,
      queryRole,
      queryAccountStatus,
      queryAccountType,
      [queryStartDate, queryEndDate]
    );
  };

  const handlePreviousPage = () => {
    const prevPageNo = Number(queryPageNo) - 1;
    updateAndPushUrl(
      prevPageNo,
      queryPageSize,
      queryEmail,
      queryRole,
      queryAccountStatus,
      queryAccountType,
      [queryStartDate, queryEndDate]
    );
  };

  useEffect(() => {
    setEmail(queryEmail);
    setRole({ value: queryRole, label: queryRole });
    setAccountStatus({ value: queryAccountStatus, label: queryAccountStatus });
    setAccountType({ value: queryAccountType, label: queryAccountType });
    setDateRange([queryStartDate, queryEndDate]);

    handleSearch(
      Number(queryPageNo),
      queryPageSize,
      queryEmail,
      queryRole,
      queryAccountStatus,
      queryAccountType,
      [queryStartDate, queryEndDate]
    );
  }, [location.search]);

  //if (isLoading) return <Spinner />;

  return (
    <div className="common-box-container">
      <div className="flex items-start justify-between">
        <h1>Users List</h1>

        <div className="flex items-center justify-end">
          <OnClickFilterIcon
            showFilter={showFilters}
            showFilterHandler={() => setShowFilters(v => !v)}
          />
        </div>
      </div>

      {showFilters && (
        <div className="gap-6">
          <CommonSearchBox
            textFields={[
              {
                name: 'Email',
                value: email,
                setValue: setEmail,
                isTrim: true,
                isMandatory: false,
              },
            ]}
            selectDropdowns={[
              {
                name: 'Role',
                option: role,
                options: USER_ROLE_OPTIONS,
                setOption: setRole,
                isMandatory: false,
              },
              {
                name: 'Account Status',
                option: accountStatus,
                options: USER_STATUS_OPTIONS,
                setOption: setAccountStatus,
                isMandatory: false,
              },
              {
                name: 'Account Type',
                option: accountType,
                options: USER_ACCOUNT_TYPE_OPTIONS,
                setOption: setAccountType,
                isMandatory: false,
              },
            ]}
            dateFields={[
              {
                name: 'Date Range',
                date: dateRange,
                setDateRange: setDateRange,
                isMandatory: false,
              },
            ]}
            handleSearch={handleUsersSearch}
            handleReset={handleReset}
          />
        </div>
      )}

      {/* Page Size Selector */}
      <div className="flex justify-between mb-2">
        <caption className="caption-top py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md">
          Total pages: <span className="font-semibold">{totalPages}</span>
        </caption>

        <div className="w-48">
          <CustomSelect
            label=""
            value={pageSize}
            options={PAGE_SIZE_OPTIONS}
            onChangeAction={handleUpdateElementSizePerPage}
          />
        </div>
      </div>

      {/* User List Table */}
      <UserSearchResult results={results} isLoading={isLoading} />

      {results.length > 0 && (
        <Pagination
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPageNo={pageNumber}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          totalPages={totalPages}
          onPageChange={page =>
            updateAndPushUrl(
              page,
              pageSize.value,
              email,
              role?.value || '',
              accountStatus?.value || '',
              accountType?.value || '',
              dateRange
            )
          }
        />
      )}

      {(errorMessage || results.length === 0) && (
        <ErrorMessage
          message={errorMessage || 'No users found within filter criteria'}
        />
      )}
    </div>
  );
};

export default UserListContainer;
