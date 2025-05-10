'use client';

import cogoToast from '@dsdeepak17/cogo-toast';
import Name from './name';
import Description from './description';
import Options from './options';
import Members from './members';
import { MemberModel, ProjectModel } from '@teamgather/common';
import { useState } from 'react';
import { axios, AxiosError } from '@/services/axios.service';
import { COMMON_ERROR_FETCH_MESSAGE_CONSTANT } from '@/constants/message.constant';
import { nl2br } from 'react-js-nl2br';
import { TitleUtil } from '@/utils/app.util';
import { MomentDateTimeUtil } from '@/utils/moment.util';
import { useAppSelector } from '@/stores/hook';
import { ProjectMemberOwnerUtil } from '@/utils/project.util';

/**
 * ANCHOR Props
 * @date 09/05/2025 - 13:29:28
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  pageTitle: string;
  pagePath: string;
  apiPath: string;
};

/**
 * ANCHOR Info
 * @date 09/05/2025 - 13:29:31
 *
 * @param {Props} props
 * @returns {*}
 */
const Info = (props: Props) => {
  const { pageTitle, pagePath, apiPath } = props;
  const { me } = useAppSelector((state) => state.auth);

  const [project, setProject] = useState<ProjectModel>(props.project);

  const member: MemberModel | null = ProjectMemberOwnerUtil(project, me);

  /**
   * ANCHOR Fetch
   * @date 09/05/2025 - 13:37:43
   *
   * @async
   * @returns {Promise<ProjectModel | null>}
   */
  const _fetch = async (): Promise<ProjectModel | null> => {
    let project: ProjectModel | null = null;

    try {
      const { data } = await axios.get(`${apiPath}/${props.project.id}/info`);

      const doc: ProjectModel = data.project;

      setProject(doc);

      project = doc;
      document.title = TitleUtil(pageTitle, doc.name);
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response &&
        e.response.data &&
        e.response.data.eMessage
      ) {
        cogoToast.error(nl2br(e.response.data.eMessage));
      } else {
        cogoToast.error(COMMON_ERROR_FETCH_MESSAGE_CONSTANT);
      }
    }

    return project;
  };

  /**
   * ANCHOR Refetch
   * @date 09/05/2025 - 13:38:34
   *
   * @async
   * @returns {Promise<void>}
   */
  const _refetch = async (): Promise<void> => {
    await _fetch();
  };

  // ANCHOR Render
  return (
    <div className="flex flex-row items-start w-full border border-red-500">
      <div className="w-9/12 border border-purple-500">
        <Name project={project} apiPath={apiPath} refetch={_refetch} />
      </div>
      <div className="w-3/12 flex flex-col items-start space-y-4 border border-orange-500">
        {member && (
          <div className="flex flex-row justify-end w-full">
            <Options project={project} pagePath={pagePath} apiPath={apiPath} />
          </div>
        )}
        <div className="flex flex-row items-start space-x-3 text-sm w-full border border-red-500">
          <strong className="font-semibold">Created At</strong>
          <span className="flex-1 text-right">
            {MomentDateTimeUtil(project.createdAt)}
          </span>
        </div>
        <Description project={project} apiPath={apiPath} refetch={_refetch} />
        <Members project={project} apiPath={apiPath} refetch={_refetch} />
      </div>
    </div>
  );
};

export default Info;
