/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9tLPQf8OHQY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from "react-redux";
import { setShippingSameAsBilling, setShippingState, setInformation } from "@/redux/slices/checkoutslice";

export default function Component() {
  const { orderButton, shippingSameAsBilling, email, shippingFirstName, shippingState } = useSelector((state) => state.checkout);
  const { shoppingCart } = useSelector((state) => state.home);

  const salesTax = {
    "states": {
      "AL": {
        "rate": 0.04,
      },
      "AR": {
        "rate": 0.06,
      },
      "AZ": {
        "rate": 0.066,
      },
      "CA": {
        "rate": 0.0825,
      },
      "CO": {
        "rate": 0.029,
      },
      "CT": {
        "rate": 0.06,
      },
      "DC": {
        "rate": 0.06,
      },
      "FL": {
        "rate": 0.06,
      },
      "GA": {
        "rate": 0.04,
      },
      "HI": {
        "rate": 0.04,
      },
      "IA": {
        "rate": 0.06,
      },
      "ID": {
        "rate": 0.06,
      },
      "IL": {
        "rate": 0.0625,
      },
      "IN": {
        "rate": 0.07,
      },
      "KS": {
        "rate": 0.063,
      },
      "KY": {
        "rate": 0.06,
      },
      "LA": {
        "rate": 0.04,
      },
      "MA": {
        "rate": 0.0625,
      },
      "MD": {
        "rate": 0.06,
      },
      "ME": {
        "rate": 0.05,
      },
      "MI": {
        "rate": 0.06,
      },
      "MN": {
        "rate": 0.06875,
      },
      "MO": {
        "rate": 0.04225,
      },
      "MS": {
        "rate": 0.07,
      },
      "NC": {
        "rate": 0.0575,
      },
      "ND": {
        "rate": 0.05,
      },
      "NE": {
        "rate": 0.055,
      },
      "NJ": {
        "rate": 0.07,
      },
      "NM": {
        "rate": 0.05,
      },
      "NV": {
        "rate": 0.0685,
      },
      "NY": {
        "rate": 0.04,
      },
      "OH": {
        "rate": 0.055,
      },
      "OK": {
        "rate": 0.045,
      },
      "PA": {
        "rate": 0.06,
      },
      "RI": {
        "rate": 0.07,
      },
      "SC": {
        "rate": 0.06,
      },
      "SD": {
        "rate": 0.04,
      },
      "TN": {
        "rate": 0.07,
      },
      "TX": {
        "rate": 0.0625,
      },
      "UT": {
        "rate": 0.0595,
      },
      "VA": {
        "rate": 0.05,
      },
      "VT": {
        "rate": 0.06,
      },
      "WA": {
        "rate": 0.065,
      },
      "WI": {
        "rate": 0.05,
      },
      "WV": {
        "rate": 0.06,
      },
      "WY": {
        "rate": 0.04,
      }
    }
  }
  const dispatch = useDispatch();

  let totalPrice = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    totalPrice += shoppingCart[i].product.price * shoppingCart[i].quantity;
  }

  let taxRate = 0;
  console.log(orderButton, shippingState, shippingFirstName, email)
  if (salesTax.states[shippingState] != undefined) {
    taxRate = salesTax.states[shippingState].rate;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-[#8B0000] to-[#ff4500] py-4 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-white">Increderable</a>
            <div className="flex items-center gap-2">
                {/*<a href="/" className="text-xl ">Return to home</a>*/}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 py-8 px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
          <div>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-3 gap-4 mt-4 ">
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={email} onChange={(e)=>dispatch(setInformation({key:"email", value:e.target.value}))} placeholder="vip@credera.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="1234567890" />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" defaultValue={shippingFirstName} onChange={(e)=>dispatch(setInformation({key:"shippingFirstName", value:e.target.value}))}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address Line 2</Label>
                        <Input id="address" placeholder="Apt 321" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 ">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Anytown" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select id="state" onValueChange={(e) => dispatch(setShippingState(e))} value={shippingState}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AL">Alabama</SelectItem>
                                <SelectItem value="AK">Alaska</SelectItem>
                                <SelectItem value="AZ">Arizona</SelectItem>
                                <SelectItem value="AR">Arkansas</SelectItem>
                                <SelectItem value="CA">California</SelectItem>
                                <SelectItem value="CO">Colorado</SelectItem>
                                <SelectItem value="CT">Connecticut</SelectItem>
                                <SelectItem value="DE">Delaware</SelectItem>
                                <SelectItem value="FL">Florida</SelectItem>
                                <SelectItem value="GA">Georgia</SelectItem>
                                <SelectItem value="HI">Hawaii</SelectItem>
                                <SelectItem value="ID">Idaho</SelectItem>
                                <SelectItem value="IL">Illinois</SelectItem>
                                <SelectItem value="IN">Indiana</SelectItem>
                                <SelectItem value="IA">Iowa</SelectItem>
                                <SelectItem value="KS">Kansas</SelectItem>
                                <SelectItem value="KY">Kentucky</SelectItem>
                                <SelectItem value="LA">Louisiana</SelectItem>
                                <SelectItem value="ME">Maine</SelectItem>
                                <SelectItem value="MD">Maryland</SelectItem>
                                <SelectItem value="MA">Massachusetts</SelectItem>
                                <SelectItem value="MI">Michigan</SelectItem>
                                <SelectItem value="MN">Minnesota</SelectItem>
                                <SelectItem value="MS">Mississippi</SelectItem>
                                <SelectItem value="MO">Missouri</SelectItem>
                                <SelectItem value="MT">Montana</SelectItem>
                                <SelectItem value="NE">Nebraska</SelectItem>
                                <SelectItem value="NV">Nevada</SelectItem>
                                <SelectItem value="NH">New Hampshire</SelectItem>
                                <SelectItem value="NJ">New Jersey</SelectItem>
                                <SelectItem value="NM">New Mexico</SelectItem>
                                <SelectItem value="NY">New York</SelectItem>
                                <SelectItem value="NC">North Carolina</SelectItem>
                                <SelectItem value="ND">North Dakota</SelectItem>
                                <SelectItem value="OH">Ohio</SelectItem>
                                <SelectItem value="OK">Oklahoma</SelectItem>
                                <SelectItem value="OR">Oregon</SelectItem>
                                <SelectItem value="PA">Pennsylvania</SelectItem>
                                <SelectItem value="RI">Rhode Island</SelectItem>
                                <SelectItem value="SC">South Carolina</SelectItem>
                                <SelectItem value="SD">South Dakota</SelectItem>
                                <SelectItem value="TN">Tennessee</SelectItem>
                                <SelectItem value="TX">Texas</SelectItem>
                                <SelectItem value="UT">Utah</SelectItem>
                                <SelectItem value="VT">Vermont</SelectItem>
                                <SelectItem value="VA">Virginia</SelectItem>
                                <SelectItem value="WA">Washington</SelectItem>
                                <SelectItem value="WV">West Virginia</SelectItem>
                                <SelectItem value="WI">Wisconsin</SelectItem>
                                <SelectItem value="WY">Wyoming</SelectItem>
                                <SelectItem value="DC">District of Columbia</SelectItem>
                                <SelectItem value="AS">American Samoa</SelectItem>
                                <SelectItem value="GU">Guam</SelectItem>
                                <SelectItem value="MP">Northern Mariana Islands</SelectItem>
                                <SelectItem value="PR">Puerto Rico</SelectItem>
                                <SelectItem value="VI">U.S. Virgin Islands</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input id="zip" placeholder="12345" />
                    </div>
                </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Billing Information</h2>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="shippingSameAsBilling" checked={shippingSameAsBilling} onCheckedChange={(e) => dispatch(setShippingSameAsBilling())}/>
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Shipping and billing information are the same
                </label>
              </div>
            <div className="grid grid-cols-2 gap-4">
                {!shippingSameAsBilling && <>
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address Line 2</Label>
                        <Input id="address" placeholder="Apt 321" />
                    </div>
                </>}
            </div>
            {!shippingSameAsBilling && <div className="grid grid-cols-3 gap-4 mt-4 ">
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select id="state">
                        <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="DE">Delaware</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="ID">Idaho</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="IN">Indiana</SelectItem>
                        <SelectItem value="IA">Iowa</SelectItem>
                        <SelectItem value="KS">Kansas</SelectItem>
                        <SelectItem value="KY">Kentucky</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="ME">Maine</SelectItem>
                        <SelectItem value="MD">Maryland</SelectItem>
                        <SelectItem value="MA">Massachusetts</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                        <SelectItem value="MN">Minnesota</SelectItem>
                        <SelectItem value="MS">Mississippi</SelectItem>
                        <SelectItem value="MO">Missouri</SelectItem>
                        <SelectItem value="MT">Montana</SelectItem>
                        <SelectItem value="NE">Nebraska</SelectItem>
                        <SelectItem value="NV">Nevada</SelectItem>
                        <SelectItem value="NH">New Hampshire</SelectItem>
                        <SelectItem value="NJ">New Jersey</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="ND">North Dakota</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="RI">Rhode Island</SelectItem>
                        <SelectItem value="SC">South Carolina</SelectItem>
                        <SelectItem value="SD">South Dakota</SelectItem>
                        <SelectItem value="TN">Tennessee</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="VT">Vermont</SelectItem>
                        <SelectItem value="VA">Virginia</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="WV">West Virginia</SelectItem>
                        <SelectItem value="WI">Wisconsin</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                        <SelectItem value="DC">District of Columbia</SelectItem>
                        <SelectItem value="AS">American Samoa</SelectItem>
                        <SelectItem value="GU">Guam</SelectItem>
                        <SelectItem value="MP">Northern Mariana Islands</SelectItem>
                        <SelectItem value="PR">Puerto Rico</SelectItem>
                        <SelectItem value="VI">U.S. Virgin Islands</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" placeholder="12345" />
                </div>
                <div className="space-y-2 my-2 col-span-3 w-full bg-gray-100" style={{height:"2px"}}></div>
            </div>}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration Date</Label>
                  <div className="flex gap-2">
                    <Select id="expirationMonth">
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">01</SelectItem>
                        <SelectItem value="02">02</SelectItem>
                        <SelectItem value="03">03</SelectItem>
                        <SelectItem value="04">04</SelectItem>
                        <SelectItem value="05">05</SelectItem>
                        <SelectItem value="06">06</SelectItem>
                        <SelectItem value="07">07</SelectItem>
                        <SelectItem value="08">08</SelectItem>
                        <SelectItem value="09">09</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select id="expirationYear">
                      <SelectTrigger>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {shoppingCart.map((item) => (
                  <div className="flex items-center gap-4">
                  <img src={item.product.image_url} alt="Product Image" width={80} height={80} className="rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <div className="font-medium">${item.product.price}</div>
                </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-2">
                <div>Subtotal</div>
                <div className="text-right font-medium">${totalPrice.toFixed(2)}</div>
                <div>Shipping</div>
                <div className="text-right font-medium">{totalPrice >= 50 ? "Free" : "$5.00"}</div>
                <div>Tax</div>
                <div className="text-right font-medium">${((totalPrice + (totalPrice >= 50 ? 0 : 5)) * taxRate).toFixed(2)}</div>
                <div className="font-bold">Total</div>
                <div className="text-right font-bold">${((totalPrice + (totalPrice >= 50 ? 0 : 5)) * (1 + taxRate)).toFixed(2)}</div>
              </div>
            </div>
            <Button disabled={orderButton != "Place Order"} size="lg" className="w-full" onClick={(e) => processCheckout(dispatch, setInformation, {email, shippingFirstName, shoppingCart, totalPrice, shipping: totalPrice >= 50 ? "Free" : "$5.00", tax:((totalPrice + (totalPrice >= 50 ? 0 : 5)) * taxRate)})}>
              {orderButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

async function processCheckout(dispatch, setInformation, body) {
  dispatch(setInformation({key:"orderButton",value:"Processing..."}))
  fetch("/api/email", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(body)
  })
  await new Promise(r => setTimeout(r, 2105));
  dispatch(setInformation({key:"orderButton",value:"Thank You For Your Order"}))
}