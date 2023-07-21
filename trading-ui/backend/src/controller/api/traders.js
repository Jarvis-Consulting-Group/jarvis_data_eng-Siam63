let traders =    
  [
     {
     "key": "1",
     "id": 1,
     "firstName": "Mike",
     "lastName": "Spencer",
     "dob": "1990-01-01",
     "country": "Canada",
     "email": "mike@test.com",
     "amount": 0,
     },
     {
     "key": "2",
     "id": 2,
     "firstName": "Hellen",
     "lastName": "Miller",
     "dob": "1990-01-01",
     "country": "Austria",
     "email": "hellen@test.com",
     "amount": 0
     },
     {
     "key": "3",
     "id": 3,
     "firstName": "Jack",
     "lastName": "Reed",
     "dob": "1990-01-01",
     "country": "United Kingdom",
     "email": "jack@test.com",
     "amount": 0
     }
   ]

async function getAllTraders (req,res) {
  try {   
    res.status(200).json(traders);
    console.log(traders)
  }catch (error) {
    res.status(500).json(error);
  }
}

async function deleteTraders(req, res) {
  try {
    traders = traders.filter((trader) => trader.id !== parseInt(req.params.id));
    res.status(200).json(traders);
  }catch (error) {
    res.status(500).json(error)
  }
}

async function addTrader(req, res) {
  try {
    traders = [...traders, req.body]
    res.status(200).json(traders);
  }catch (error) {
    res.status(500).json(error)
  }
}


function updateTrader (req,res) {}

module.exports = {
  getAllTraders,
  deleteTraders,
  addTrader,
  updateTrader
};
