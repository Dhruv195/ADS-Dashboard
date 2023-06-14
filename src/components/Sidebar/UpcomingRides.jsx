import React, { useState, useEffect } from 'react'
import './table.css'

// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
// import { data } from './Users'
import Navbar from '../Navigation/Navbar'

const UpcomingRides = () => {
  if (localStorage.getItem('result') === '') {
    window.location.href = '/'
  }

  const [expandedRows, setExpandedRows] = useState([])
  const [expandState, setExpandState] = useState({})

  const handleEpandRow = (event, userId) => {
    const currentExpandedRows = expandedRows
    const isRowExpanded = currentExpandedRows.includes(userId)

    let obj = {}
    isRowExpanded ? (obj[userId] = false) : (obj[userId] = true)
    setExpandState(obj)

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== userId)
      : currentExpandedRows.concat(userId)

    setExpandedRows(newExpandedRows)
  }

  function refreshPage() {
    window.location.reload()
  }

  const [data, setData] = useState([])
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('result'))
    console.log(result)

    let DriverMasterID = result.response.driverMasterID

    console.log(DriverMasterID)
    fetch('https://driverportalapi.adsdev.uk/1/UpcomingRaids', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({ DriverMasterID }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((table) => {
      table.json().then((resp) => {
        console.log('data', resp.response)
        setData(resp.response)
      })
    })
  }, [])

  return (
    <>
      <div className="wholebody">
        <Navbar />
        <br />
        <Button onClick={refreshPage} style={{ marginLeft: 28 }}>
          <img src="refresh.png " alt="refresh" />
        </Button>
        {/* <Row> */}

        <Col lg={120}>
          <div style={{ margin: 20 }} className="table-responsive">
            <Table>
              <thead id="example">
                <tr>
                  <th>Job id</th>
                  <th>Pickup Date&Time</th>
                  <th>Pickup Postcode</th>
                  <th>Dropoff Postcode</th>
                  <th>Pickup Address</th>
                  <th>Dropoff Address</th>
                  <th>Service</th>
                  <th>Confirm</th>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody id="exam">
                {data.map((user, i) => (
                  <>
                    <tr key={i}>
                      <td data-th="Job#">{user.jobNo}</td>
                      <td data-th="Pickup Date&Time">{user.pickUpDateTime}</td>
                      <td data-th="Pickup Postcode">{user.pickUpPostCode}</td>
                      <td data-th="Dropoff Postcode">{user.dropoffPostCode}</td>
                      <td data-th="Pickup Address">{user.pickupAddressLine}</td>
                      <td data-th="Dropoff Address">
                        {user.dropoffAddressLine}
                      </td>
                      <td data-th="Service">{user.serviceType}</td>
                      <td>
                        <Button
                          id="btn"
                          size="lg,lg"
                          onClick={(event) => handleEpandRow(event, i)}
                        >
                          {expandState[i] ? 'Hide' : 'Full Address'}
                        </Button>
                      </td>
                      <>
                        {expandedRows.includes(i) ? (
                          <tr>
                            <td data-th="Pickup Address">
                              {user.pickupAddressLine}
                            </td>
                            <td data-th="Dropoff Address">
                              {user.dropoffAddressLine}
                            </td>
                          </tr>
                        ) : null}
                      </>
                      <td data-th="">
                        <Button
                          onClick={() => {
                            let a = user.pickupAddressLine
                            let b = user.dropoffAddressLine
                            window.open(
                              'https://www.google.co.in/maps/dir/' +
                                a +
                                '/' +
                                b,
                            )
                          }}
                        >
                          Direction
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        {/* </Row> */}
      </div>
    </>
  )
}

export default UpcomingRides
