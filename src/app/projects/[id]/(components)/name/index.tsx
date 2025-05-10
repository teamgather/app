'use client';

import useKeydown from '@buildinams/use-keydown';
import Form from './form';
import { useAppSelector } from '@/stores/hook';
import { ProjectMemberOwnerUtil } from '@/utils/project.util';
import { Tooltip } from '@mui/material';
import { FormModeEnum, MemberModel, ProjectModel } from '@teamgather/common';
import { useState } from 'react';

/**
 * ANCHOR Props
 * @date 09/05/2025 - 11:53:08
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  apiPath: string;
  refetch: () => Promise<void>;
};

/**
 * ANCHOR Name
 * @date 09/05/2025 - 11:53:22
 *
 * @param {Props} props
 */
const Name = (props: Props) => {
  const { project, apiPath, refetch } = props;
  const { me } = useAppSelector((state) => state.auth);

  const [mode, setMode] = useState<FormModeEnum | null>(null);
  const [doing, setDoing] = useState<boolean>(false);

  const member: MemberModel | null = ProjectMemberOwnerUtil(project, me);

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

  // ANCHOR Render
  return (
    <div className="relative">
      <h1 className="mb-6 border border-red-500">
        {!member && <span>{project.name}</span>}
        {member && (
          <>
            {!mode && (
              <Tooltip title="Click to Edit" placement="top" arrow={true}>
                <button
                  type="button"
                  className="cursor-pointer hover:underline hover:decoration-dashed"
                  onClick={_edit}>
                  {project.name}
                </button>
              </Tooltip>
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
        )}
      </h1>
    </div>
  );
};

export default Name;
