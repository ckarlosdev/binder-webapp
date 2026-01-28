import { Accordion, Button, Col, Row } from "react-bootstrap";
import DRTable from "./DRTable";
import type { Job } from "../../types";
import { useState } from "react";
import HazardTable from "./HazardTable";
import useHazards from "../../hooks/useHazards";
import SilicaTable from "./SilicaTable";
import useSilica from "../../hooks/useSilica";
import useChecklist from "../../hooks/useChecklists";
import ChecklistTable from "./ChecklistTable";
import DemoChecklistTable from "./DemoChecklistTable";
import useDemoChecklist from "../../hooks/useDemoChecklists";

type Props = {
  job?: Job;
};

function Sections({ job }: Props) {
  const [pillDr, setPillDr] = useState<number>(0);
  const { data: hazards } = useHazards(job?.jobsId ?? 0);
  const { data: silicaReports } = useSilica(job?.jobsId ?? 0);
  const { data: checkListReports } = useChecklist(job?.jobsId ?? 0);
  const { data: demoClReports } = useDemoChecklist(job?.number ?? "");

  const handlePill = (num: number) => {
    setPillDr(num);
  };

  return (
    <>
      <Accordion alwaysOpen>
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
                  <a
                    href={`https://ckarlosdev.github.io/daily-report/#/?jobId=${job?.jobsId}`}
                    target="_self"
                  >
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
              {hazards?.length ?? 0}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <HazardTable jobId={job?.jobsId} />
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
                  <a
                    href={`https://ckarlosdev.github.io/hazard-report/?jobId=${job?.jobsId}`}
                    target="_self"
                  >
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      New Hazard Report
                    </Button>
                  </a>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="ms-2 me-auto" style={{ fontWeight: "bold" }}>
              Equipment Checklists
            </div>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="pill-HazardList"
            >
              {checkListReports?.length ?? 0}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <ChecklistTable jobId={job?.jobsId} />
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
                  <a
                    href={`https://ckarlosdev.github.io/checklist-report/#/?jobId=${job?.number}`}
                    target="_self"
                  >
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      New checklist Report
                    </Button>
                  </a>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <div className="ms-2 me-auto" style={{ fontWeight: "bold" }}>
              Silica Report
            </div>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="pill-HazardList"
            >
              {silicaReports?.length ?? 0}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <SilicaTable jobId={job?.jobsId} />
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
                  <a
                    href={`https://ckarlosdev.github.io/silica-report/index.html?jobNumber=${job?.number}`}
                    target="_self"
                  >
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      New Silica Report
                    </Button>
                  </a>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <div className="ms-2 me-auto" style={{ fontWeight: "bold" }}>
              Demo Checklist
            </div>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="pill-HazardList"
            >
              {demoClReports?.length ?? 0}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <DemoChecklistTable jobNumber={job?.number} />
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
                  <a
                    href={`https://ckarlosdev.github.io/demo-checklist/index.html?jobNumber=${job?.number}&user=ckarlosTest`}
                    target="_self"
                  >
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      New Demo Checklist
                    </Button>
                  </a>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Sections;
