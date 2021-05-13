import debounce from 'lodash/debounce';
import { useRecoilState } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const useDebouncedRecoilState = (atom, delay = 100) => {
  const [get, set] = useRecoilState(atom);
  const debouncedSet = debounce((...args) => set(...args), delay);
  return [get, debouncedSet];
};
