import { Button } from "react-bootstrap";
import useHazards from "../../hooks/useHazards";
import { useState } from "react";
import "../../styles/tables.css";
import { format } from "date-fns";
import { useAuthStore } from "../../hooks/authStore";
import Pager from "../Pager";
import { MobileCard, MobileCardList, MobileCardRow } from "../MobileCard";

type Props = {
  jobId?: number;
};

function HazardTable({ jobId }: Props) {
  const { data: hazards, isLoading, error } = useHazards(jobId ?? 0);
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userAuth } = useAuthStore();

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hazards?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((hazards ?? []).length / itemsPerPage);

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
    return <div>Error loading hazard reports.</div>;
  }

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  const reportUrl = (preTasksId: number | null) =>
    `https://ckarlosdev.github.io/hazard-report/?jobId=${jobId}&hazardReportId=${preTasksId}`;

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
            {currentItems?.map((hazard) => (
              <tr key={hazard.preTasksId}>
                <td>{getDateFormat(hazard.date)}</td>
                <td>{hazard.supervisor}</td>
                <td>
                  <a href={reportUrl(hazard.preTasksId)} target="_self">
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
        emptyText="No hazard reports yet."
      >
        {currentItems?.map((hazard) => (
          <MobileCard
            key={hazard.preTasksId}
            title={getDateFormat(hazard.date)}
            actions={
              <Button
                variant="primary"
                as="a"
                href={reportUrl(hazard.preTasksId)}
                target="_self"
              >
                {isAuthorized ? "Update" : "View"}
              </Button>
            }
          >
            <MobileCardRow label="Foreman">{hazard.supervisor}</MobileCardRow>
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

export default HazardTable;
