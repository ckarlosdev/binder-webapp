import { Button } from "react-bootstrap";
import useSilica from "../../hooks/useSilica";
import { useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import "../../styles/tables.css";
import { format } from "date-fns";
import { useAuthStore } from "../../hooks/authStore";
import Pager from "../Pager";
import { MobileCard, MobileCardList, MobileCardRow } from "../MobileCard";

type Props = {
  jobId?: number;
};

function SilicaTable({ jobId }: Props) {
  const { data: silicaReports, isLoading, error } = useSilica(jobId ?? 0);
  const { data: employees } = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userAuth } = useAuthStore();

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = silicaReports?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((silicaReports ?? []).length / itemsPerPage);

  const getDateFormat = (dateString: string) => {
    const parts = dateString.split("T")[0].split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const localDateObject = new Date(year, month, day);

    const formattedDate = format(localDateObject, "MM/dd/yyyy");
    return formattedDate;
  };

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

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  const getForemanName = (employeesId: number) => {
    const foreman = employees?.find((emp) => emp.employeesId === employeesId);
    return foreman ? foreman.firstName + " " + foreman.lastName : "Unknown";
  };

  const reportUrl = (silicaId: number | null) =>
    `https://ckarlosdev.github.io/silica-report-project/#/?jobId=${jobId}&silicaId=${silicaId}`;

  return (
    <div>
      {/* Tablet y computadora */}
      <div className="d-none d-md-block custom-table-container table-responsive">
        <table className="table table-hover table-striped table-sm align-middle">
          <thead className="table-primary" style={{ textAlign: "center" }}>
            <tr>
              <th style={{ color: "#0c63e4" }}>Date</th>
              <th style={{ color: "#0c63e4" }}>Foreman</th>
              <th style={{ color: "#0c63e4" }}>Update</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentItems?.map((report) => (
              <tr key={report.silicaId}>
                <td>{getDateFormat(report.eventDate)}</td>
                <td>{getForemanName(report.employeesId)}</td>
                <td>
                  <a href={reportUrl(report.silicaId)} target="_self">
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
        emptyText="No silica reports yet."
      >
        {currentItems?.map((report) => (
          <MobileCard
            key={report.silicaId}
            title={getDateFormat(report.eventDate)}
            actions={
              <Button
                variant="primary"
                as="a"
                href={reportUrl(report.silicaId)}
                target="_self"
              >
                {isAuthorized ? "Update" : "View"}
              </Button>
            }
          >
            <MobileCardRow label="Foreman">
              {getForemanName(report.employeesId)}
            </MobileCardRow>
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

export default SilicaTable;
