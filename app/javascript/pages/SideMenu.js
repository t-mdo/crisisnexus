import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import HouseIcon from 'images/icons/regular/house-chimney.svg';
import FireIcon from 'images/icons/regular/fire.svg';

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

const SideMenu = () => {
  return (
    <div className="h-screen min-w-fit w-64 py-14 bg-violet-950">
      <MenuOption icon={HouseIcon} to="/">
        Dashboard
      </MenuOption>
      <MenuOption icon={FireIcon} to="/incidents">
        Incidents
      </MenuOption>
    </div>
  );
};

export default SideMenu;
