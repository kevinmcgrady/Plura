import { currentUser } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

import { SendInvitation } from '@/components/forms/SendInvitation';
import { db } from '@/lib/db';

import { columns } from './Columns';
import DataTable from './DataTable';

type AgencyTeamPageProps = {
  params: {
    agencyId: string;
  };
};

const AgencyTeamPage = async ({ params }: AgencyTeamPageProps) => {
  const authUser = await currentUser();

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: {
        include: {
          SubAccount: true,
        },
      },
      Permissions: {
        include: {
          SubAccount: true,
        },
      },
    },
  });

  if (!authUser) return null;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue='name'
      columns={columns}
      data={teamMembers}
    />
  );
};

export default AgencyTeamPage;
