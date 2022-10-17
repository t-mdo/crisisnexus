import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import {
  Modal,
  ModalPanel,
  ModalTitle,
  ModalDescription,
} from 'components/Modal';

const TriggerCrisisModal = () => {
  const {
    loading,
    error,
    trigger: triggerPostIncidents,
  } = useHttpQuery({
    url: '/incidents',
    method: 'POST',
    trigger: true,
  });

  return (
    <Modal open={true} onClose={() => {}}>
      <ModalPanel>
        <ModalTitle>Trigger an incident</ModalTitle>
        <ModalDescription>
          <p>bonjour</p>
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

export default TriggerCrisisModal;
