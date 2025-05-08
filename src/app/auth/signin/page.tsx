import Form from './(components)/form';
import { TitleUtil } from '@/utils/app.util';
import { Metadata } from 'next';

const pageTitle: string = 'Sign In';

const apiPath: string = 'auth';
const subPath: string = 'signin';

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
  const title: string = TitleUtil(pageTitle);

  return {
    title,
  };
}

/**
 * ANCHOR Page
 * @date 07/05/2025 - 17:35:50
 *
 * @returns {*}
 */
const Page = () => {
  // ANCHOR Render
  return (
    <div>
      <Form apiPath={apiPath} subPath={subPath} />
    </div>
  );
};

export default Page;
