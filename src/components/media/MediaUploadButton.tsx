'use client';

import React from 'react';

import { useModal } from '@/providers/model.provider';

import { UploadMediaForm } from '../forms/UploadMedia';
import { Modal } from '../global/Modal';
import { Button } from '../ui/button';

type Props = {
  subaccountId: string;
};

export const MediaUploadButton = ({ subaccountId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal();

  return (
    <Button
      onClick={() => {
        setOpen(
          <Modal
            title='Upload Media'
            subheading='Upload a file to your media bucket'
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </Modal>,
        );
      }}
    >
      Upload
    </Button>
  );
};
