import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getDrGralURL } from "../../hooks/urls";
import useHttpsData from "../../hooks/useHttpsData";
import type { DrGral } from "../../types";
import { format } from "date-fns";

type Props = {
  jobNumber?: string;
  handlePill: (numReg: number) => void;
};

function DRTable({ jobNumber, handlePill }: Props) {
  const [drDetail, setDrDetail] = useState<DrGral[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: drData, search: searchDrs } = useHttpsData<DrGral[]>();

  useEffect(() => {
    if (jobNumber) {
      const url = getDrGralURL(jobNumber);
      searchDrs(url);
    }
  }, [jobNumber]);

  useEffect(() => {
    if (drData) {
      const data = drData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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

  //   console.log(drDetail);

  return (
    <div>
      <Row>
        <Col>
          <table className="table table-hover table-striped">
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
                  <td>{item.manTotal}</td>
                  <td>{item.equipmentTotal}</td>
                  <td>{item.photosTotal}</td>
                  <td>{item.toolsTotal}</td>
                  <td>{item.dumpstersCount}</td>
                  <td>
                    <a
                      // href={`https://www.youtube.com/${item.dailyReportId}`}
                      href={`https://ckarlosdev.github.io/daily-report/#/?jobId=${jobNumber}&dailyReportId=${item.dailyReportId}`}
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
              ))}
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

export default DRTable;
