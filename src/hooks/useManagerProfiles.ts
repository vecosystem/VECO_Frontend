import { useMemo } from 'react';

interface Manager {
  profileUrl: string | null;
  name?: string;
  managerName?: string;
}

interface Managers {
  info?: Manager[];
}

interface Item {
  managers?: Managers;
}

export const useManagerProfiles = <T extends Item>(items: T[] | undefined) => {
  return useMemo(() => {
    const profiles: { [key: string]: string | null } = {};

    items?.forEach((item) => {
      if (item?.managers?.info) {
        item.managers.info.forEach((manager) => {
          const key = manager.managerName || manager.name;
          if (key && !profiles[key]) {
            profiles[key] = manager.profileUrl || null;
          }
        });
      }
    });

    return profiles;
  }, [items]);
};
