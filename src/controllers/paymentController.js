const {PaymentModel} = require("../models");
const {BookModel} = require("../models");
const loginService = require("../services/login")

const PaymentController = { //////////////////////////////////// NOTTT check
    findOne: async (req,res) => {
        const found = await PaymentModel.findOne({_id: req.params.number})
        res.json(found);
    },
    findMultiple: async (req,res) => { /////////////////////////////////////// NOTTT check
        const found = await PaymentModel.find({_id: req.params.number})
        res.json(found);
    },
    list: async (req, res) =>{ //checked
        const allPayments = await PaymentModel.find()
        res.json(allPayments)
    },
    listCartItems: async (req, res) =>{ //checked
        if (typeof req.session.username == 'undefined')
                res.json({status:"Failed",error:"not logged in"})
        else
        {
            const username = req.session.username
            const payment = await PaymentModel.findOne({username: username})
            let amount = 0
            items = (await payment.populate('cart')).cart

            // Calculate sum of items
            items.forEach(element => {
                amount = amount + element.price
            });
            // Add sum of items to output
            items = items.concat(amount)
            payment.amount = amount
            await payment.save()
            res.json(items)
        }
    },
    completeTransaction: async (req, res) =>{ // checked
        if (typeof req.session.username == 'undefined')
                res.json({status:"Failed",error:"not logged in"})
        else
        {
            const username = req.session.username
            const credit = req.body.creditNumber
            const payment = await PaymentModel.findOne({username: username})
            const currentTransactions = payment.completedTransactions
            const date = new Date()
            const items = (await payment.populate('cart')).cart

            // Add the current cart items to completed transaction items
            payment.completedTransactions = await currentTransactions.concat(items)
            payment.creditNumber = credit
            payment.date = date

            // We reset the user's cart before finalizing
            payment.cart = []
            await payment.save().then(()=>{
                res.json({status:"Success"})
            })
        }
    },
    create: async(req, res) => { //////////////////////////////////// NOTTT check
        const _id = req.body.number
        const check = await PaymentModel.exists({_id: _id})
        if (check)
        {
            res.json({status:"Failed",error:"object already exists"})
        }
        else{
            const creditNumber = req.body.creditNumber
            const amount= req.body.amount
            const customer = req.body.customer
            const books = req.body.books
            try{
                const payment = new PaymentModel({
                    _id,
                    creditNumber,
                    amount,
                    customer,
                    books,
                })

                payment.save().then((data)=>{
                    res.send(data)
                })
            }
            catch(e){
                res.json(_id)
                }
            }
        },
        delete: async(req, res) => { //////////////////////////////////// NOTTT check
            if (!(await loginService.isAdmin(req.session.username)))
            res.json({status:"Failed",error:"Admin only"})
            else
            {
                const nameDelete = req.body.number
                const output = await PaymentModel.deleteOne({_id: nameDelete})
                if (output.deletedCount == 1 ){
                    res.json({status:"Success"})
                }
                else res.json({status:"Failed",error:"could not find object"})
            }
        },
        update: async(req, res) => {  // NOTTT
            if (!(await loginService.isAdmin(req.session.username)))
                res.send({status:"Failed",error:"Admin Only"})
            else
            {
                const _id = req.body.number
                const newCreditNumber = req.body.newCreditNumber
                const newDate = req.body.newDate
                const newAmount = req.body.newAmount
                const newUsername = req.body.newUsername

                const output = await PaymentModel.findOneAndUpdate({_id}, {
                    creditNumber: newCreditNumber,
                    date: newDate,
                    amount: newAmount,
                    username: newUsername,
                })

                if (output !== null){
                    res.json({status:"Success"})
                }
                else res.json({status:"Failed",error:"could not find object"})
            }
        },
        add: async(req, res) => { // checked
            if (typeof req.session.username == 'undefined')
                res.json({status:"Failed",error:"not logged in"})
            else
            {
            const _id = req.body.book
            const username = req.session.username
            const check = await BookModel.exists({_id})
            if (!check)
            {
                res.json({status:"Failed",error:"book doesn't exist"})
            }
            else
             {
                const output = await PaymentModel.updateOne({username: username}, {
                    $push: {cart: _id} 
                })

                if (output !== null){
                    res.json({status:"Success"})
                }
                else  res.json({status:"Failed",error:"couldn't find cart"})
             }
            }
        },
}

module.exports = PaymentController