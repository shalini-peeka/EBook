import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button, TablePagination } from "@mui/material";
import { useLocation } from 'react-router-dom';
import {Dialog,DialogActions,DialogContent,DialogTitle,} from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({[`&.${tableCellClasses.head}`]: {
backgroundColor: theme.palette.common.black,color: theme.palette.common.white,
},[`&.${tableCellClasses.body}`]: {fontSize: 16,},
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({"&:nth-of-type(odd)": {backgroundColor: theme.palette.action.hover,},
"&:last-child td, &:last-child th": {border: 0,},
}));
function ViewIncompleteBooks({authorId}) {
  const [apiData,setApiData] = useState([])
  const location = useLocation();
  const [dataCount, setdataCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState({
bookId: '',
authorId: '',
    title: '',
  });
  authorId = new URLSearchParams(location.search).get('authorId');
  function getData(e){
  axios.get(`http://localhost:9001/book/getIncompleteBooks/${authorId}`)
  .then((response) =>{
    setApiData(response.data);
  })
 }
useEffect(() => {
  getData();
}, [])
const handleChangePage = (event, newPage) => {setPage(newPage);
};
 const handleChangeRowsPerPage = (event) => { setRowsPerPage(+event.target.value);
 setPage(0);
 };
  const handleTextFieldChange = (event) => {
setSearchTerm({
  ...searchTerm,
    [event.target.name]: event.target.value,
    });
    };
    const filteredData = apiData.filter((item) => {
      return (
(searchTerm.bookId === '' || item.requestId.toString() === searchTerm.requestId.toString()) &&
        (searchTerm.authorId === '' ||item.autorName.toLowerCase().includes(searchTerm.autorName.toLowerCase())) &&
      (searchTerm.title === '' || item.format.toLowerCase().includes(searchTerm.format.toLowerCase()))
        );
        });
  return (
    <div className='row' style={{marginTop:'6%'}}>
       <div className='col-md-12'>
        <TableContainer>
         <br></br>
              <Table sx={{ minWidth: 600 }}aria-label="customized table"style={{ width: "800px", margin: "auto" }}>
        <TableHead>
           <TableRow>
            <StyledTableCell>BookID</StyledTableCell>
              <StyledTableCell>AuthorName</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            {/*}  <th>Author</th>*/}
            </TableRow>
          </TableHead>
          <TableBody>
        {/*}  <tr>
            <td>1</td>
              <td>java</td>
             
              <td>alex</td>
             
              <td>1-3-2022</td>
              <td>2-4-2022</td>
              <td><Link to='/resume'><button className='btn btn-primary col-md-10'>Resume</button></Link></td>
            </tr>
            <tr>
            <td>2</td>
              <td>React</td>
            <td>james</td>
            <td>1-3-2022</td>
              <td>2-4-2022</td>
              <td><Link to='/resume'><button className='btn btn-primary col-md-10'>Resume</button></Link></td>
            </tr>*/}
            {
          apiData?apiData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
          <>
              <TableRow>
                <StyledTableCell>{item.bookId}</StyledTableCell>
              <StyledTableCell>{item.authorId}</StyledTableCell>
             
              <StyledTableCell>{item.title}</StyledTableCell>
            <StyledTableCell>{item.status}</StyledTableCell>
            {/*}  <TableCell>
                    <Link to="/viewbooks"><button className="btn btn-primary col-md-10">Resume</button></Link>
          </TableCell>*/}
              </TableRow>
              </>
            )
          ):null
        }
         </TableBody>
        </Table>
         </TableContainer>
        <TablePagination
rowsPerPageOptions={[5, 10, 25, { label: 'All', value: apiData.length }]}component="div"
count={apiData.length}
 rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}/></div>
    </div>
  )
}
export default ViewIncompleteBooks;
