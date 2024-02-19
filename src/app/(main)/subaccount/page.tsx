import { redirect } from 'next/navigation';

import { Unauthorized } from '@/components/unauthorized/Unauthorized';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';

type SubaccountPageProps = {
  searchParams: {
    state: string;
    code: string;
  };
};

const SubaccountPage = async ({ searchParams }: SubaccountPageProps) => {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) return <Unauthorized />;

  const user = await getAuthUserDetails();

  if (!user) return;

  const getFirstSubaccountWithAccess = user.Permissions.find(
    (permission) => permission.access === true,
  );

  if (searchParams.state) {
    const statePath = searchParams.state.split('___')[0];
    const stateSubaccountId = searchParams.state.split('___')[1];

    if (!stateSubaccountId) return <Unauthorized />;

    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`,
    );
  }

  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.id}`);
  }

  return <Unauthorized />;
};

export default SubaccountPage;
