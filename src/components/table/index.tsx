import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Box,
  IconButton,
  Card,
  Stack,
  CircularProgress,
  Select,
  Button,
} from "@mui/material";
import Iconify from "../iconify";
import Label from "src/components/table/Label";
import EmptyContent from "../noDataFound";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Papa from "papaparse";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: any;
  format?: (value: number) => string;
  type?:
    | "string"
    | "image"
    | "action"
    | "badge"
    | "serial"
    | "description"
    | "delete"
    | "update"; // Add "serial" type
}

interface Row {
  [key: string]: string | number | null;
}

interface Props {
  columns: Column[];
  rows: any[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onClick?: (event: MouseEvent, row: Row) => void;
  onDeleteClick?: (event: MouseEvent, row: Row) => void;
  onUpdateClick?: (event: MouseEvent, row: Row) => void;
  filters?: Column[];
  filter?: boolean;
  loading?: boolean;
  limit?: (number: number) => void;
  offset?: (number: number) => void;
  dateRange?: (dateRange: any) => void;
  status?: (status: string) => void;
  csvDownloadButton?: boolean;
}

export default function CustomTable(props: Props) {
  const filter = props.filter ?? false;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.defaultRowsPerPage ?? 5);
  const [search, setSearch] = useState("");
  const [dense, setDense] = useState(false);

  const handleStatusChange = (event: any) => {
    props.status?.(event.target.value);
  };

  const handleDateRangeChange = (event: any) => {
    // props.dateRange?.(event);
    let dateValues1 = "";
    let dateValues2 = "";
    event.map((data: any, index: any) => {
      const originalDate = new Date(data?.$d);
      const year = originalDate?.getFullYear();
      const month = String(originalDate?.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with leading zero if needed.
      const day = String(originalDate?.getDate()).padStart(2, "0");
      if (index === 0) {
        dateValues1 = `${year}-${month}-${day}`;
      } else {
        dateValues2 = `${year}-${month}-${day}`;
      }
    });
    console.log(`${dateValues1}:${dateValues2}`);
    props.dateRange?.(`${dateValues1}:${dateValues2}`);
  };

  const filteredRows = props.rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  // const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    props.offset?.(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    props.limit?.(parseInt(event.target.value, 10));
  };

  const handleDenseToggle = () => {
    setDense((prevState) => !prevState);
  };

  const handleDownloadCSV = () => {
    // Extracting headers
    const headers = props.columns.map((column) => column.label);

    // Extracting data rows
    const rows = filteredRows.map((row) =>
      props.columns.map((column) => String(row[column.id]))
    );

    // Combining headers and rows
    const csvData = [headers, ...rows];

    // Convert to CSV format
    const csvString = Papa.unparse(csvData);

    // Create a Blob and initiate download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_data.csv";
    link.click();
  };

  return (
    <Card sx={{ p: 3 }} elevation={10}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Stack direction="row">
          {filter && (
            <>
              <Box sx={{ mb: 5, mr: 2, mt: -1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateRangePicker"]}>
                    <DateRangePicker
                      onChange={handleDateRangeChange}
                      localeText={{ start: "From", end: "To" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box sx={{ mb: 5, mr: 2 }}>
                <Select
                  native
                  onChange={handleStatusChange}
                  inputProps={{
                    name: "status",
                    id: "age-native-simple",
                  }}
                >
                  <option value="">All</option>
                  <option value="approved">Approved</option>
                  {/* <option value="unpaid">Unpaid</option> */}
                  {/* <option value="inactive">Inactive</option> */}
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                  <option value="rejected">Rejected</option>
                  {/* <option value="shortlisted">Shortlisted</option>
                  <option value="submitted">Submitted</option> */}
                </Select>
              </Box>
            </>
          )}
          <TextField
            sx={{ mb: 5 }}
            name="search"
            variant="outlined"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {props.csvDownloadButton ?? (
            <Button sx={{ml:2, maxHeight:55}} variant="contained" onClick={handleDownloadCSV}>
              Download CSV
            </Button>
          )}
        </Stack>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer
            component={Paper}
            sx={{
              minWidth: 800,
              position: "relative",
              border: "2px solid #f3f6f8",
              borderRadius: 1,
            }}
          >
            <Table aria-label="custom table">
              {props.loading ? (
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress size={50} sx={{ mt: 10, mb: 10 }} />
                </Stack>
              ) : (
                <>
                  <TableHead>
                    {filteredRows.length === 0 ? (
                      <>
                        <TableRow>
                          {/* Add the Serial column */}
                          <TableCell
                            key="serial"
                            align="left"
                            style={{
                              minWidth: 100,
                              backgroundColor: "#078DEE",
                              color: "white",
                            }}
                          >
                            #
                          </TableCell>
                          {props.columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "#078DEE",
                                color: "white",
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </>
                    ) : (
                      <TableRow>
                        {/* Add the Serial column */}
                        <TableCell
                          key="serial"
                          align="left"
                          style={{
                            minWidth: 100,
                            backgroundColor: "#078DEE",
                            color: "white",
                          }}
                        >
                          #
                        </TableCell>
                        {props.columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "#078DEE",
                              color: "white",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </TableHead>
                  <TableBody>
                    {filteredRows.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={props.columns.length + 1}
                          align="center"
                        >
                          <EmptyContent title={"No Data"} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedRows.map((row, index) => (
                        <TableRow
                          hover={true}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {/* Display the serial number */}
                          <TableCell align="left">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          {props.columns.map((column) => {
                            const value = row[column.id];
                            const columnType = column.type;
                            if (columnType === "description") {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: value.toString(),
                                    }}
                                  />
                                </TableCell>
                              );
                            }
                            if (columnType === "badge") {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  <Label
                                    variant={"ghost" || "filled"}
                                    color={
                                      (value === "active" && "success") ||
                                      (value === "unpaid" && "warning") ||
                                      (value === "inactive" && "error") ||
                                      (value === "approved" && "success") ||
                                      (value === "pending" && "warning") ||
                                      (value === "flagged" && "error") ||
                                      (value === "rejected" && "error") ||
                                      (value === "under-process" &&
                                        "warning") ||
                                      (value === "suspended" && "error") ||
                                      (value === "verified" && "success") ||
                                      "default"
                                    }
                                    sx={{ textTransform: "capitalize" }}
                                  >
                                    {value}
                                  </Label>
                                </TableCell>
                              );
                            }
                            if (columnType === "image") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Box
                                    component="img"
                                    src={value as string}
                                    width="50px"
                                    height="50px"
                                  />
                                </TableCell>
                              );
                            }
                            if (columnType === "action") {
                              return (
                                <TableCell align="right">
                                  <IconButton
                                    size="small"
                                    color="inherit"
                                    onClick={(event: any) =>
                                      props.onClick?.(event, row)
                                    }
                                  >
                                    <Iconify icon={"eva:more-vertical-fill"} />
                                  </IconButton>
                                </TableCell>
                              );
                            }
                            if (columnType === "delete") {
                              return (
                                <TableCell align="right">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(event: any) =>
                                      props.onDeleteClick?.(event, row)
                                    }
                                  >
                                    <Iconify icon={"ic:baseline-delete"} />
                                  </IconButton>
                                </TableCell>
                              );
                            }
                            if (columnType === "update") {
                              return (
                                <TableCell align="right">
                                  <IconButton
                                    size="small"
                                    color="warning"
                                    onClick={(event: any) =>
                                      props.onUpdateClick?.(event, row)
                                    }
                                  >
                                    <Iconify icon={"heroicons:pencil-solid"} />
                                  </IconButton>
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value as number)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </>
              )}
            </Table>
            <Box
              sx={{
                position: "relative",
                border: "1px solid #f3f6f8",
                borderRadius: 0,
              }}
            >
              <TablePagination
                rowsPerPageOptions={props.rowsPerPageOptions ?? [5, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </TableContainer>
        </Box>
      </div>
    </Card>
  );
}
