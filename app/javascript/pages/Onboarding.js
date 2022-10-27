import Card from 'components/Card';
import OnboardingStepOrganization from 'pages/onboarding/OnboardingStepOrganization';
import OnboardingStepPhoneNumber from 'pages/onboarding/OnboardingStepPhoneNumber';

const OnboardingStepEnd = () => {};

const Step = (props) => {
  if (!props.organization) {
    return <OnboardingStepOrganization {...props} />;
  }
  if (!props.account.phone_number) {
    return <OnboardingStepPhoneNumber {...props} />;
  }
  if (props.invitationStepPassed) {
    return <OnboardingStepEnd {...props} />;
  }
};

const Onboarding = ({ account, setAccount, organization, setOrganization }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="p-8 w-3/4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">
            Welcome to CrisisNexus
          </h1>
          <h3 className="text-sm text-gray-400">
            This is a quick onboarding to setup everything for you and your
            team.
            <br /> It should only take a few minutes.
          </h3>
        </div>
        <Step
          account={account}
          setAccount={setAccount}
          organization={organization}
          setOrganization={setOrganization}
        />
      </Card>
    </div>
  );
};

export default Onboarding;
