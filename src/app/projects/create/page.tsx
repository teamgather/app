import Form from './(components)/form';
import { Authorized } from '@/functions/auth.function';
import { TitleUtil } from '@/utils/app.util';
import { UserModel } from '@teamgather/common';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const pageTitle: string = 'Projects';
const subTitle: string = 'Create Project';

const pagePath: string = 'projects';
const apiPath: string = 'project';

/**
 * ANCHOR Generate Metadata
 * @date 07/05/2025 - 17:49:28
 *
 * @export
 * @async
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata(): Promise<Metadata> {
  // title
  const title: string = TitleUtil(pageTitle, subTitle);

  return {
    title,
  };
}

/**
 * ANCHOR Page
 * @date 07/05/2025 - 03:11:38
 *
 * @returns {*}
 */
const Page = async () => {
  // me
  const me: UserModel | null = await Authorized();

  if (!me) {
    redirect('/');
  }

  // ANCHOR Render
  return (
    <div>
      <h1>{pageTitle}</h1>
      <h2 className="mb-10">{subTitle}</h2>
      <Form pagePath={pagePath} apiPath={apiPath} />
    </div>
  );
};

export default Page;
