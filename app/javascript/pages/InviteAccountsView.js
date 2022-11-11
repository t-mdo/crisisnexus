import { useState, useContext } from 'react';
import OrganizationContext from 'modules/contexts/organizationContext';
import FullView from 'components/FullView';
import Card from 'components/Card';
import Alert from 'components/Alert';
import { Input } from 'components/form/Input';

const InviteAccountsView = () => {
  const [copied, setCopied] = useState(false);
  const { organization } = useContext(OrganizationContext);
  const url = `https://www.crisisnexus.com/account/new?organization=${organization.identifier}`;

  return (
    <FullView className="py-6 px-4 md:px-32">
      <h3 className="mb-6 font-semibold text-2xl">
        Invite accounts to your organization
      </h3>
      <Card className="px-8 py-6">
        {copied && (
          <Alert className="mb-2" color="success">
            Copied
          </Alert>
        )}
        <p className="mb-4 text-gray-900">
          Here is your invitation link. Send it to your org and they will be
          able to join your organization on CrisisNexus.
        </p>
        <button
          className="w-full"
          onClick={() => {
            navigator.clipboard.writeText(url).then(() => setCopied(true));
          }}
        >
          <Input className="mb-4 w-full" disabled value={url} />
        </button>
        <p className="mb-4 text-sm text-gray-400">
          Alernatively, they can create an account from the landing page using a
          email domain that matches your organization's domain.
        </p>
      </Card>
    </FullView>
  );
};

export default InviteAccountsView;
