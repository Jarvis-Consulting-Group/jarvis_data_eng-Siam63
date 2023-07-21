
import React from 'react'
import './QuotePage.scss'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { dailyListQuotesUrl } from '../../util/constants'
import { Table } from 'antd';
import NavBar from '../../Component/NavBar';

function QuotePage(props) {

//   const [state, setState] = useState({
//     quotes: []
//   })

  const columns = [
    {
        title: 'Ticker',
        dataIndex: 'ticker',
        key: 'ticker',
    },
    {
        title: 'Last Price',
        dataIndex: 'lastPrice',
        key: 'lastPrice',
    },
    {
        title: 'Bid Price',
        dataIndex: 'bidPrice',
        key: 'bidPrice',
    },
    {
        title: 'Bid Size',
        dataIndex: 'bidSize',
        key: 'bidSize',
    },
    {
        title: 'Ask Price',
        dataIndex: 'askPrice',
        key: 'askPrice',
    },
    {
        title: 'Ask Size',
        dataIndex: 'askSize',
        key: 'askSize'
    }
];

// Dummy values to see output
const [dataSource, SetDataSource] = useState([
    {id:1,
    ticker:"TSLA",
    lastPrice: 1,
    bidPrice: 2, 
    bidSize: 3,
    askPrice: 4,
    askSize: 5
  }]);

  useEffect(() => {
      async function fetchData () {
        const response = await axios.get (dailyListQuotesUrl)
        if (response.status==200) SetDataSource(response.data);
      }
      fetchData()
  }, []);
  
  return (
    <div className='QoutePage'>
        <div className="QouteContent">
            
        <form action="">
            <div id="wizard">
                <NavBar />

                <section>
                    <Table columns={columns} dataSource={dataSource} />
                </section>

                {/* <section>
                    <div class="input-quote"> <input type="text" name="ticker" class="form-control" placeholder="Ticker"   /> </div>
                    <div class="input-quote"> <input type="text" name="lastPrice" class="form-control" placeholder="Last Price" /> </div>
                    <div class="input-quote"> <input type="text" name="bidPrice" class="form-control" placeholder="Bid Price" /> </div>
                    <div class="input-quote"> <input type="text" name="bidSize" class="form-control" placeholder="Bid Size" /> </div>
                    <div class="input-quote"> <input type="text" name="askPrice" class="form-control" placeholder="Ask Price" /> </div>
                    <div class="input-quote"> <input type="text" name="askSize" class="form-control" placeholder="Ask Size" /> </div>
                    <div> <button type="submit" onClick="handleSubmit()"></button>Add Quote</div>
                </section> */}
            </div>
        </form>
        </div>
    </div>
  )
};

export default QuotePage
