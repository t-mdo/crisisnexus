import { useContext } from 'react';
import classnames from 'classnames';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import AccountContext from 'modules/contexts/accountContext';
import { NavLink } from 'react-router-dom';
import HouseIcon from 'images/icons/regular/house-chimney.svg';
import FireIcon from 'images/icons/regular/fire.svg';
import GearIcon from 'images/icons/regular/gear.svg';
import UsersGearIcon from 'images/icons/regular/users-gear.svg';
import UserIcon from 'images/icons/regular/user.svg';

const MenuOption = ({ children, to, icon: Icon, incidentInProgress }) => (
  <NavLink
    end
    className={({ isActive }) =>
      classnames(
        'block text-white px-4 py-3 text-lg w-full transition duration-100',
        {
          'bg-stone-800 hover:bg-stone-700': !isActive && !incidentInProgress,
          'bg-red-800 hover:bg-red-700': !isActive && incidentInProgress,
          'bg-stone-600': isActive && !incidentInProgress,
          'bg-red-600': isActive && incidentInProgress,
        },
      )
    }
    to={to}
  >
    <div className="flex items-center overflow-x-hidden text-allipsis">
      <Icon className="w-5 md:mr-4 fill-white shrink-0" />
      <div className="text-ellipsis overflow-x-hidden hidden md:block">
        {children}
      </div>
    </div>
  </NavLink>
);

const SideMenu = () => {
  const { account } = useContext(AccountContext);
  const { openIncident, openIncidentFetchDone } =
    useContext(OpenIncidentContext);

  const incidentInProgress = openIncidentFetchDone && openIncident;

  return (
    <div
      className={classnames(
        'flex flex-col justify-between h-screen md:w-64 pt-20 md:pt-0 pb-4 shrink-0',
        {
          'bg-red-800': incidentInProgress,
          'bg-stone-800': !incidentInProgress,
        },
      )}
    >
      <div>
        <h1 className="hidden sm:block ml-4 my-5 text-3xl text-white">
          CrisisNexus
        </h1>
        <MenuOption
          incidentInProgress={incidentInProgress}
          icon={HouseIcon}
          to="/"
        >
          Dashboard
        </MenuOption>
        <MenuOption
          incidentInProgress={incidentInProgress}
          icon={FireIcon}
          to="/incidents"
        >
          Incidents
        </MenuOption>
        <MenuOption
          incidentInProgress={incidentInProgress}
          icon={UsersGearIcon}
          to="/roles"
        >
          Roles
        </MenuOption>
        <MenuOption
          incidentInProgress={incidentInProgress}
          icon={GearIcon}
          to="/organization"
        >
          Organization
        </MenuOption>
      </div>
      <div>
        <MenuOption
          incidentInProgress={incidentInProgress}
          icon={UserIcon}
          to="/account"
        >
          {account.email}
        </MenuOption>
      </div>
    </div>
  );
};

export default SideMenu;
