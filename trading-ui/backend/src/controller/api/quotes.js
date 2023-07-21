let quotes = [
    {id:1,
    ticker:"FB",
    lastPrice: 10,
    bidPrice: 20, 
    bidSize: 40,
    askPrice: 50,
    askSize: 55
  },
  {id:2,
    ticker:"AAPL",
    lastPrice: 100,
    bidPrice: 120, 
    bidSize: 140,
    askPrice: 150,
    askSize: 155
  },]
  
  async function getAllQuote(req,res) {
    try {
      res.status(200).json(quotes)
    }catch (error) {
      res.status(500).json(error)
    }
  }
  
  async function getQuote(req,res) {
    try {
      const qoute = quotes.filter ((quote) => quote.id == req.params.id)
      res.status(200).json(qoute)
    }catch (error) {
      res.status(500).json(error)
    }
  }
  
  async function deleteQuote (req,res) {
    try {
      quotes = quotes.filter((qoute) => qoute.id !== parseInt(req.params.id))
      res.status(200).json(qoute)
    }catch (error) {
      res.status(500).json(error)
    }
  }
  
  async function addQuote(req,res) {
    try {
      quotes = [...quotes , req.body ]
      res.status(200).json(qoute)
    }catch (error) {
      res.status(500).json(error)
    }
  }
  
  module.exports = {
    getQuote,
    deleteQuote,
    addQuote,
    getAllQuote
  }