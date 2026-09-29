import { format, parseISO } from "date-fns";
import { Button, Col, Row } from "react-bootstrap";
import useDelayLog from "../../hooks/useDelayLogs";
import useEmployees from "../../hooks/useEmployees";
import { useAuthStore } from "../../hooks/authStore";
import { useEffect, useState } from "react";
import type { DelayLog } from "../../types";
import { MdOutlineAddAPhoto } from "react-icons/md";

type Props = { jobNumber?: string; jobId?: number };

function DelayLogTable({ jobNumber, jobId }: Props) {
  const [delayLogsDetail, setDelayLogsDetail] = useState<DelayLog[]>();
  const { data: delayLogs, isLoading, error } = useDelayLog(jobId!!);
  const { user: userAuth } = useAuthStore();
  const { data: employees } = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = delayLogsDetail?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil((delayLogsDetail ?? []).length / itemsPerPage);

  useEffect(() => {
    if (delayLogs) {
      const data = delayLogs.sort(
        (a, b) =>
          new Date(b.delayDate).getTime() - new Date(a.delayDate).getTime(),
      );
      setDelayLogsDetail(data);
    }
  }, [delayLogs]);

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

  const getDateFormat = (dateString: string | null | undefined): string => {
    // 1. Validamos si el string viene vacío, null o undefined
    if (!dateString) {
      return "Sin fecha"; // O el texto/fallback que prefieras mostrar en la tabla
    }

    try {
      const dateObject = parseISO(dateString);

      if (isNaN(dateObject.getTime())) {
        return "Fecha inválida";
      }

      return format(dateObject, "MM/dd/yyyy");
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Error fecha";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading delay logs.</div>;
  }

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  // console.log(delayLogsDetail);

  return (
    <>
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
                {currentItems?.map((order) => {
                  const employee = employees?.find(
                    (emp) => emp.employeesId === order.employeeId,
                  );

                  const fullName =
                    employee?.firstName + " " + employee?.lastName;

                  return (
                    <tr key={order.id}>
                      <td>{getDateFormat(order.delayDate)}</td>
                      <td>{fullName}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          as="a"
                          style={{ fontWeight: "bold" }}
                          href={`https://script.google.com/a/macros/hmbrandt.com/s/AKfycbyAEL6qmN19RBHgWQMIKSKRZo4yrRYgxoHH4QC6XykO5xTmdtfBGrE7FmLtQL-6sD39/exec?jobNumber=${jobNumber}&reportType=delay-log&date=${order.delayDate}&drId=${order.id}`}
                          target="_self"
                        >
                          <MdOutlineAddAPhoto />
                        </Button>
                      </td>
                      <td>
                        <a
                          href={`https://ckarlosdev.github.io/delay-log/?jobId=${jobId}&delayLogId=${order.id}`}
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
    </>
  );
}

export default DelayLogTable;
