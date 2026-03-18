import { Button, Col, Row } from "react-bootstrap";
import useDemoChecklist from "../../hooks/useDemoChecklists";
import { useState } from "react";
import "../../styles/tables.css";
import { format } from "date-fns";
import { useAuthStore } from "../../hooks/authStore";

type Props = { jobNumber?: string; jobId?: number };

function DemoChecklistTable({ jobNumber, jobId }: Props) {
  const {
    data: demoClReports,
    isLoading,
    error,
  } = useDemoChecklist(jobNumber ?? "");
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userAuth } = useAuthStore();

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = demoClReports?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((demoClReports ?? []).length / itemsPerPage);

  const pageNumbersToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
  let endPage = startPage + pageNumbersToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageNumbersToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getDateFormat = (dateString: string) => {
    const parts = dateString.split("T")[0].split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const localDateObject = new Date(year, month, day);

    const formattedDate = format(localDateObject, "MM/dd/yyyy");
    return formattedDate;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Demo Checklist reports.</div>;
  }

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  return (
    <div className="custom-table-container table-responsive">
      <Row>
        <Col>
          <table className="table table-hover table-striped table-sm align-middle">
            <thead className="table-primary" style={{ textAlign: "center" }}>
              <tr>
                <th style={{ color: "#0c63e4" }}>Date</th>
                <th style={{ color: "#0c63e4" }}>Foreman</th>
                <th style={{ color: "#0c63e4" }}>Photos</th>
                <th style={{ color: "#0c63e4" }}>Update</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {currentItems?.map((report) => {
                return (
                  <tr key={report.demoChecklistsId}>
                    <td>{getDateFormat(report.checklistDate)}</td>
                    <td>{report.foreman}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        as="a"
                        style={{ fontWeight: "bold" }}
                        href={`https://script.google.com/a/macros/hmbrandt.com/s/AKfycbzUG6YZDJzpaSTxIuf8xwPe9Bu3KsVeXhgwszMQAe_ZZfNOodySAD1GB14ODUMJ-eCL/exec?jobNumber=${jobNumber}&reportType=Before-Demo&date=${report.checklistDate}&drId=${report.demoChecklistsId}`}
                        target="_self"
                      >
                        {"Before"}
                      </Button>
                      {" "}
                      <Button
                        variant="outline-primary"
                        as="a"
                        style={{ fontWeight: "bold" }}
                        href={`https://script.google.com/a/macros/hmbrandt.com/s/AKfycbzUG6YZDJzpaSTxIuf8xwPe9Bu3KsVeXhgwszMQAe_ZZfNOodySAD1GB14ODUMJ-eCL/exec?jobNumber=${jobNumber}&reportType=After-Demo&date=${report.checklistDate}&drId=${report.demoChecklistsId}`}
                        target="_self"
                      >
                        {"After"}
                      </Button>
                    </td>
                    <td>
                      <a
                        href={`https://ckarlosdev.github.io/demo-checklist-report/#/?jobId=${jobId}&demoChecklistId=${report.demoChecklistsId}`}
                        target="_self"
                      >
                        <Button
                          variant="outline-primary"
                          style={{ fontWeight: "bold" }}
                        >
                          {isAuthorized ? "Update" : "View"}
                        </Button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ margin: "0 5px", padding: "5px 10px" }}
            >
              {"<"}
            </button>

            {startPage > 1 && (
              <>
                <button onClick={() => handlePageChange(1)}>1</button>
                {startPage > 2 && <span>...</span>}
              </>
            )}

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  margin: "0 5px",
                  background: currentPage === page ? "#007bff" : "#eee",
                  color: currentPage === page ? "white" : "black",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span>...</span>}
                <button onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ margin: "0 5px", padding: "5px 10px" }}
            >
              {">"}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DemoChecklistTable;
