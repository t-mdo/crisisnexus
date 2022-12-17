import { useContext } from 'react';
import classnames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import OpenIncidentContext from 'modules/contexts/openIncidentContext';
import AccountContext from 'modules/contexts/accountContext';
import LogoWithWhiteBackground from 'assets/images/LogoWithWhiteBackground.png';
import HouseIcon from 'icons/regular/house-chimney.svg';
import FireIcon from 'icons/regular/fire.svg';
import GearIcon from 'icons/regular/gear.svg';
import UsersGearIcon from 'icons/regular/users-gear.svg';
import UserIcon from 'icons/regular/user.svg';

const MenuOption = ({ children, to, icon: Icon }) => (
  <NavLink
    end
    className={({ isActive }) =>
      classnames(
        'block text-white px-4 py-3 text-lg w-full transition duration-100',
        {
          'bg-stone-800 hover:bg-stone-700': !isActive,
          'bg-stone-600': isActive,
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

  return (
    <div
      className={classnames(
        'flex flex-col justify-between h-screen md:w-64 pt-20 md:pt-0 pb-4 shrink-0 bg-stone-800',
      )}
    >
      <div>
        <Link to="/" className="px-4 flex items-center">
          <img className="hidden sm:block h-8" src={LogoWithWhiteBackground} />
          <h1 className="hidden sm:block ml-4 my-5 text-3xl text-white">
            CrisisNexus
          </h1>
        </Link>
        <MenuOption icon={HouseIcon} to="/">
          Dashboard
        </MenuOption>
        <MenuOption icon={FireIcon} to="/incidents">
          Incidents
        </MenuOption>
        <MenuOption icon={UsersGearIcon} to="/roles">
          Roles
        </MenuOption>
        <MenuOption icon={GearIcon} to="/organization">
          Organization
        </MenuOption>
      </div>
      <div>
        <MenuOption icon={UserIcon} to="/account">
          {account.display_name}
        </MenuOption>
      </div>
    </div>
  );
};

export default SideMenu;
