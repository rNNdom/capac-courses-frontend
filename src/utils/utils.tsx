/* eslint-disable @typescript-eslint/no-explicit-any */
export const optionSelect = (option: any) => {
  return (
    <option key={option.id} value={option.id} className="text-blue-100-color">
      {option.name}
    </option>
  );
};
