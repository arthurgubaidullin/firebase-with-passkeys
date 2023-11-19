import { useId } from 'react';

export const SaveDeviceForm = () => {
  const id = useId();
  return (
    <form>
      <div>
        <label htmlFor={id}>Save device?</label>
        <input id={id} type="checkbox" required />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};
