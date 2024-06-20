export const Input = ({
  name,
  register,
  error,
  placeHolder,
  isTextArea = false,
}: {
  name: string;
  placeHolder: string;
  register: any;
  error?: any;
  isTextArea?: boolean;
}) => {
  if (isTextArea) {
    return (
      <div className="flex flex-col md:col-span-2">
        <textarea
          {...register}
          className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          placeholder={placeHolder}
          name={name}
        />
        {error?.message && (
          <p className="text-red-500 text-sm mt-1">{error?.message}</p>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <input
        {...register}
        className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        placeholder={placeHolder}
        name={name}
      />
      {error?.message && (
        <p className="text-red-500 text-sm mt-1">{error?.message}</p>
      )}
    </div>
  );
};
