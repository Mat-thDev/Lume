import { watchImmediate } from '@tauri-apps/plugin-fs';
import { useEffect } from 'react';
import useNest from './useNest';

const useNestWatcher = (path: string) => {
  const { loadNest } = useNest();

  useEffect(() => {
    if (!path) return;

    const watcher = watchImmediate(path, async (event) => {
      console.log('[NestWatcher]', event);
      loadNest(path);
    }, { recursive: true });

    return () => {
      watcher.then((unwatch) => unwatch());
    };
  }, [path]);
};

export default useNestWatcher;
