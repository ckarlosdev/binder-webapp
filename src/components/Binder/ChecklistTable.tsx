import { Button } from "react-bootstrap";
import useChecklist from "../../hooks/useChecklists";
import { useMemo, useState } from "react";
import "../../styles/tables.css";
import { format } from "date-fns";
import { useAuthStore } from "../../hooks/authStore";
import Pager from "../Pager";
import { MobileCard, MobileCardList, MobileCardRow } from "../MobileCard";

type Props = { jobId?: number };

function ChecklistTable({ jobId }: Props) {
  const { data: checklistReports, isLoading, error } = useChecklist(jobId ?? 0);
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userAuth } = useAuthStore();

  const reportSorted = useMemo(() => {
    if (!checklistReports) return [];
    return [...checklistReports].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [checklistReports]);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportSorted?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((checklistReports ?? []).length / itemsPerPage);

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
    return <div>Error loading checklist reports.</div>;
  }

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  const reportUrl = (checklistId: number) =>
    `https://ckarlosdev.github.io/checklist-report/#/?jobId=${jobId}&checklistId=${checklistId}`;

  return (
    <div>
      {/* Tablet y computadora */}
      <div className="d-none d-md-block custom-table-container table-responsive">
        <table className="table table-hover table-striped table-sm align-middle">
          <thead className="table-primary" style={{ textAlign: "center" }}>
            <tr>
              <th style={{ color: "#0c63e4" }}>Date</th>
              <th style={{ color: "#0c63e4" }}>Total</th>
              <th style={{ color: "#0c63e4" }}>Update</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentItems?.map((report) => (
              <tr key={report.equipmentsGoogleChecklistsId}>
                <td>{getDateFormat(report.date)}</td>
                <td>{report.total}</td>
                <td>
                  <a
                    href={reportUrl(report.equipmentsGoogleChecklistsId)}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Celular */}
      <MobileCardList
        isEmpty={!currentItems?.length}
        emptyText="No checklist reports yet."
      >
        {currentItems?.map((report) => (
          <MobileCard
            key={report.equipmentsGoogleChecklistsId}
            title={getDateFormat(report.date)}
            actions={
              <Button
                variant="primary"
                as="a"
                href={reportUrl(report.equipmentsGoogleChecklistsId)}
                target="_self"
              >
                {isAuthorized ? "Update" : "View"}
              </Button>
            }
          >
            <MobileCardRow label="Total">{report.total}</MobileCardRow>
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

export default ChecklistTable;
