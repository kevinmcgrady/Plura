'use client';

import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client';
import { PlusCircleIcon } from 'lucide-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { SubAccountDetails } from '@/components/forms/SubaccountDetails';
import { Modal } from '@/components/global/Modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/providers/model.provider';

type CreateSubaccountButtonProps = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
              SideBarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  id: string;
  className: string;
};

export const CreateSubaccountButton = ({
  className,
  id,
  user,
}: CreateSubaccountButtonProps) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge('w-full flex gap-4', className)}
      onClick={() => {
        setOpen(
          <Modal
            title='Create a Subaccount'
            subheading='You can switch bettween'
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </Modal>,
        );
      }}
    >
      <PlusCircleIcon size={15} />
      Create Sub Account
    </Button>
  );
};
