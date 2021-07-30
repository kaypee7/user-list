import { Button, Card, CardContent, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';


let EXTRENAL_URL = "https://reqres.in/api/users"


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


// const ShowCard = ({ row }) => {
//     return (<Card style={{backgroundColor:'skyblue'}}>
//         <CardContent>
//             <Typography >
//                 {row.id}. {row.first_name} {row.last_name} {row.email} {row.avatar}
//             </Typography>
//         </CardContent>
//     </Card>)
// }

const Users = () => {

    const classes = useStyles();

    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(2)
    const [resultsPerPage, setResultsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const getData = () => {
        console.log("API CALL START", currentPage)
        setLoading(true)
        fetch(`${EXTRENAL_URL}?page=${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                const resData = await response.json()
                if (response.ok) {
                    setUsers(resData.data)
                    setTotalPages(resData.total_pages)
                    setResultsPerPage(resData.per_page)
                    setCurrentPage(resData.page)
                    setLoading(false)
                    setError("")

                } else {
                    setLoading(false)
                    setError("Error from server")
                }
            })
            .catch(error => {
                setLoading(false)
                setError("Something went wrong, Please refresh page!")
            })
    }

    const PageButton = ({ pageNumber }) => {
        return (<Button onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
        </Button>)
    }

    useEffect(() => {
        getData()
    }, [currentPage])

    return (
        <div style={{backgroundColor:'skyblue'}}>
            <Typography style={{marginLeft:'40%',}} variant="h3" component="h4" gutterBottom>
                Users List
            </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Avatar</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right"><Avatar style={{marginLeft: "75%"}} alt={row.first_name} src={row.avatar} /></TableCell>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
            <Typography style={{backgroundColor:'skyblue'}}>
                 {`Page: ${currentPage} / ${totalPages}`}
             </Typography>
             {[...Array(totalPages)].map((e, i) => <PageButton pageNumber={i + 1} />)}
        </div>
        </div>
      );

    // return (
    //     <div>
    //         {users.map((d) => <ShowCard row={d} />)}
    //         <Typography style={{backgroundColor:'skyblue'}}>
    //             {`Page: ${currentPage} / ${totalPages}`}
    //         </Typography>
    //         {[...Array(totalPages)].map((e, i) => <PageButton pageNumber={i + 1} />)}
    //     </div>
    // )
}

export default Users
