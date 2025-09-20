import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useLocation } from 'react-router-dom';

interface MenuItemProps {
  name: string;
  link: string;
}

const NAVIGATION_ITEMS = [
  { name: 'Estoques', link: '/estoques' },
  { name: 'Vendas', link: '/vendas' },
  { name: 'Metas', link: '/metas' },
  { name: 'Produtos', link: '/produtos' },
];

const MenuItem = ({ name, link }: MenuItemProps) => {
  const { pathname } = useLocation();
  const formattedPathname = pathname.toLowerCase();
  const formattedName = name.toLowerCase();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={link}
        className={`uppercase font-medium text-primary-foreground ${
          formattedPathname.includes(formattedName) ? 'text-primary hover:text-primary' : ''
        }`}
      >
        {name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export const NavigateMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_ITEMS?.map((item) => (
          <MenuItem key={item.name} name={item.name} link={item.link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
