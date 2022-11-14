import FireIcon from 'icons/solid/fire.svg';
import CircleCheckIcon from 'icons/solid/circle-check.svg';
import FileCheckIcon from 'icons/solid/file-check.svg';
import {
  STATUS_COLOR_INFO,
  STATUS_COLOR_ERROR,
  STATUS_COLOR_SUCCESS,
} from 'components/StatusBadge';

export const getStatusBadgeType = (status) => {
  if (status === 'open') return STATUS_COLOR_ERROR;
  if (status === 'closed') return STATUS_COLOR_INFO;
  return STATUS_COLOR_SUCCESS;
};

export const getStatusBadgeIcon = (status) => {
  if (status === 'open') return FireIcon;
  if (status === 'closed') return CircleCheckIcon;
  return FileCheckIcon;
};

export default { getStatusBadgeType, getStatusBadgeIcon };
