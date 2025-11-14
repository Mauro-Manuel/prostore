"use client";

import { CartItem } from "@/types/index";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    }

    // Handle success add to cart

    toast({
      description: `${item.name} added to cart.`,
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="Go To Cart"
          onClick={() => router.push("/cart")}
        >
         Go to cart
        </ToastAction>
      ),
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
       <PlusCircle />  Add to Cart
    </Button>
  );
};

export default AddToCart;
