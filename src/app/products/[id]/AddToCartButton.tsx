
"use client";

import { useTransition, useState } from "react";

interface AddToCartButtonProps {
  productId: string,
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddProductButton({productId, incrementProductQuantity } : AddToCartButtonProps) {
  
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          })
        }}
      >
        Add to Cart
      </button>
      
      {isPending && <span className="loading loading-spinner loading-md"/>}
      {!isPending && success && (
        <span className="text-success">Add to Cart.</span>
      )}
    </div>
  )

}