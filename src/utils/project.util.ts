import {
  MemberModel,
  MemberRoleEnum,
  ProjectModel,
  UserModel,
} from '@teamgather/common';

/**
 * ANCHOR Project Member Owner Util
 * @date 09/05/2025 - 12:15:32
 *
 * @export
 * @param {ProjectModel} project
 * @param {(UserModel | null)} me
 * @returns {(MemberModel | null)}
 */
export function ProjectMemberOwnerUtil(
  project: ProjectModel,
  me: UserModel | null,
): MemberModel | null {
  // me
  if (!me) {
    return null;
  }

  // member
  const member: MemberModel | undefined = project.members.find((e) => {
    return e.userId == me.id;
  });

  if (!member) {
    return null;
  }

  // owner role
  if (member.role != MemberRoleEnum.Owner) {
    return null;
  }

  return member;
}
