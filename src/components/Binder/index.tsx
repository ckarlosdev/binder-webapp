import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title";
import Sections from "./Sections";
import CardJob from "./CardJob";
import { useEffect, useState } from "react";
import type { Job } from "../../types";
import useJob from "../../hooks/useJobs";
import QvCrew from "../view/QvCrew";
import TabGoup from "../tabs/TabGoup";
import { CgMoreO } from "react-icons/cg";
import FilesModal from "../tabs/FilesModal";
import IncidentsModal from "../tabs/IncidentsModal";

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
      <Container className="px-2 px-sm-3">
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
        <Row>
          <Col>
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="section-header">
                    <CgMoreO size={20} />
                    <span style={{ fontWeight: "bold" }}>Others</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <TabGoup job={jobDetail} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="w-100 d-flex justify-content-center"
              style={{ marginTop: "25px", marginBottom: "20px" }}
            >
              <Button
                variant="outline-primary"
                className="back-btn"
                onClick={() => navigate("/")}
              >
                {"< Job List"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <QvCrew />
      <FilesModal job={jobDetail} />
      <IncidentsModal job={jobDetail} />
    </>
  );
}

export default index;
