import { Button } from "react-bootstrap";
import useDemoChecklist from "../../hooks/useDemoChecklists";
import { useState } from "react";
import "../../styles/tables.css";
import { format } from "date-fns";
import { useAuthStore } from "../../hooks/authStore";
import { MdOutlineAddAPhoto } from "react-icons/md";
import Pager from "../Pager";
import { MobileCard, MobileCardList, MobileCardRow } from "../MobileCard";

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

  const photosUrl = (
    type: "Before-Demo" | "After-Demo",
    checklistDate: string,
    demoChecklistsId: number,
  ) =>
    `https://script.google.com/a/macros/hmbrandt.com/s/AKfycbyAEL6qmN19RBHgWQMIKSKRZo4yrRYgxoHH4QC6XykO5xTmdtfBGrE7FmLtQL-6sD39/exec?jobNumber=${jobNumber}&reportType=${type}&date=${checklistDate}&drId=${demoChecklistsId}`;

  const reportUrl = (demoChecklistsId: number) =>
    `https://ckarlosdev.github.io/demo-checklist-report/#/?jobId=${jobId}&demoChecklistId=${demoChecklistsId}`;

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
            {currentItems?.map((report) => (
              <tr key={report.demoChecklistsId}>
                <td>{getDateFormat(report.checklistDate)}</td>
                <td>{report.foreman}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    as="a"
                    style={{ fontWeight: "bold" }}
                    href={photosUrl(
                      "Before-Demo",
                      report.checklistDate,
                      report.demoChecklistsId,
                    )}
                    target="_self"
                  >
                    {"Before"}
                  </Button>{" "}
                  <Button
                    variant="outline-primary"
                    as="a"
                    style={{ fontWeight: "bold" }}
                    href={photosUrl(
                      "After-Demo",
                      report.checklistDate,
                      report.demoChecklistsId,
                    )}
                    target="_self"
                  >
                    {"After"}
                  </Button>
                </td>
                <td>
                  <a href={reportUrl(report.demoChecklistsId)} target="_self">
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
        emptyText="No demo checklists yet."
      >
        {currentItems?.map((report) => (
          <MobileCard
            key={report.demoChecklistsId}
            title={getDateFormat(report.checklistDate)}
            actions={
              <>
                <Button
                  variant="outline-primary"
                  as="a"
                  href={photosUrl(
                    "Before-Demo",
                    report.checklistDate,
                    report.demoChecklistsId,
                  )}
                  target="_self"
                >
                  <MdOutlineAddAPhoto /> Before
                </Button>
                <Button
                  variant="outline-primary"
                  as="a"
                  href={photosUrl(
                    "After-Demo",
                    report.checklistDate,
                    report.demoChecklistsId,
                  )}
                  target="_self"
                >
                  <MdOutlineAddAPhoto /> After
                </Button>
                <Button
                  variant="primary"
                  as="a"
                  href={reportUrl(report.demoChecklistsId)}
                  target="_self"
                  className="w-100"
                  style={{ flexBasis: "100%" }}
                >
                  {isAuthorized ? "Update" : "View"}
                </Button>
              </>
            }
          >
            <MobileCardRow label="Foreman">{report.foreman}</MobileCardRow>
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

export default DemoChecklistTable;
