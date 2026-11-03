import { format, parseISO } from "date-fns";
import { Button } from "react-bootstrap";
import useDelayLog from "../../hooks/useDelayLogs";
import useEmployees from "../../hooks/useEmployees";
import { useAuthStore } from "../../hooks/authStore";
import { useEffect, useState } from "react";
import type { DelayLog } from "../../types";
import { MdOutlineAddAPhoto } from "react-icons/md";
import "../../styles/tables.css";
import Pager from "../Pager";
import { MobileCard, MobileCardList, MobileCardRow } from "../MobileCard";

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

  const getForemanName = (order: DelayLog) => {
    const employee = employees?.find(
      (emp) => emp.employeesId === order.employeeId,
    );
    return employee?.firstName + " " + employee?.lastName;
  };

  const photosUrl = (order: DelayLog) =>
    `https://script.google.com/a/macros/hmbrandt.com/s/AKfycbyAEL6qmN19RBHgWQMIKSKRZo4yrRYgxoHH4QC6XykO5xTmdtfBGrE7FmLtQL-6sD39/exec?jobNumber=${jobNumber}&reportType=delay-log&date=${order.delayDate}&drId=${order.id}`;

  const logUrl = (order: DelayLog) =>
    `https://ckarlosdev.github.io/delay-log/?jobId=${jobId}&delayLogId=${order.id}`;

  return (
    <div>
      {/* Tablet y computadora */}
      <div className="d-none d-md-block custom-table-container table-responsive">
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
            {currentItems?.map((order) => (
              <tr key={order.id}>
                <td>{getDateFormat(order.delayDate)}</td>
                <td>{getForemanName(order)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    as="a"
                    style={{ fontWeight: "bold" }}
                    href={photosUrl(order)}
                    target="_self"
                  >
                    <MdOutlineAddAPhoto />
                  </Button>
                </td>
                <td>
                  <a href={logUrl(order)} target="_self">
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      {isAuthorized ? "Update" : "View"}
                    </Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Celular */}
      <MobileCardList
        isEmpty={!currentItems?.length}
        emptyText="No delay logs yet."
      >
        {currentItems?.map((order) => (
          <MobileCard
            key={order.id}
            title={getDateFormat(order.delayDate)}
            actions={
              <>
                <Button
                  variant="outline-primary"
                  as="a"
                  href={photosUrl(order)}
                  target="_self"
                >
                  <MdOutlineAddAPhoto /> Photos
                </Button>
                <Button
                  variant="primary"
                  as="a"
                  href={logUrl(order)}
                  target="_self"
                >
                  {isAuthorized ? "Update" : "View"}
                </Button>
              </>
            }
          >
            <MobileCardRow label="Foreman">{getForemanName(order)}</MobileCardRow>
          </MobileCard>
        ))}
      </MobileCardList>

      <Pager
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default DelayLogTable;
