import useHttpQuery from 'modules/httpQuery/useHttpQuery';
import Text from 'components/Text';
import Button from 'components/Button';
import {
  Modal,
  ModalPanel,
  ModalTitle,
  ModalDescription,
} from 'components/Modal';
import { trackEvent, useTrackEvent } from 'modules/tracking';
import tmoPictureUrl from 'assets/images/tmo.png';

const WelcomeModal = ({ open, onClose }) => {
  useTrackEvent({ name: 'welcome_message_displayed' });

  const { trigger: triggerOrganizationPatch } = useHttpQuery({
    url: '/organization',
    method: 'PATCH',
    body: { welcome_message_displayed: true },
    trigger: true,
  });

  const onLaterButtonClick = () => {
    trackEvent({ name: 'pass_intro_call_button_clicked' });
    triggerOrganizationPatch();
    onClose();
  };

  const onBookButtonClick = () => {
    window.open('https://calendly.com/crisisnexus/onboarding', '_blank');
    trackEvent({ name: 'book_intro_call_button_clicked' });
    triggerOrganizationPatch();
    onClose();
  };

  return (
    <Modal open={open}>
      <ModalPanel size="large">
        <ModalTitle>Welcome to CrisisNexus</ModalTitle>
        <ModalDescription>
          <div className="mb-4 flex gap-8 pt-8">
            <div className="flex flex-col items-center w-1/4">
              <img className="mb-3 rounded-lg" src={tmoPictureUrl} />
              <Text uiStyle="subtext">Thibault Miranda de Oliveira</Text>
              <Text uiStyle="subtext">Founder @ CrisisNexus</Text>
            </div>
            <div className="w-3/4">
              <Text className="mb-4" uiStyle="heading-3">
                Thank you for being one of our earliest users
              </Text>
              <Text>
                Now it’s my focus to ensure your company benefits from the best
                process to handle production incidents.
              </Text>
              <Text className="mb-3">
                The product is in its early life, so you’ll notice that it
                evolves constantly to match your needs.
              </Text>
              <Text className="mb-16">
                Book a first session with me to discuss your current needs and
                start setting up the tool for your organisation.
              </Text>
            </div>
          </div>
          <div className="flex justify-end gap-8 pl-4">
            <div className="flex w-3/4">
              <Button className="mr-4 w-5/6" onClick={onBookButtonClick}>
                Book the session
              </Button>
              <Button
                color="secondary"
                className="w-1/6"
                onClick={onLaterButtonClick}
              >
                Later
              </Button>
            </div>
          </div>
        </ModalDescription>
      </ModalPanel>
    </Modal>
  );
};

const WelcomeModalContainer = ({ open, onClose }) => {
  if (!open) {
    return null;
  }
  return <WelcomeModal open={open} onClose={onClose} />;
};

export default WelcomeModalContainer;
