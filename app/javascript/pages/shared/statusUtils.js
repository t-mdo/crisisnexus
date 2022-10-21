import FireIcon from 'images/icons/solid/fire.svg';
import CircleCheckIcon from 'images/icons/solid/circle-check.svg';
import FileCheckIcon from 'images/icons/solid/file-check.svg';
import {
  STATUS_TYPE_INFO,
  STATUS_TYPE_ERROR,
  STATUS_TYPE_SUCCESS,
} from 'components/StatusBadge';

export const getStatusBadgeType = (status) => {
  if (status === 'open') return STATUS_TYPE_ERROR;
  if (status === 'closed') return STATUS_TYPE_INFO;
  return STATUS_TYPE_SUCCESS;
};

export const getStatusBadgeIcon = (status) => {
  if (status === 'open') return FireIcon;
  if (status === 'closed') return CircleCheckIcon;
  return FileCheckIcon;
};

export default { getStatusBadgeType, getStatusBadgeIcon };
