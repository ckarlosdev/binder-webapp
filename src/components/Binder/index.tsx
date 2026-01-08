import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title";
import Sections from "./Sections";
import CardJob from "./CardJob";
import { useEffect, useState } from "react";
// import useHttpsData from "../../hooks/useHttpsData";
import type { Job } from "../../types";
import useJob from "../../hooks/useJobs";
// import { getJobByIdURL } from "../../hooks/urls";

type Props = {};

function index({}: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState<Job>();
  const { data: jobsData } = useJob();

  useEffect(() => {
    if (params.jobsId) {

      const job = jobsData?.find((job) => job.jobsId === Number(params.jobsId));
      if (job) {
        setJobDetail(job);
      }
    }
  }, [jobsData, params.jobsId]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Title children={"Binder"} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CardJob job={jobDetail} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Sections job={jobDetail} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginTop: "25px", marginBottom: "20px" }}>
              <Button
                variant="outline-primary"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  width: "150px",
                  height: "50px",
                }}
                onClick={() => navigate("/")}
              >
                {"< Job List"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default index;
