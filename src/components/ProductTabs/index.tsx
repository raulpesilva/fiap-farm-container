import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const tabItems = [
  { value: 'estoques', label: 'Estoques', path: '/estoques/cadastro' },
  { value: 'metas', label: 'Metas', path: '/metas/cadastro' },
  { value: 'vendas', label: 'Vendas', path: '/vendas/cadastro' },
];

export const ProductTabs = () => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue={tabItems[0].value} className='w-full'>
      <TabsList className='w-full'>
        {tabItems.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='cursor-pointer duration-300'>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabItems.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Button onClick={() => navigate(tab.path)} className='w-full cursor-pointer duration-300'>
            Cadastrar
          </Button>
        </TabsContent>
      ))}
    </Tabs>
  );
};
