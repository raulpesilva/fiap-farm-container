import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link, useMatch } from 'react-router-dom';

interface MenuItemProps {
  name: string;
  link: string;
  match?: string;
}

const MenuItem = ({ name, link, match }: MenuItemProps) => {
  const isActive = useMatch(match || link);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={`uppercase font-medium ${
          isActive ? 'text-primary hover:text-primary focus:text-primary' : 'text-primary-foreground'
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
        <MenuItem name='Vendas' link='/vendas' match='/vendas*' />
        <MenuItem name='Metas' link='/metas' match='/metas*' />
        <MenuItem name='Produtos' link='/produtos' match='/produtos*' />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
