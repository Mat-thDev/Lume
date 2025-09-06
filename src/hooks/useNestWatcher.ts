import { UnwatchFn, watchImmediate } from '@tauri-apps/plugin-fs';
import { useEffect } from 'react';
import useNest from './useNest';

const useNestWatcher = (path: string) => {
  const { loadNest } = useNest();

  useEffect(() => {
    if (!path) return;

    let unwatch: UnwatchFn | null = null;

    const setupWatcher = async () => {
      unwatch = await watchImmediate(
        path,
        async (event) => {
          console.log('[NestWatcher]', event);
          loadNest(path);
        },
        { recursive: true }
      );
    };

    setupWatcher();

    return () => {
      if (unwatch) {
        unwatch();
      }
    };
  }, [path, loadNest]);
};

export default useNestWatcher;
