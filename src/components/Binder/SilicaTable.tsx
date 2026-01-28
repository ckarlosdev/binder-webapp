import { Button, Col, Row } from "react-bootstrap";
import useSilica from "../../hooks/useSilica";
import { useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import "../../styles/tables.css";

type Props = {
  jobId?: number;
};

function SilicaTable({ jobId }: Props) {
  const { data: silicaReports, isLoading, error } = useSilica(jobId ?? 0);
  const { data: employees } = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = silicaReports?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((silicaReports ?? []).length / itemsPerPage);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading silica reports.</div>;
  }

  return (
    <div className="custom-table-container table-responsive">
      <Row>
        <Col>
          <table className="table table-hover table-striped table-sm align-middle">
            <thead className="table-primary" style={{ textAlign: "center" }}>
              <tr>
                <th style={{ color: "#0c63e4" }}>Date</th>
                <th style={{ color: "#0c63e4" }}>Foreman</th>
                <th style={{ color: "#0c63e4" }}>Update</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {currentItems?.map((report) => {
                const foreman = employees?.find(
                  (emp) => emp.employeesId === report.employeesId,
                );

                return (
                  <tr key={report.silicaId}>
                    <td>{new Date(report.eventDate).toLocaleDateString()}</td>
                    <td>
                      {foreman
                        ? foreman.firstName + " " + foreman.lastName
                        : "Unknown"}
                    </td>
                    <td>
                      <a
                        href={`https://ckarlosdev.github.io/silica-report/index.html?silicaId=${report.silicaId}`}
                        target="_self"
                      >
                        <Button
                          variant="outline-primary"
                          style={{ fontWeight: "bold" }}
                        >
                          Update
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

export default SilicaTable;
