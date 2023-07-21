import React from 'react'
import './Dashboard.scss'
import NavBar from '../../Component/NavBar';
import TraderList from '../../Component/TraderList';
import TraderListData from '../../Component/TraderListData.json';
import { Input, DatePicker, Modal, Button, Form } from 'antd';

import { createTraderUrl, deleteTraderUrl, tradersUrl } from '../../util/constants';
import "antd/dist/antd.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard(props) {
    const [traders,setTraders] = useState (null);
    const [state, setState] = useState({
        isModalVisible: false,
        traders: []
    })

    const getTraders = async () => {
        const response = await axios.get(tradersUrl);
        if (response) {
            setState({
                ...state,
                traders: [...response.data] || []
            })
        }
    }
    
    useEffect (()=> {
        const fetchData = async () => {
          try {
            const response = await axios.get (tradersUrl)     
            if (response.status==200) setTraders(response.data);
          }
          catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, [])

    const showModal = () => {
        setState({
            ...state,
            isModalVisible: true
        })
    }

    const handleOk = async () => {
        const paramUrl = `/firstname/${state.firstName}/lastname/${state.lastName}/dob/${state.dob}/country/${state.country}/email/${state.email}`;
        const response = await axios.post(createTraderUrl + paramUrl, {});
        
        await getTraders();
        setState({
            ...state,
            isModalVisible: false,
            firstName: null,
            lastName: null,
            dob: null,
            country: null,
            email: null
        });
    };

    const onInputChange = (field, value) => {
        setState({
            ...state,
            [field]: value
        })
    }

    const handleCancel = () => setState(false);

    useEffect(() => {
        getTraders()
    })

    const onTraderDelete = async (id) => {
        console.log("Trader " + id + " has been deleted.");
        // await getTraders();
    }

  return (
    <div className="dashboard">
        <NavBar />
        <div className="dashboard-content">
        <div className="title"> Dashboard<div className="add-trader-button">
                    <Button onClick={showModal}>Add New Trader</Button>
                        <Modal title="Add New Trader"  okText="Submit" visible={state.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form layout="vertical">
                                <div className="add-trader-form">
                                    <div className="add-trader-field">
                                        <Form.Item label="First Name">
                                            <Input allowClear={false} placeholder="John" onChange={(event) => onInputChange("firstName", event.target.value)} />
                                        </Form.Item>
                                    </div>
                                    <div className="add-trader-field">
                                        <Form.Item label="Last Name">
                                            <Input allowClear={false} placeholder="Doe" onChange={(event) => onInputChange("lastName", event.target.value)} />
                                        </Form.Item>
                                    </div>
                                    <div className="add-trader-field">
                                        <Form.Item label="Email">
                                            <Input allowClear={false} placeholder="firstName@test.com" onChange={(event) => onInputChange("email", event.target.value)} />
                                        </Form.Item>
                                    </div>
                                    <div className="add-trader-field">
                                        <Form.Item label="Country">
                                            <Input allowClear={false} placeholder="Canada" onChange={(event) => onInputChange("country", event.target.value)} />
                                        </Form.Item>
                                    </div>
                                    <div className="add-trader-field">
                                        <Form.Item label="Date of Birth">
                                            <DatePicker style={{width:"100%"}} placeholder="" onChange={(date, dateString) => onInputChange("dob", date.format("yyyy-MM-DD"))} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </Modal>
                    </div>
                </div>
            <TraderList onTraderDeleteClick={onTraderDelete} traders={ state.traders }/>
        </div>
    </div>
  )
}

export default Dashboard