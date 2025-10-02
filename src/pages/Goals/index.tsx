import { EmptyState, GoalCard } from '@/components';
import { Button } from '@/components/ui/button';
import { useGoalsSelect, useProductsSelect } from '@/states';
import { Link } from 'react-router-dom';

export const Goals = () => {
  const goals = useGoalsSelect();
  const products = useProductsSelect();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Metas</h1>

      {!products?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhum produto?'
          buttonText='Cadastrar produto'
          navigateTo='/produtos/cadastro'
        />
      )}

      {!!products?.length && !goals?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhuma meta?'
          buttonText='Cadastrar meta'
          navigateTo='/metas/cadastro'
        />
      )}

      {!!goals?.length && (
        <>
          <Button className='cursor-pointer duration-300' asChild>
            <Link to='/metas/cadastro'>Cadastrar meta</Link>
          </Button>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {goals.map((g) => (
              <GoalCard
                key={g.id}
                name={g.name}
                measure={g.measure}
                type={g.type}
                value={g.value}
                target={g.target}
                product_id={g.product_id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
