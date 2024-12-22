import { mdiHomeSilo, mdiCow, mdiSilo, mdiBarley, mdiTractor, mdiNotebook, mdiMedicalBag, mdiCog } from '@mdi/js';

interface AppPage {
  url: string;
  mdiIcon: string;
  title: string;
}

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    mdiIcon: mdiHomeSilo,
  },
  {
    title: 'Livestock',
    url: '/livestock',
    mdiIcon: mdiCow,
  },
  {
    title: 'Veterinary',
    url: '/veterinary',
    mdiIcon: mdiMedicalBag,
  },
  {
    title: 'Feed',
    url: '/feed',
    mdiIcon: mdiSilo,
  },
  {
    title: 'Harvest',
    url: '/harvest',
    mdiIcon: mdiBarley,
  },
  {
    title: 'Equipment',
    url: '/equipment',
    mdiIcon: mdiTractor,
  },
  {
    title: 'Diary',
    url: '/diary',
    mdiIcon: mdiNotebook,
  },
  {
    title: 'Settings',
    url: '/settings',
    mdiIcon: mdiCog,
  },
];