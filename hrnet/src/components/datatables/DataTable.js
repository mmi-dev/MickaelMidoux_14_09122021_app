import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import "./DataTable.css";
import useTheme from "@mui/material/styles/useTheme";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  gridPaginationRowRangeSelector,
  gridFilteredSortedRowIdsSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

/**
 * JSX Component for Data Grid
 * @param {object} props
 * @param {array} props.columns columns data
 * @param {array} props.crows rows data
 * @param {boolean} props.qSearch display quick search if True
 * @param {number} props.rowsPerPage number of rows per page (10 by default)
 * @param {array} props.rowsPerPageOptions number of rows per page options list ([5, 10, 25, 50, 100] by default)
 * @param {string} props.rowBaseColor row background base color (primary main by default)
 * @param {function} props.onRowClick action when a row is clicked (conse.log for dev & null for production)
 */
function DataTable({
  columns,
  rows,
  qSearch,
  rowsPerPage,
  rowsPerPageOptions,
  rowBaseColor,
  onRowClick,
}) {
  const [nbRowsPerPage, setNbRowsPerPage] = useState(rowsPerPage);

  const theme = useTheme();

  const rowBgBaseColor = !rowBaseColor
    ? theme.palette.primary.main
    : rowBaseColor;

  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const bgColorRow1n = hex2rgba(rowBgBaseColor, 0.01);
  const bgColorRow2n = hex2rgba(rowBgBaseColor, 0.04);
  const bgColorRowHover = hex2rgba(rowBgBaseColor, 0.1);

  const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const rowRange = gridPaginationRowRangeSelector(apiRef);
    const filteredRows = gridFilteredSortedRowIdsSelector(apiRef);
    return (
      <div id="pagination">
        <Pagination
          color="primary"
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
        <div className="pagination-rowsPerPage" style={{ display: "flex" }}>
          <span className="pagination-rowsPerPage-text">Rows per page:</span>
          <FormControl size="small" className="pagination-rowsPerPage-select">
            <InputLabel
              style={{ display: "none" }}
              id="rowsPerPage-select-label"
            >
              Rows/page
            </InputLabel>
            <Select
              labelId="rowsPerPage-select-label"
              id="rowsPerPage-label-select"
              value={nbRowsPerPage}
              onChange={(e) => setNbRowsPerPage(e.target.value)}
            >
              {rowsPerPageOptions.map((opt, i) => {
                return (
                  <MenuItem key={i} value={opt}>
                    {opt}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <span className="pagination-rowsPerPage-count">
            rows {rowRange.firstRowIndex + 1}-{rowRange.lastRowIndex + 1} of{" "}
            {filteredRows.length}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="datatable-container">
      <DataGrid
        on
        columns={columns}
        rows={rows}
        hideFooterSelectedRowCount
        pageSize={nbRowsPerPage}
        onRowClick={onRowClick}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        componentsProps={{
          toolbar: {
            showQuickFilter: qSearch,
          },
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
            {
              outline: "none",
            },
          "&.MuiDataGrid-root": {
            border: 0,
          },
          "& .MuiDataGrid-row": {
            "&:nth-of-type(n)": { backgroundColor: bgColorRow1n },
            "&:nth-of-type(2n)": { backgroundColor: bgColorRow2n },
            "&:hover": { backgroundColor: bgColorRowHover },
          },
        }}
      ></DataGrid>
    </div>
  );
}

const logRowData = (data) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log(data.row);
  }
};

DataTable.defaultProps = {
  columns: [],
  rows: [],
  qSearch: false,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25, 50, 100],
  onRowClick: logRowData,
};

export default DataTable;
