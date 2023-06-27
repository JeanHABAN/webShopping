const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({origin : true, credentials: true}));

const SECRET_KEY ='sk_test_51NNO8iFp9Rlw3awYFYX8iA2LXkdpFBQOOxRTvl0GzuAeiFRcH3OEeeokk8TkrCr75cprk0sg7ojUOvf7Wl0DzLIz00E7T4ac2w'

const stripe = require("stripe")(SECRET_KEY);

app.post("/checkout", async(req, res, next) =>{
    console.log(stripe.checkout.sessions)
try {
    const session = await stripe.checkout.sessions.create({
        line_items : req.body.items.map((item) =>( {
           price_data:{
            currency: 'usd',
            product_data: {
                name: item.name,
                images:[item.product]
            },
            unit_amount: item.price * 100,
           },
           quantity: item.quantity,
        })),
        mode: "payment",
        success_url: "http://localhost:4242/success.html",
        cancel_url: "http://localhost:4242/cancel.html",
    });
    res.status(200).json(session)
} catch (error) {
    next(error);
}
})

app.listen(4242, ()=>console.log(`server is running on 4242`))
