import { ShoppingCart } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { QuantityInput } from '../Form/QuantityInput'
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles'

type Coffee = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
}

type CoffeeCardProps = {
  coffee: Coffee;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  onAddToCart: (coffee: Coffee) => void;
}

export function CoffeeCard({
  coffee,
  incrementQuantity,
  decrementQuantity,
  onAddToCart,
}: CoffeeCardProps) {
  const theme = useTheme()

  function handleAddItem() {
    console.log('Adicionar item ao carrinho')
    return;
  }
  

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.title} />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span>
        </Price>

        <Order $itemAdded={coffee.quantity > 0}>
          <QuantityInput
            quantity={coffee.quantity}
            incrementQuantity={() => incrementQuantity(coffee.id)}
            decrementQuantity={() => decrementQuantity(coffee.id)}
          />

          <button onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme.colors['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}
