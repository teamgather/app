import Card from './card';
import Create from './create';
import { useAppSelector } from '@/stores/hook';
import { ProjectMemberOwnerUtil } from '@/utils/project.util';
import { MemberModel, ProjectModel } from '@teamgather/common';

/**
 * ANCHOR Props
 * @date 10/05/2025 - 19:20:40
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  apiPath: string;
  refetch: () => Promise<void>;
};

/**
 * ANCHOR Members
 * @date 10/05/2025 - 19:21:23
 *
 * @param {Props} props
 * @returns {*}
 */
const Members = (props: Props) => {
  const { project, apiPath, refetch } = props;
  const { me } = useAppSelector((state) => state.auth);

  const member: MemberModel | null = ProjectMemberOwnerUtil(project, me);

  // ANCHOR Render
  return (
    <div className="flex flex-col space-y-3 w-full border border-orange-500">
      <div className="flex flex-row items-center">
        <h3 className="flex-1">
          <span className="underline mr-1">Members</span>
          <span>({project.members.length})</span>
        </h3>
        {member && (
          <Create project={project} apiPath={apiPath} refetch={refetch} />
        )}
      </div>
      <div className="w-full">
        {project.members.map((member) => {
          return <Card key={member.id} member={member} />;
        })}
      </div>
    </div>
  );
};

export default Members;
