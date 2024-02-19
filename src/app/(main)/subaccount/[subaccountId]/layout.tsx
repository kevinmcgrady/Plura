import { currentUser } from '@clerk/nextjs';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';

import { InfoBar } from '@/components/global/Infobar';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Unauthorized } from '@/components/unauthorized/Unauthorized';
import {
  getAuthUserDetails,
  getNotificationsAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/queries';

type SubaccountLayoutProps = {
  children: React.ReactNode;
  params: { subaccountId: string };
};

const SubaccountLayout = async ({
  children,
  params,
}: SubaccountLayoutProps) => {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) return <Unauthorized />;

  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  let notifications: any = [];

  if (!user.privateMetadata.role) {
    return <Unauthorized />;
  } else {
    const allPermissions = await getAuthUserDetails();
    const hasPermission = allPermissions?.Permissions.find(
      (permissions) =>
        permissions.access && permissions.subAccountId === params.subaccountId,
    );
    if (!hasPermission) {
      return <Unauthorized />;
    }

    const allNotifications = await getNotificationsAndUser(agencyId);

    if (
      user.privateMetadata.role === 'AGENCY_ADMIN' ||
      user.privateMetadata.role === 'AGENCY_OWNER'
    ) {
      notifications = allNotifications;
    } else {
      const filteredNotifications = allNotifications?.filter(
        (item) => item.subAccountId === params.subaccountId,
      );

      if (filteredNotifications) notifications = filteredNotifications;
    }
  }

  return (
    <div className='h-screen overflow-hidden'>
      <Sidebar id={params.subaccountId} type='subaccount' />

      <div className='md:pl-[400px]'>
        <InfoBar
          notifications={notifications}
          role={user.privateMetadata.role as Role}
          subAccountId={params.subaccountId as string}
        />
        <div className='relative'>{children}</div>
      </div>
    </div>
  );
};

export default SubaccountLayout;
