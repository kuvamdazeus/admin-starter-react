import AppMenuitem from "./AppMenuitem";
import { MenuProvider } from "./context/menucontext";
import menuItems from "./items.json";

const AppMenu = () => {
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {menuItems.map((item, i) => (
          <AppMenuitem item={item} root={true} index={i} key={item.label} />
        ))}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
