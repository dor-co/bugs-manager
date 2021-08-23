import './Style.css';
import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import { openModal } from '../../redux/Actions';

function Bug() {

    const dataRed = useSelector((state) => state.DataReducer);
    const dispatch = useDispatch();
    console.log("-----", dataRed, "-----")

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const cl = (row) => {
        dispatch(openModal('bugDetailsTitle', 'bugDetailsBody', row));
    }
    return (

        <TableContainer component={Paper} style={{ position: 'absolute', height: '100%', borderRadius: 0 }}>
            <Table stickyHeader aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Bug</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRed.data.map((row) => (
                        <StyledTableRow hover key={dataRed.data.title} onClick={() => cl(row)} style={{ cursor: 'pointer' }}>
                            <StyledTableCell component="th" scope="row">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Bug;