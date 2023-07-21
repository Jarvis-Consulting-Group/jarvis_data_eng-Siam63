import React from 'react';
import { Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'antd/dist/antd.css';
import './TraderList.scss';
import { useState, useEffect } from 'react';
import TraderListData from './TraderListData.json';
import {
    faTrashAlt as deleteIcon
} from '@fortawesome/free-solid-svg-icons';

const onTraderDelete = (id) => {
    console.log("Trader " + id + " has been deleted.");
}
<TraderList onTraderDeleteClick={onTraderDelete} />

function TraderList(props) {
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <div className="trader-delete-icon">
                    <FontAwesomeIcon icon={ deleteIcon } onClick={() => props.onTraderDelete(record.id) } />
                </div>
            ),
        },
    ];

    const [tableColumns, setTableColumns] = useState(columns)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        const dataSource = TraderListData
        setDataSource(dataSource)
    })

  return (
   <Table
    dataSource={ props.traders }
    columns={tableColumns}
    pagination={false}
   />
  );
}

export default TraderList