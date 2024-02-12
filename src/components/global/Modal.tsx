'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import React from 'react';

import { useModal } from '@/providers/model.provider';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';

type ModalProps = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const Modal = ({
  children,
  defaultOpen,
  subheading,
  title,
}: ModalProps) => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className='overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card no-scrollbar'>
        <DialogHeader className='pt-8 text-left'>
          <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
