import Form from './(components)/form';
import { TitleUtil } from '@/utils/app.util';
import { Metadata } from 'next';

const apiPath: string = 'auth';
const subPath: string = 'signup';

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
  const title: string = TitleUtil('Sign Up');

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
