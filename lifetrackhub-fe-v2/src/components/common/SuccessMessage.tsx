const SuccessMessage = ({
  message = 'Submition has been successful!',
}: {
  message?: string;
}) => {
  return (
    <div className="text-green-600 dark:text-green-400 mt-4 text-center font-semibold animate-fade-in">
      {message}
    </div>
  );
};

export default SuccessMessage;
