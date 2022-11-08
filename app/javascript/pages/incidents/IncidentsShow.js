import { useOutletContext } from 'react-router-dom';

const IncidentsShow = () => {
  const { incident } = useOutletContext();

  return (
    <div className="py-6 px-4 md:px-32 overflow-y-auto">
      {incident.summary && (
        <>
          <div className="text font-semibold text-gray-500 mb-2">Summary</div>
          <div className="px-8 py-4 bg-white border rounded text-gray-900 mb-6">
            {incident.summary}
          </div>
        </>
      )}
    </div>
  );
};

export default IncidentsShow;
