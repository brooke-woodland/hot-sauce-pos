const nodemailer = require('nodemailer');

//create a transporter using Google's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'increderable@gmail.com', //your Gmail address
    pass: "zxbb dmyi kkbo plbn", //your application-specific password
  },
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export default function handler(req, res) {
    console.log(req.body);

    // Define email options
    let orderNumber = getRandomNumber(3000000, 9999999);
    let emailText =`Thank you for your order, ${req.body.shippingFirstName}.\n`;
    emailText += `Order Number: ${orderNumber}\n\n`;

    for (let i = 0; i < req.body.shoppingCart.length; i++) {
        const item = req.body.shoppingCart[i];
        emailText += ` - ${item.quantity}x ${item.product.name} (${item.product.price})\n`;
    }
    emailText += "\nSubtotal: $" + req.body.totalPrice.toFixed(2);
    emailText += "\nShipping: " + req.body.shipping;
    emailText += "\nTax: $" + req.body.tax.toFixed(2);
    emailText += "\nTotal: $" + (req.body.totalPrice + req.body.tax + (req.body.totalPrice >= 50 ? 0 : 5)).toFixed(2);

    const mailOptions = {
        from: 'increderable@gmail.com', //sender address
        to: req.body.email, //list of recipients
        subject: `Thank You For Your Order / #${orderNumber}`, //subject line
        text: emailText, //plain text body
        //you can also use html: '<p>This is HTML version of the email</p>' for HTML content
    };
    
    //send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(400).json({ message: "Error sending email" });
        } else {
            res.status(200).json({ message: "Email sent", orderNumber: orderNumber});
        }
    });
}