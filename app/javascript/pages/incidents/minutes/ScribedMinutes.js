import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { BlockLoader } from 'components/Loader';
import { List, ListRow } from 'components/list/List';

export const ScribedMinutesContainer = ({ children }) => (
  <div className="flex flex-col overflow-y-auto">
    <div className="flex w-full px-3">
      <span className="w-1/6 font-medium">Who</span>
      <span className="w-4/6 font-medium">What</span>
      <span className="w-1/6 font-medium text-right">When</span>
    </div>
    {children}
  </div>
);

export const ScribedMinutes = ({ loading, minutes }) => {
  const listRef = useRef();

  useEffect(() => {
    if (!listRef.current) return;

    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [minutes]);

  if (loading && !minutes) return <BlockLoader />;
  if (minutes)
    return (
      <List ref={listRef} className="border rounded">
        {minutes.map((minute, i) => (
          <ListRow key={i} className="flex items-center px-3 py-2 w-full">
            <div className="w-1/6">{minute.who}</div>
            <div className="w-4/6">{minute.what}</div>
            <div className="w-1/6 text-sm text-right text-gray-400">
              {dayjs(minute.created_at).format('HH:mm:ss')}
            </div>
          </ListRow>
        ))}
      </List>
    );
};

export default ScribedMinutes;
