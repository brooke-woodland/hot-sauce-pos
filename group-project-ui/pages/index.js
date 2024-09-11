import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import hotSauceData from "../objects/hot_sauce.json";
import { DialogTrigger, Dialog } from "../components/ui/dialog";
import { addToCart, setProduct } from "../redux/slices/landingslice";
import { useDispatch, useSelector } from "react-redux";
import { ProductModal } from "../components/product-modal";
import { ShoppingCart } from "../components/shopping-cart";

export default function Component() {
  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = hotSauceData.hot_sauces.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const { shoppingCart } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  return (
    <Dialog>
      <ProductModal />
      <ShoppingCart />
      <div className="flex flex-col min-h-screen">
        <header className="bg-gradient-to-r from-[#8B0000] to-[#ff4500] py-8 px-4 md:px-6">
          <div className="container mx-auto flex flex-col items-center">
            <img
              src="/increderablelogo-removebg-preview.png"
              alt="Logo"
              className="w-48 h-36 mb-1"
            />
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Spice Up Your Life
              </h1>
              <p className="text-lg md:text-xl text-white mb-4">
                Discover the best hot sauces for your taste buds
              </p>
              <div className="w-full max-w-md">
                <Input
                  type="search"
                  placeholder="Search for hot sauces..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-white rounded-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 py-12 md:py-16">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <DialogTrigger onClick={(e) => dispatch(setProduct(product))}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    // width={300}
                    // height={200}
                    className={`w-full h-48 object-cover`}
                    style={{ objectFit: "contain" }}
                  />
                </DialogTrigger>
                <div className="p-4 relative z-10 transition-colors duration-300 group-hover:bg-[#ff4500]">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-white">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#ff4500] group-hover:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      disabled={!product.in_stock}
                      onClick={() =>
                        dispatch(addToCart({ product, quantity: 1 }))
                      }
                      className={`transition-colors duration-300 ${
                        product.in_stock
                          ? "hover:bg-gray-500 hover:text-white"
                          : ""
                      }`}
                    >
                      {product.in_stock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="bg-gray-800 py-6 text-white text-center">
          <p>&copy; 2024 Increderable Hot Sauce. All rights reserved.</p>
        </footer>
      </div>
    </Dialog>
  );
}
