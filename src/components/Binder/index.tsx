import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title";
import Sections from "./Sections";
import CardJob from "./CardJob";
import { useEffect, useState } from "react";
import useHttpsData from "../../hooks/useHttpsData";
import type { Job } from "../../types";
import { getJobByIdURL } from "../../hooks/urls";

type Props = {};

function index({}: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState<Job>();

  const { data: jobData, search: searchJob } = useHttpsData<Job>();

  useEffect(() => {
    if (params.jobsId) {
      const url = getJobByIdURL(params.jobsId);
      //   console.log(url);
      searchJob(url);
    }
  }, []);

  useEffect(() => {
    if (jobData) {
      setJobDetail(jobData);
    }
  }, [jobData]);

  //   console.log(jobDetail);

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
