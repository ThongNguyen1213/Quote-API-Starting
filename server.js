const { application } = require('express');
const express = require('express');
const { isRequired } = require('nodemon/lib/utils');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Get random quotes
app.get('/api/quotes/random', (req, res) => {
   res.send({
       quote: getRandomElement(quotes)
    })
})

//Get all quotes by an author
app.get('/api/quotes', (req, res) => {
    if(req.query.person !== undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person)
        res.send({
            quotes: quotesByPerson
        })
    } else {
        res.send({
            quotes: quotes
         })
    }
})

//Create a new quote
app.post('/api/quotes', (req, res) => {
    const newQuote = {
      id: req.query.id,
      quote: req.query.quote,
      person: req.query.person
    };
    if (newQuote.quote && newQuote.person) {
      quotes.push(newQuote);
      res.send({ quote: newQuote });
    } else {
      res.status(400).send();
    }
  });

//Update with new quote 

app.put('/api/quotes', (req, res) => {
    const newUpdateQuote = {
        id: req.query.id,
        quote: req.query.quote,
        person: req.query.person,
    }
    if (newUpdateQuote.quote && newUpdateQuote.person) {
        const targetQuoteIndex = quotes.findIndex(quote => quote.id === req.query.id);
        quotes[targetQuoteIndex] = newUpdateQuote
        res.send({quote: newUpdateQuote});
    } else {
        res.status(404).send();
    }
})

app.delete('/api/quotes', (req, res) => {
    const targetDeleteQuoteIndex = quotes.findIndex(quote => quote.id === req.query.id);
    if(targetDeleteQuoteIndex !== -1) {
        quotes.splice(targetDeleteQuoteIndex, 1);
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})