import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
      </Container>
    </>
  );
}

export default index;
