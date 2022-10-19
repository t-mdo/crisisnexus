import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div className="h-screen min-w-fit w-64 py-14 bg-violet-950">
      <NavLink
        className={(isActive) =>
          classnames(
            'block px-8 py-3 bg-violet-950 hover:bg-violet-800 text-lg w-full',
            {
              'text-white': isActive,
              'text-violet-100': !isActive,
            },
          )
        }
        to="/"
      >
        Dashboard
      </NavLink>
    </div>
  );
};

export default SideMenu;
