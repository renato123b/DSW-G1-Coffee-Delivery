import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'
import { useEffect, useState } from 'react'
import axios from 'axios'


import { Card } from '../../components/CoffeeCard'
import { CoffeeList, Heading, Hero, HeroContent, Info } from './styles'

interface CoffeeData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
};

export function Home() {
  const theme = useTheme();
  const [coffees, setCoffees] = useState<CoffeeData[]>([]);


  useEffect(() => {
    axios.get<CoffeeData[]>('http://localhost:3000/coffees')
      .then(response => {
        setCoffees(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar cafés:", error)
      });
  }, []);

  function incrementQuantity(id: string) {
    setCoffees(prev =>
      prev.map(coffee =>
        coffee.id === id && coffee.quantity < 5
          ? { ...coffee, quantity: coffee.quantity + 1 }
          : coffee
      )
    );
  }

  function decrementQuantity(id: string) {
    setCoffees(prev =>
      prev.map(coffee =>
        coffee.id === id && coffee.quantity > 0
          ? { ...coffee, quantity: coffee.quantity - 1 }
          : coffee
      )
    );
  }

  function handleAddToCart(coffee: CoffeeData) {
    console.log('Adicionar ao carrinho:', coffee)
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>
              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart     
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>

        <div>
          {coffees.map((coffee) => (
            <Card
            key={coffee.id}
            coffee={coffee}
          />
          
          ))}
        </div>
      </CoffeeList>
    </div>
  );
}