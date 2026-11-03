import { Col, Container, Row } from "react-bootstrap";
import Title from "../components/Title";
import JobTable from "../components/JobsTable";
import Search from "../components/Search";
import Pager from "../components/Pager";
import type { Job } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJob from "../hooks/useJobs";

function Home() {
  const navigate = useNavigate();

  const { data: jobData, isLoading: loadingJobs } = useJob();

  const [jobsDetail, setJobsDetail] = useState<Job[]>([]);
  const [jobsFiltered, setJobsFiltered] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingBinder, setLoadingBinder] = useState(false);

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobsFiltered.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(jobsFiltered.length / itemsPerPage);

  const handleDataFilter = (value: string) => {
    setCurrentPage(1);
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
    if (jobData) {
      const jobsSorted = jobData.sort((a, b) =>
        b.number.localeCompare(a.number),
      );
      setJobsDetail(jobsSorted);
      setJobsFiltered(jobsSorted);
      setCurrentPage(1);
    }
  }, [jobData]);

  // console.log(jobsDetail);

  return (
    <>
      <Container className="px-3 pb-4">
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
            <div className="loading-state text-center text-muted py-4">
              <p>Loading jobs...</p>
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
            <Pager
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
