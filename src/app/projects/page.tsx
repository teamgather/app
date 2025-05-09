import List from './(components)/list';
import { TitleUtil } from '@/utils/app.util';
import { Metadata } from 'next';

const pageTitle: string = 'Projects';

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
  const title: string = TitleUtil(pageTitle);

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
const Page = () => {
  // ANCHOR Render
  return <List pageTitle={pageTitle} pagePath={pagePath} apiPath={apiPath} />;
};

export default Page;
