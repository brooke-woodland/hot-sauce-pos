import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { addToCart } from "@/redux/slices/landingslice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import hotSauceData from "../objects/hot_sauce.json";

const heatLevels = [
  { label: "Mild", range: [0, 2500] },
  { label: "Moderately Mild", range: [2500, 10000] },
  { label: "Moderate", range: [10000, 30000] },
  { label: "Moderately Hot", range: [30000, 50000] },
  { label: "Hot", range: [50000, 100000] },
  { label: "Very Hot", range: [100000, 350000] },
  { label: "Extremely Hot", range: [350000, 2200000] },
  { label: "Exceptionally Hot", range: [2200000, Infinity] },
];

function getHeatLevelClassification(shu) {
  const level = heatLevels.find(
    ({ range }) => shu >= range[0] && shu < range[1]
  );
  return level ? level.label : "Unknown";
}

function getStarRating(newRating, currentRating, num_ratings, id) {
  for (let hotSauce of hotSauceData.hot_sauces) {
    if (hotSauce.id === id) {
      hotSauce.rating =
        (currentRating * num_ratings + newRating) / num_ratings + 1;
      currentProduct.num_ratings += 1;

      break;
    }
  }
}

export function ProductModal() {
  const currentProduct = useSelector((state) => state.home.currentProduct);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setqty(1);
  }, [currentProduct]);

  const [qty, setqty] = useState(1);
  const [added, setadded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ product: currentProduct, quantity: qty }));
    setqty(1);
    setadded(true);
    setTimeout(() => {
      setadded(false);
    }, 2000);
  };

  if (!currentProduct) return null;

  const heatLevelClassification = getHeatLevelClassification(
    currentProduct.heat_level_SHU
  );

  return (
    <DialogContent className="sm:max-w-[800px]">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img
            alt={currentProduct.name}
            className="rounded-lg object-cover w-full aspect-square"
            height={400}
            src={currentProduct.image_url}
            width={400}
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentProduct.name}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {currentProduct.description}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-[#ff4500]">
                ${currentProduct.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={qty === 1}
                  onClick={() => setqty(qty - 1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{qty}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setqty(qty + 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-[#ff4500] text-white"
              disabled={!currentProduct.in_stock}
              onClick={() => handleAddToCart()}
            >
              {added ? "Added!" : "Add to Cart"}
            </Button>
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700">
                Heat Level (SHU):
              </label>
              <span className="text-lg text-red-600">
                {currentProduct.heat_level_SHU} ({heatLevelClassification})
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700">
                Origin Country:
              </label>
              <span className="text-lg text-gray-900">
                {currentProduct.origin_country}
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700">
                In Stock:
              </label>
              <span
                className={`text-lg ${
                  currentProduct.in_stock ? "text-green-600" : "text-red-600"
                }`}
              >
                {currentProduct.in_stock ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700">
                Main Ingredients:
              </label>
              <span className="text-lg text-gray-900">
                {currentProduct.main_ingredients.join(", ")}
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700">Rating:</label>
              <span className="text-lg text-yellow-500">
                {currentProduct.rating}/5{" "}
                <span className="text-sm text-gray-600">
                  ({currentProduct.num_ratings} ratings)
                </span>
              </span>

              <Box sx={{ "& > legend": { mt: 2 } }}>
                <label className="text-sm font-bold text-gray-700">
                  Leaving a Rating
                </label>
                <Typography component="legend"></Typography>

                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    //getStarRating(newValue, currentProduct.rating, currentProduct.num_ratings, currentProduct.id)
                  }}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
