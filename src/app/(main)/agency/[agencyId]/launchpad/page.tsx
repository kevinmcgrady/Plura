import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/lib/db';

type AgencyLaunchpadPageProps = {
  params: {
    agencyId: string;
  };
  searchParams: {
    code: string;
  };
};
const AgencyLaunchpadPage = async ({
  params,
  searchParams,
}: AgencyLaunchpadPageProps) => {
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  });

  if (!agencyDetails) return;

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full h-full max-w-[800px]'>
        <Card className='border-none'>
          <CardHeader>
            <CardTitle>Let&apos;s get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex justify-between items-center w-full border p-4 rounded-lg gap-2'>
              <div className='flex md:items-center gap-4 flex-col md:!flex-row'>
                <Image
                  src='/appstore.png'
                  alt='app store logos'
                  height={80}
                  width={80}
                  className='rounded-md object-contain'
                />
                <p>Save the website as shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>

            <div className='flex justify-between items-center w-full border p-4 rounded-lg gap-2'>
              <div className='flex md:items-center gap-4 flex-col md:!flex-row'>
                <Image
                  src='/stripelogo.png'
                  alt='Stripe'
                  height={80}
                  width={80}
                  className='rounded-md object-contain'
                />
                <p>
                  Connect your stripe account to accept payments and see your
                  dashboard
                </p>
              </div>
              <Button>Start</Button>
            </div>

            <div className='flex justify-between items-center w-full border p-4 rounded-lg gap-2'>
              <div className='flex md:items-center gap-4 flex-col md:!flex-row'>
                <Image
                  src={agencyDetails.agencyLogo}
                  alt={agencyDetails.name}
                  height={80}
                  width={80}
                  className='rounded-md object-contain'
                />
                <p>Fill in all your business details</p>
              </div>
              {allDetailsExist ? (
                <CheckCircle
                  size={50}
                  className='text-primary p-2 flex-shrink-0'
                />
              ) : (
                <Link
                  href={`/agency/${params.agencyId}/settings`}
                  className={buttonVariants()}
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgencyLaunchpadPage;
