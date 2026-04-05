'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/store/cart';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={cn(
        "w-full py-5 px-8 flex items-center justify-center gap-3 transition-all duration-500 uppercase tracking-[0.4em] text-[10px] font-accent",
        added 
          ? "bg-green-900/20 text-green-400 border border-green-900" 
          : "bg-gold text-black hover:bg-white hover:text-black",
        className
      )}
    >
      {added ? (
        <>
          <Check size={16} />
          Добавлено
        </>
      ) : (
        <>
          <ShoppingCart size={16} strokeWidth={1.5} />
          В корзину
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
