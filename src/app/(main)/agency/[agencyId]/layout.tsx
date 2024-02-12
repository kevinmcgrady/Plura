import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import type React from 'react';

import { Sidebar } from '@/components/sidebar/Sidebar';
import {
  getNotificationsAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/queries';

import UnauthorizedPage from '../unauthorized/page';

type AgencyIdLayoutProps = {
  children: React.ReactNode;
  params: {
    agencyId: string;
  };
};

const AgencyIdLayout = async ({ children, params }: AgencyIdLayoutProps) => {
  const agencyId = await verifyAndAcceptInvitation();

  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  if (!agencyId) {
    return redirect('/agency');
  }

  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  ) {
    return <UnauthorizedPage />;
  }

  let allNotifications = [];

  const notifications = await getNotificationsAndUser(agencyId);

  if (notifications) {
    allNotifications = notifications;
  }
  return (
    <div className='h-screen overflow-hidden'>
      <Sidebar id={params.agencyId} type='agency' />
      <div className='md:pl-[400px]'>{children}</div>
    </div>
  );
};

export default AgencyIdLayout;
