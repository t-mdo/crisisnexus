import { useContext } from 'react';
import AccountContext from 'modules/contexts/accountContext';
import Card from 'components/Card';
import { Button, BUTTON_TYPE_PRIMARY } from 'components/Button';

const Account = () => {
  const { account } = useContext(AccountContext);

  if (!account) return null;
  return (
    <div className="py-6 px-4 md:px-32">
      <h2 className="mb-6 font-semibold text-3xl">Account</h2>
      <Card className="py-4 px-8">
        <p className="mb-8 text-lg">
          Logged in as: <span className="font-semibold">{account.email}</span>
        </p>
        <div className="flex justify-end">
          <a href="/logout" rel="nofollow">
            <Button type={BUTTON_TYPE_PRIMARY}>Logout</Button>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Account;
