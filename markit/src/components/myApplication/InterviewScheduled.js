// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Interview Scheduled
 
import {React,useState} from 'react'
import Table from 'react-bootstrap/Table'
import Box from '@material-ui/core/Box'

const InterviewScheduled = () => {
    const [interviewDetails,setInterviewDetails]= useState([{applicationNo:1025,jobDetails:"Advanced Software Development - Marker", dateTime:'12-June-2021 09:00am',location:"Microsoft Teams"},
    {applicationNo:1026,jobDetails:"Advanced Database Systems - Teaching Assistant", dateTime:'15-June-2021 10:00am',location:"Goldberg Building"}])
    return (
        <section>
            {interviewDetails.length>0 &&
            <Table striped bordered hover variant="dark" responsive="sm">
                <thead>
                    <tr>
                    <th>Application Number</th>
                    <th>Job Details</th>
                    <th>Date and Time</th>
                    <th>Location </th>
                    </tr>
                </thead>
                <tbody>
                    {interviewDetails.map((interview,index)=>
                        <tr key={index}>
                        <td>{interview.applicationNo}</td>
                        <td>{interview.jobDetails}</td>
                        <td>{interview.dateTime}</td>
                        <td>{interview.location}</td>
                        </tr>
                    )}
                   
                </tbody>
            </Table>
            }

            {interviewDetails.length===0 &&
                    <Box fontWeight="fontWeightMedium" m={1}>
                     No Interviews Scheduled
                    </Box>
                }
            
        </section>
    )
}

export default InterviewScheduled
