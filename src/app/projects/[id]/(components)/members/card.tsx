import { MemberModel } from '@teamgather/common';

/**
 * ANCHOR Props
 * @date 10/05/2025 - 19:29:12
 *
 * @typedef {Props}
 */
type Props = {
  member: MemberModel;
};

/**
 * ANCHOR Card
 * @date 10/05/2025 - 19:29:23
 *
 * @param {Props} props
 * @returns {*}
 */
const Card = (props: Props) => {
  const { member } = props;

  // ANCHOR Render
  return (
    <div className="border-b border-gray-200 text-sm">
      <span className="mr-2">{member.userName}</span>
      <span className="text-gray-600 text-xs">[{member.userEmail}]</span>
    </div>
  );
};

export default Card;
