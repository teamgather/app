import Info from './(components)/info';
import { TitleUtil } from '@/utils/app.util';
import { Metadata } from 'next';
import { ProjectModel } from '@teamgather/common';
import { cookies } from 'next/headers';
import { axios } from '@/services/axios.service';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/app.type';
import { cache } from 'react';

const pageTitle: string = 'Projects';

const apiPath: string = 'project';

/**
 * ANCHOR Project
 * @date 09/05/2025 - 11:42:05
 *
 * @type {*}
 */
const Project = cache(async (id: string) => {
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
});

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
 * @date 09/05/2025 - 11:42:59
 *
 * @export
 * @async
 * @param {PageProps<Props>} props
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata(
  props: PageProps<Props>,
): Promise<Metadata> {
  const { params } = props;
  const { id } = await params;

  // titles
  const titles: string[] = [pageTitle];

  // project
  const project: ProjectModel | null = await Project(id);

  if (project) {
    titles.push(project.name);
  }

  // title
  const title: string = TitleUtil(...titles);

  return {
    title,
  };
}

/**
 * ANCHOR Page
 * @date 09/05/2025 - 11:36:20
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
  return <Info project={project} pageTitle={pageTitle} apiPath={apiPath} />;
};

export default Page;
