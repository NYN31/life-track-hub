const FallbackSpinner = () => {
  return (
    <div className="flex justify-center items-center py-2 bg-gray-50 dark:bg-gray-900 w-full h-[100vh]">
      <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default FallbackSpinner;
