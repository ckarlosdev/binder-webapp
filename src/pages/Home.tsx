import { Col, Container, Row } from "react-bootstrap";
import Title from "../components/Title";
import JobTable from "../components/JobsTable";
import Search from "../components/Search";
import useHttpsData from "../hooks/useHttpsData";
import type { Job } from "../types";
import { useEffect, useState } from "react";
import { getJobsURL } from "../hooks/urls";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [jobsDetail, setJobsDetail] = useState<Job[]>([]);
  const [jobsFiltered, setJobsFiltered] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingBinder, setLoadingBinder] = useState(false);

  const {
    data: jobData,
    loading: loadingJobs,
    search: searchJobs,
  } = useHttpsData<Job[]>();

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobsFiltered.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(jobsFiltered.length / itemsPerPage);

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

  const handleDataFilter = (value: string) => {
    if (!value) {
      setJobsFiltered(jobsDetail);
      return;
    }
    const search = value.toLowerCase();

    const data = jobsDetail.filter((job) => {
      return (
        job.address?.toLowerCase().includes(search) ||
        job.name?.toLowerCase().includes(search) ||
        job.type?.toLowerCase().includes(search) ||
        job.contractor?.toLowerCase().includes(search) ||
        job.number?.toString().toLowerCase().includes(search)
      );
    });

    setJobsFiltered(data);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleShowBinder = (jobsId: number) => {
    setLoadingBinder(true);
    navigate(`/binder/${jobsId}`);
    setLoadingBinder(false);
  };

  useEffect(() => {
    const urlJobs = getJobsURL();
    searchJobs(urlJobs);
  }, []);

  useEffect(() => {
    if (jobData) {
      const jobsSorted = jobData.sort((a, b) =>
        b.number.localeCompare(a.number)
      );
      console.log(jobsSorted);
      setJobsDetail(jobsSorted);
      handleDataFilter("");
    }
  }, [jobData]);

  // console.log(jobsDetail);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Title children={"Jobs"} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Search onChange={handleDataFilter} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          {loadingJobs ? (
            <div className="loading-state">
              <p>Loading data...</p>
            </div>
          ) : (
            <Col>
              <JobTable
                items={currentItems}
                loading={loadingBinder}
                setBinder={handleShowBinder}
              />
            </Col>
          )}
        </Row>
        <Row className="justify-content-md-center">
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
      </Container>
    </>
  );
}

export default Home;
