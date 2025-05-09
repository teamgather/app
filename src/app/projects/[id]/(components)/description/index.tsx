'use client';

import useKeydown from '@buildinams/use-keydown';
import Form from './form';
import { useAppSelector } from '@/stores/hook';
import { ProjectMemberOwnerUtil } from '@/utils/project.util';
import { FormModeEnum, MemberModel, ProjectModel } from '@teamgather/common';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { nl2br } from 'react-js-nl2br';

/**
 * ANCHOR Props
 * @date 09/05/2025 - 14:06:29
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  apiPath: string;
  refetch: () => Promise<void>;
};

/**
 * ANCHOR Description
 * @date 09/05/2025 - 14:06:55
 *
 * @param {Props} props
 * @returns {*}
 */
const Description = (props: Props) => {
  const { project, apiPath, refetch } = props;
  const { me } = useAppSelector((state) => state.auth);

  const [mode, setMode] = useState<FormModeEnum | null>(null);
  const [doing, setDoing] = useState<boolean>(false);

  /**
   * ANCHOR Edit
   * @date 09/05/2025 - 12:22:47
   */
  const _edit = () => {
    setMode(FormModeEnum.Update);
  };

  /**
   * ANCHOR Done
   * @date 09/05/2025 - 12:30:37
   */
  const _done = () => {
    setMode(null);
  };

  useKeydown('Escape', () => {
    if (!doing) {
      _done();
    }
  });

  // member owner
  const member: MemberModel | null = ProjectMemberOwnerUtil(project, me);

  // ANCHOR Render
  return (
    <div className="relative">
      <>
        {!mode && (
          <>
            {member && (
              <>
                {project.description && (
                  <Tooltip title="Click to Edit" placement="top" arrow={true}>
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={_edit}>
                      {nl2br(project.description)}
                    </button>
                  </Tooltip>
                )}
                {!project.description && (
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={_edit}>
                    <span className="italic text-sm text-gray-500">
                      Click to add project description.
                    </span>
                  </button>
                )}
              </>
            )}
            {!member && (
              <>
                {project.description && (
                  <span>{nl2br(project.description)}</span>
                )}
              </>
            )}
          </>
        )}
        {mode == FormModeEnum.Update && (
          <Form
            project={project}
            apiPath={apiPath}
            doing={doing}
            setDoing={setDoing}
            onDone={_done}
            refetch={refetch}
          />
        )}
      </>
    </div>
  );
};

export default Description;
