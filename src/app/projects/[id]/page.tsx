import Link from 'next/link';
import { TitleUtil } from '@/utils/app.util';
import { Metadata } from 'next';
import { Button } from '@mui/material';
import { ProjectModel } from '@teamgather/common';
import { cookies } from 'next/headers';
import { axios } from '@/services/axios.service';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/app.type';

const pageTitle: string = 'Projects';

const apiPath: string = 'project';

/**
 * ANCHOR Project
 * @date 09/05/2025 - 11:10:58
 *
 * @async
 * @param {string} id
 * @returns {Promise<ProjectModel | null>}
 */
async function Project(id: string): Promise<ProjectModel | null> {
  'use server';

  // cookies
  const cookieStore = await cookies();

  // project
  let project: ProjectModel | null = null;

  if (cookieStore.has(process.env.NEXT_PUBLIC_AUTH_ACCESS_TOKEN_COOKIE_NAME)) {
    const accessToken: string = cookieStore.get(
      process.env.NEXT_PUBLIC_AUTH_ACCESS_TOKEN_COOKIE_NAME,
    )!.value;

    try {
      const { data } = await axios.get(`${apiPath}/${id}/info`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (data.project) {
        project = data.project;
      }
    } catch {}
  }

  return project;
}

/**
 * ANCHOR Props
 * @date 09/05/2025 - 11:10:28
 *
 * @typedef {Props}
 */
type Props = {
  id: string;
};

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
 * @date 09/05/2025 - 11:10:13
 *
 * @async
 * @param {PageProps<Props>} props
 * @returns {unknown}
 */
const Page = async (props: PageProps<Props>) => {
  const { params } = props;
  const { id } = await params;

  // project
  const project: ProjectModel | null = await Project(id);

  if (!project) {
    notFound();
  }

  // ANCHOR Render
  return (
    <div>
      <h1 className="mb-6">{pageTitle}</h1>
      <Button
        href="/projects/create"
        LinkComponent={Link}
        variant="contained"
        disableElevation={true}>
        Create Project
      </Button>
    </div>
  );
};

export default Page;
