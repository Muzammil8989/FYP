import React from "react";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const columns = [
  {
    name: "S No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <div style={{ textAlign: "center" }}>{value}</div>
      ),
    },
  },
  {
    name: "Name",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <div style={{ textAlign: "center" }}>{value}</div>
      ),
    },
  },
  {
    name: "Email",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <div style={{ textAlign: "center" }}>{value}</div>
      ),
    },
  },
  {
    name: "Skills",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <div style={{ textAlign: "center" }}>{value}</div>
      ),
    },
  },
  {
    name: "Education",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <div style={{ textAlign: "center" }}>{value}</div>
      ),
    },
  },
  {
    name: "University",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <div style={{ textAlign: "center" }}>{value}</div>
      ),
    },
  },
  {
    name: "Resume",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              href={value}
              download
            >
              Download Now
            </Button>
          </div>
        );
      },
    },
  },
  {
    name: "Email Candidate",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const resumeScore = tableMeta.rowData[8]; // Resume Score
        const testScore = tableMeta.rowData[9]; // Test Score
        const email = tableMeta.rowData[2]; // Email

        let backgroundColor = "";

        if (resumeScore > 70 && testScore > 70) {
          backgroundColor = "green"; // Green for both above 70%
        } else if (resumeScore >= 50 || testScore >= 50) {
          backgroundColor = "yellow"; // Yellow for either score above 50%
        } else {
          backgroundColor = "red"; // Red for both below 50%
        }

        return (
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ backgroundColor, color: "#212121" }}
              onClick={() => handleEmailCandidate(email)}
            >
              Send Email
            </Button>
          </div>
        );
      },
    },
  },
  {
    name: "Resume Score",
    options: {
      filter: true, // Enable filtering for Resume Score
      sort: true,
      customBodyRender: (value) => (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress variant="determinate" value={value} size={30} />
          <span style={{ marginLeft: 8 }}>{value}</span>
        </Box>
      ),
    },
  },
  {
    name: "Test Score",
    options: {
      filter: true, // Enable filtering for Test Score
      sort: true,
      customBodyRender: (value) => (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress variant="determinate" value={value} size={30} />
          <span style={{ marginLeft: 8 }}>{value}</span>
        </Box>
      ),
    },
  },
];

const data = [
  [
    1,
    "Joe James",
    "joe.james@example.com",
    "JavaScript, React",
    "Bachelor of Science",
    "XYZ University",
    "path/to/resume1.pdf",
    "joe.james@example.com",
    90,
    20,
  ],
  [
    2,
    "John Walsh",
    "john.walsh@example.com",
    "Java, Spring",
    "Master of Science",
    "ABC University",
    "path/to/resume2.pdf",
    "john.walsh@example.com",
    78,
    88,
  ],
  [
    3,
    "Bob Herm",
    "bob.herm@example.com",
    "Python, Django",
    "Bachelor of Arts",
    "LMN University",
    "path/to/resume3.pdf",
    "bob.herm@example.com",
    92,
    95,
  ],
  [
    4,
    "James Houston",
    "james.houston@example.com",
    "C#, ASP.NET",
    "Bachelor of Technology",
    "OPQ University",
    "path/to/resume4.pdf",
    "james.houston@example.com",
    80,
    85,
  ],
];

const options = {
  filterType: "checkbox",
  responsive: "standard",
  elevation: 0,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 20],
  downloadOptions: {
    filename: "candidate_data.csv",
    separator: ",",
  },
  onDownload: (buildHead, buildBody, columns, data) => {
    return "\uFEFF" + buildHead(columns) + buildBody(data);
  },
};

const getMuiThemes = () =>
  createTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      background: {
        default: "#f5f5f5",
        paper: "#c8b7e8",
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
           
            backgroundColor: "#f5f5f5",
            color: "#212121",
            fontWeight: "bold",
            padding: "10px 4px",
          },
          root: {
            borderBottom: "1px solid #ccc",
          },
          body: {
            padding: "10px 15px",
            color: "#212121",
          },
        },
      },
    },
  });

const handleEmailCandidate = (email) => {
  // Logic to send email to the candidate
  console.log(`Sending email to: ${email}`);
};

const CandidateTable = () => {
  return (
    <div className="p-12">
      <ThemeProvider theme={getMuiThemes()}>
        <MUIDataTable
          title={"Candidate List"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
};

export default CandidateTable;
