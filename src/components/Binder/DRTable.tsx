import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import type { DrGral } from "../../types";
import { format } from "date-fns";
import "../../styles/tables.css";
import { useDailyReport } from "../../hooks/useDailyReports";
import { useQViewStore } from "../../stores/useQViewStore";
import { useAuthStore } from "../../hooks/authStore";
import { MdOutlineAddAPhoto } from "react-icons/md";
import Pager from "../Pager";
import {
  MobileCard,
  MobileCardList,
  MobileCardRow,
  MobileCardStat,
} from "../MobileCard";

type Props = {
  jobNumber?: string;
  jobId?: number;
  handlePill: (numReg: number) => void;
};

function DRTable({ jobNumber, jobId, handlePill }: Props) {
  const [drDetail, setDrDetail] = useState<DrGral[]>();

  const { user: userAuth } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: drData } = useDailyReport(jobNumber ?? "");
  const { setShow, setDrId } = useQViewStore();

  const handleManPowerClick = (id: number) => {
    setDrId(id);
    setShow(true);
  };

  useEffect(() => {
    if (drData) {
      const data = drData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      handlePill(data.length);
      setDrDetail(data);
    }
  }, [drData]);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = drDetail?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((drDetail ?? []).length / itemsPerPage);

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

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  const photosUrl = (item: DrGral) =>
    `https://script.google.com/a/macros/hmbrandt.com/s/AKfycbyAEL6qmN19RBHgWQMIKSKRZo4yrRYgxoHH4QC6XykO5xTmdtfBGrE7FmLtQL-6sD39/exec?jobNumber=${jobNumber}&reportType=DailyReport&date=${item.date}&drId=${item.dailyReportId}`;

  const reportUrl = (item: DrGral) =>
    `https://ckarlosdev.github.io/daily-report/#/?jobId=${jobId}&dailyReportId=${item.dailyReportId}`;

  return (
    <div>
      {/* Tablet y computadora */}
      <div className="d-none d-md-block custom-table-container table-responsive">
        <table className="table table-hover table-striped table-sm align-middle">
          <thead className="table-primary" style={{ textAlign: "center" }}>
            <tr>
              <th style={{ color: "#0c63e4" }}>Date</th>
              <th style={{ color: "#0c63e4" }}>Foreman</th>
              <th style={{ color: "#0c63e4" }}>Man Power</th>
              <th style={{ color: "#0c63e4" }}>Equipment</th>
              <th style={{ color: "#0c63e4" }}>Photos</th>
              <th style={{ color: "#0c63e4" }}>Tools</th>
              <th style={{ color: "#0c63e4" }}>Dumpsters</th>
              <th style={{ color: "#0c63e4" }}>Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentItems?.map((item) => (
              <tr key={item.dailyReportId}>
                <td>{getDateFormat(item.date)}</td>
                <td>{item.foreman}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleManPowerClick(item.dailyReportId)}
                  >
                    {item.manTotal}
                  </Button>
                </td>
                <td>{item.equipmentTotal}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    as="a"
                    href={photosUrl(item)}
                    target="_self"
                  >
                    {item.photosTotal}
                  </Button>
                </td>
                <td>{item.toolsTotal}</td>
                <td>{item.dumpstersCount}</td>
                <td>
                  <a href={reportUrl(item)} target="_self">
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
        emptyText="No daily reports yet."
      >
        {currentItems?.map((item) => (
          <MobileCard
            key={item.dailyReportId}
            title={getDateFormat(item.date)}
            actions={
              <>
                <Button
                  variant="outline-primary"
                  as="a"
                  href={photosUrl(item)}
                  target="_self"
                >
                  <MdOutlineAddAPhoto /> Photos ({item.photosTotal})
                </Button>
                <Button
                  variant="primary"
                  as="a"
                  href={reportUrl(item)}
                  target="_self"
                >
                  {isAuthorized ? "Update" : "View"}
                </Button>
              </>
            }
          >
            <MobileCardRow label="Foreman">{item.foreman}</MobileCardRow>
            <div className="m-card__stats">
              <button
                type="button"
                className="m-card__stat border-0 w-100"
                onClick={() => handleManPowerClick(item.dailyReportId)}
                aria-label="View crew"
              >
                <span className="m-card__label">Man Power ›</span>
                <span className="m-card__stat-value">{item.manTotal}</span>
              </button>
              <MobileCardStat label="Equipment">
                {item.equipmentTotal}
              </MobileCardStat>
              <MobileCardStat label="Tools">{item.toolsTotal}</MobileCardStat>
              <MobileCardStat label="Dumpsters">
                {item.dumpstersCount}
              </MobileCardStat>
            </div>
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

export default DRTable;
