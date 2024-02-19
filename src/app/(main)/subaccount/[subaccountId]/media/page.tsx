import React from 'react';

import { BlurPage } from '@/components/global/BlurPage';
import { MediaComponent } from '@/components/media/Media';
import { getMedia } from '@/lib/queries';

type Props = {
  params: { subaccountId: string };
};

const MediaPage = async ({ params }: Props) => {
  const data = await getMedia(params.subaccountId);

  return (
    <BlurPage>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </BlurPage>
  );
};

export default MediaPage;
