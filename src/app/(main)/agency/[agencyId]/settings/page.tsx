import { currentUser } from '@clerk/nextjs';

import { AgencyDetails } from '@/components/forms/AgencyDetails';
import { UserDetails } from '@/components/forms/UserDetails';
import { db } from '@/lib/db';

type AgencySettingsPageProps = {
  params: {
    agencyId: string;
  };
};

const AgencySettingsPage = async ({ params }: AgencySettingsPageProps) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!userDetails) return null;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  const subAccounts = agencyDetails.SubAccount;

  return (
    <div className='flex lg:!flex-row flex-row gap-4'>
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type='agency'
        id={params.agencyId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default AgencySettingsPage;
