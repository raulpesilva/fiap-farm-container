import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';

interface MenuItemProps {
  name: string;
  link: string;
}

const MenuItem = ({ name, link }: MenuItemProps) => {
  const { pathname } = useLocation();
  const formattedPathname = pathname.toLowerCase();
  const formattedName = name.toLowerCase();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={`uppercase font-medium text-primary-foreground ${
          formattedPathname.includes(formattedName) ? 'text-primary hover:text-primary' : ''
        }`}
        asChild
      >
        <Link to={link}>{name}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export const NavigateMenu = () => {
  return (
    <NavigationMenu className='order-4 md:order-1 mx-auto md:mx-0 min-w-full md:min-w-0'>
      <NavigationMenuList>
        <MenuItem name='Estoques' link='/' />
        <MenuItem name='Vendas' link='/vendas' />
        <MenuItem name='Metas' link='/metas' />
        <MenuItem name='Produtos' link='/produtos' />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
