import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { GridCellEditStopReasons } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

export default function InitialState({ props }) {
  const { loading } = useDemoData({
    // dataSet: "Commodity",
    // rowLength: 100,
    // maxColumns: 10,
  });
  {
    console.log(props);
  }
  const columns = [
    { field: "repo_name" },
    { field: "url", width: 150 },
    { field: "subscription", width: 250 },
    {
      field: "dateCreated",
      headerName: "Date Created",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      type: "dateTime",
      width: 220,
      editable: true,
    },
  ];
  const dynamicRows = props.map((value, index) => ({
    id: index + 1,
    repo_name: value.name,
    url: value.url,
    subscription: value.viewerSubscription,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  }));

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={dynamicRows}
        loading={loading}
        initialState={{
          ...dynamicRows.initialState,
          filter: {
            filterModel: {
              items: [{ field: "quantity", operator: ">", value: 10000 }],
            },
          },
          sorting: {
            sortModel: [{ field: "desk", sort: "asc" }],
          },
        }}
        onCellEditStop={(params, event) => {
          if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
      />
    </div>
  );
}
