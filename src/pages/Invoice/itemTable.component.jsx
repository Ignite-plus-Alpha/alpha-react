import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = (theme) => ({
  root: {
    width: "75%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    marginLeft: theme.spacing.unit * 20,
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(ItemId, Title, Quantity, Price) {
  id += 1;
  return { id, ItemId, Title, Quantity, Price };
}

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="right">Title</CustomTableCell>
            <CustomTableCell align="right">Type</CustomTableCell>
            <CustomTableCell align="right">Size</CustomTableCell>
            <CustomTableCell align="right">Quantity</CustomTableCell>
            <CustomTableCell align="right">Price</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((row) => (
            <TableRow className={classes.row} key={row.itemId}>
              <CustomTableCell align="right">{row.itemTitle}</CustomTableCell>
              <CustomTableCell align="right">
                {row.itemGroup}/{row.itemCategory}
              </CustomTableCell>
              <CustomTableCell align="right">{row.itemSize}</CustomTableCell>
              <CustomTableCell align="right">
                {row.itemQuantity}
              </CustomTableCell>
              <CustomTableCell align="right">{row.itemPrice}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(CustomizedTable);
