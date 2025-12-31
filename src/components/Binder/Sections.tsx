import { Accordion, Button, Col, Row, Table } from "react-bootstrap";
import DRTable from "./DRTable";
import type { Job } from "../../types";
import { useState } from "react";

type Props = {
  job?: Job;
};

function Sections({ job }: Props) {
  const [pillDr, setPillDr] = useState<number>(0);

  const handlePill = (num: number) => {
    setPillDr(num);
  };

  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div
              className="ms-2 me-auto"
              style={{
                fontWeight: "bold",
              }}
            >
              Daily Report
            </div>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="pill-HazardList"
            >
              {pillDr}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <DRTable jobNumber={job?.number} handlePill={handlePill} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <a href={`https://ckarlosdev.github.io/daily-report/#/?jobId=${job?.jobsId}`} target="_self">
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      New Daily Report
                    </Button>
                  </a>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="ms-2 me-auto" style={{ fontWeight: "bold" }}>
              Pre-Task Job Hazard
            </div>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="pill-HazardList"
            >
              0
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr className="table-primary" style={{ textAlign: "center" }}>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="ms-2 me-auto" style={{ fontWeight: "bold" }}>
              Equipment Checklist
            </div>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="pill-HazardList"
            >
              0
            </span>
          </Accordion.Header>
          <Accordion.Body>Table</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Sections;
