 import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetClose,
  SheetContent,
  Sheet,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/slices/landingslice";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function ShoppingCart() {
  const { shoppingCart } = useSelector((state) => state.home);
  const total = shoppingCart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalQuantity = shoppingCart.reduce(
    (acc, obj) => acc + obj.quantity,
    0
  );

  useEffect(() => {}, [shoppingCart]);

  const dispatch = useDispatch();

  const Router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed top-4 right-4 z-50" variant="outline">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="sr-only">Open cart</span>
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center h-6 w-6 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="grid gap-6 p-6">
          {shoppingCart.map((item) => (
            <div
              key={item.product.id}
              className="grid grid-cols-[auto_80px_1fr] gap-4 items-center"
            >
              <button
                className="text-gray-600 hover:text-red-600 focus:outline-none"
                onClick={() => dispatch(removeFromCart(item))}
              >
                &times;
              </button>
              <img
                src={item.product.image_url}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="grid gap-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Qty: {item.quantity}
                  </div>
                  <div className="font-medium">
                    ${item.product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="p-6 grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Total</span>
            <span className="font-medium">${total}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <Button
              onClick={(e) =>
                Router.push({ pathname: "/checkout" }, undefined, {
                  shallow: true,
                })
              }
              size="lg"
            >
              Checkout
            </Button>
            <SheetClose asChild>
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
