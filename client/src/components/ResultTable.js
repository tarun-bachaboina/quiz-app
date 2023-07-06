import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

export default function ResultTable() {

  const [data, setData] = useState([])  

  useEffect(() => {

    // Socket emit to fetch results
    socket.on("getResult", fetchData());
    socket.emit("getResult");

    // Fetch results
    async function fetchData() {
      try {
        let res = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`);
        setData(res);
      } catch (error) {
        console.log(error)
      }
    }

    return () => {
      socket.close();
    };
  });

  return (
    <div>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        
        <tbody>
          { !data ?? <div>No Data Found </div>}
          {
            data.map((v, i) => (
              <tr className='table-body' key={i}>
                <td>{v?.username || ''}</td>
                <td>{v?.attempts || 0}</td>
                <td>{v?.points || 0}</td>
                <td>{v?.achieved || ""}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
