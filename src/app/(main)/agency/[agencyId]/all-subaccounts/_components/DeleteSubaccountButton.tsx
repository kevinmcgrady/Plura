'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from '@/lib/queries';

type DeleteSubaccountButtonProps = {
  subaccountId: string;
};

export const DeleteSubaccountButton = ({
  subaccountId,
}: DeleteSubaccountButtonProps) => {
  const router = useRouter();

  return (
    <div
      className='text-white'
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Deleted a subaccount | ${response?.name}`,
          subaccountId,
        });
        await deleteSubAccount(subaccountId);
        router.refresh();
      }}
    >
      Delete Sub Account
    </div>
  );
};
