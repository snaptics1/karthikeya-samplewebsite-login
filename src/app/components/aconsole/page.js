"use client";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, ValidationModule } from "ag-grid-community"; // Import the modules
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../../node_modules/ag-grid-community/styles/ag-grid.css";
import "../../../../node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useRouter } from "next/navigation";
import PolarAreaChart from "@/app/cpanel/PolarAreaChart ";
export default function Aconsle() {
  const router = useRouter();
  useEffect(() => {
    // Import Bootstrap JavaScript only on the client side
    if (typeof window !== "undefined") {
      require("../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    console.log("Component has mounted on the client side.");
  }, []);

  const [rowData, setRowData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/listapi"); // Make sure this API endpoint is correct
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();

      // Assuming 'data.users' contains the necessary data for the grid
      setRowData(data.users);

      console.log(data, "us");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [columnDefs] = useState([
    { headerName: "sector", field: "sector", sortable: true },
    { headerName: "2011_12", field: "2011_12", sortable: true },
    { headerName: "2012_13", field: "2012_13", sortable: true },
    { headerName: "2013_14", field: "2013_14", sortable: true },
    { headerName: "2014_15", field: "2014_15", sortable: true },
    { headerName: "2015_16", field: "2015_16", sortable: true },
    { headerName: "2016_17", field: "2016_17", sortable: true },
    { headerName: "2017_18", field: "2017_18", sortable: true },
    { headerName: "2018_19", field: "2018_19", sortable: true },
    { headerName: "2019_20", field: "2019_20", sortable: true },
    { headerName: "2020_21_TRE", field: "2020_21_TRE", sortable: true },
    { headerName: "2021_22_SRE", field: "2021_22_SRE", sortable: true },
    { headerName: "2022_23_FRE", field: "2022_23_FRE", sortable: true },
    { headerName: "2023_24_PE", field: "2023_24_PE", sortable: true },
  ]);

  const handleLogout = () => {
    // Clear the localStorage and navigate to the login page or home page
    localStorage.removeItem("role");
    localStorage.removeItem("Username");
    router.push("/"); // Or replace '/login' with the route you want to navigate to
  };
  return (
    <>
      <div className="col-xl-12 d-flex justify-content-between align-items-center  py-4 px-4">
        <div className="d-flex gap-2 align-items-center">
          <img
            className="DashboardIcon"
            style={{ height: "40px", width: "40px" }}
            src="/dashboardicon.png"
            alt=""
          />
          <h4 className="font-semibold text-black">Dashboard</h4>
        </div>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={{ padding: "0px 21px" }}>
        {/* Button to trigger modal */}
        <button
          className="btn btn-primary my-3"
          onClick={() => setShowModal(true)}
        >
          View In Pie Chart
        </button>
        <div
          className="ag-theme-alpine"
          style={{ height: "100vh", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            modules={[ClientSideRowModelModule, ValidationModule]} // Include ValidationModule here
          />
        </div>

        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Polar Area Chart</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <PolarAreaChart />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
