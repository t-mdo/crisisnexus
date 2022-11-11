import FireIcon from 'images/icons/solid/fire.svg';
import CircleCheckIcon from 'images/icons/solid/circle-check.svg';
import FileCheckIcon from 'images/icons/solid/file-check.svg';
import {
  STATUS_STYLE_INFO,
  STATUS_STYLE_ERROR,
  STATUS_STYLE_SUCCESS,
} from 'components/StatusBadge';

export const getStatusBadgeType = (status) => {
  if (status === 'open') return STATUS_STYLE_ERROR;
  if (status === 'closed') return STATUS_STYLE_INFO;
  return STATUS_STYLE_SUCCESS;
};

export const getStatusBadgeIcon = (status) => {
  if (status === 'open') return FireIcon;
  if (status === 'closed') return CircleCheckIcon;
  return FileCheckIcon;
};

export default { getStatusBadgeType, getStatusBadgeIcon };
