import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import HouseIcon from 'images/icons/regular/house-chimney.svg';
import FireIcon from 'images/icons/regular/fire.svg';
import GearIcon from 'images/icons/regular/gear.svg';
import UsersGearIcon from 'images/icons/regular/users-gear.svg';
import UserIcon from 'images/icons/regular/user.svg';

const MenuOption = ({ children, to, icon: Icon }) => (
  <NavLink
    end
    className={({ isActive }) =>
      classnames(
        'block text-white px-4 py-3 bg-violet-950 hover:bg-violet-800 text-lg w-full transition duration-100',
        {
          'bg-violet-800': isActive,
        },
      )
    }
    to={to}
  >
    <div className="flex items-center">
      <Icon className="w-5 mr-4 fill-white" />
      {children}
    </div>
  </NavLink>
);

const SideMenu = () => (
  <div className="flex flex-col justify-between h-screen min-w-fit w-64 pt-14 pb-4 bg-violet-950">
    <div>
      <MenuOption icon={HouseIcon} to="/">
        Dashboard
      </MenuOption>
      <MenuOption icon={FireIcon} to="/incidents">
        Incidents
      </MenuOption>
      <MenuOption icon={UsersGearIcon} to="/roles">
        Roles
      </MenuOption>
      <MenuOption icon={GearIcon} to="/settings">
        Organization
      </MenuOption>
    </div>
    <div>
      <MenuOption icon={UserIcon} to="/account">
        Account
      </MenuOption>
    </div>
  </div>
);

export default SideMenu;
