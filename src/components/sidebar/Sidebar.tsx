import { getAuthUserDetails } from '@/lib/queries';

import { MenuOptions } from './MenuOptions';

type SidebarType = 'agency' | 'subaccount';

type SidebarProps = {
  id: string;
  type: SidebarType;
};

export const Sidebar = async ({ id, type }: SidebarProps) => {
  const user = await getAuthUserDetails();

  if (!user || !user.Agency) return null;

  const details =
    type === 'agency'
      ? user.Agency
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabeledAgency = user.Agency.whiteLabel;

  if (!details) return;

  let sidebarLogo = user.Agency.agencyLogo || '/assets/plura-logo.svg';

  if (!isWhiteLabeledAgency) {
    if (type === 'subaccount') {
      sidebarLogo =
        user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOptions =
    type === 'agency'
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access,
    ),
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOptions}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOptions}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};
