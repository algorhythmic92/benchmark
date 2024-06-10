import { useCallback, useState } from 'react';

const useSetVisibility = () => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return { show, hide, visible };
};

export default useSetVisibility;
