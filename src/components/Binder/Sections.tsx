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
import useChangeOrder from "../../hooks/useChangeOrder";
import ChangeOrderTable from "./ChangeOrderTable";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { TiWarningOutline } from "react-icons/ti";
import { GiDustCloud, GiMineTruck } from "react-icons/gi";
import { VscChecklist } from "react-icons/vsc";
import { TbArrowsExchange2 } from "react-icons/tb";
import useDelayLog from "../../hooks/useDelayLogs";
import DelayLogTable from "./DelayLogTable";
import { LuFileClock } from "react-icons/lu";

type Props = {
  job?: Job;
};

function Sections({ job }: Props) {
  const [pillDr, setPillDr] = useState<number>(0);
  const { data: hazards } = useHazards(job?.jobsId ?? 0);
  const { data: silicaReports } = useSilica(job?.jobsId ?? 0);
  const { data: checkListReports } = useChecklist(job?.jobsId ?? 0);
  const { data: demoClReports } = useDemoChecklist(job?.number ?? "");
  const { data: changeOrders } = useChangeOrder(job?.jobsId!!);
  const { data: delayLogs } = useDelayLog(job?.jobsId!!);

  const handlePill = (num: number) => {
    setPillDr(num);
  };

  const handleDrStorage = () => {
    localStorage.removeItem("daily-report-storage");
    localStorage.removeItem("dumpsters-storage");
    localStorage.removeItem("equipments-storage");
    localStorage.removeItem("manpower-storage");
    localStorage.removeItem("rentals-storage");
    localStorage.removeItem("tools-storage");
  };

  const handleHazardClearStorage = () => {
    localStorage.removeItem("activity-storage");
    localStorage.removeItem("hazard-report-storage");
    localStorage.removeItem("hazard-options-storage");
    localStorage.removeItem("signatures-storage");
  };

  const handleEquipmentClClearStorage = () => {
    localStorage.removeItem("checklist-storage");
    localStorage.removeItem("equipmentCl-storage");
    localStorage.removeItem("qrChecklists-storage");
  };

  const handleSilicaClearStorage = () => {
    localStorage.removeItem("silica-report-storage");
  };

  const handleDemoClearStorage = () => {
    localStorage.removeItem("demo-checklist-storage");
  };

  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="section-header">
              <LiaCalendarDaySolid size={20} />
              Daily Report
              <span className="section-header__badge badge rounded-pill bg-danger">
                {pillDr}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <DRTable
                  jobNumber={job?.number}
                  jobId={job?.jobsId}
                  handlePill={handlePill}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleDrStorage();
                      window.location.href = `https://ckarlosdev.github.io/daily-report/#/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New Daily Report
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="section-header">
              <TiWarningOutline size={20} />
              Pre-Task Job Hazard
              <span className="section-header__badge badge rounded-pill bg-danger">
                {hazards?.length ?? 0}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <HazardTable jobId={job?.jobsId} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleHazardClearStorage();
                      window.location.href = `https://ckarlosdev.github.io/hazard-report/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New Hazard Report
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="section-header">
              <GiMineTruck size={20} />
              Equipment Checklists
              <span className="section-header__badge badge rounded-pill bg-danger">
                {checkListReports?.length ?? 0}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <ChecklistTable jobId={job?.jobsId} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleEquipmentClClearStorage();
                      window.location.href = `https://ckarlosdev.github.io/checklist-report/#/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New checklist Report
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <div className="section-header">
              <GiDustCloud size={20} />
              Silica Report
              <span className="section-header__badge badge rounded-pill bg-danger">
                {silicaReports?.length ?? 0}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <SilicaTable jobId={job?.jobsId} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleSilicaClearStorage();
                      window.location.href = `https://ckarlosdev.github.io/silica-report-project/#/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New Silica Report
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <div className="section-header">
              <VscChecklist size={20} />
              Demo Checklist
              <span className="section-header__badge badge rounded-pill bg-danger">
                {demoClReports?.length ?? 0}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <DemoChecklistTable
                  jobNumber={job?.number}
                  jobId={job?.jobsId}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleDemoClearStorage();
                      window.location.href = `https://ckarlosdev.github.io/demo-checklist-report/#/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New Demo Checklist
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <div className="section-header">
              <TbArrowsExchange2 size={20} />
              Change Orders
              <span className="section-header__badge badge rounded-pill bg-danger">
                {changeOrders?.length ?? 0}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <ChangeOrderTable jobNumber={job?.number} jobId={job?.jobsId} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleDemoClearStorage();
                      window.location.href = `https://ckarlosdev.github.io/change-order/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New Change Order
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <div className="section-header">
              <LuFileClock size={20} />
              Delay Logs
              <span className="section-header__badge badge rounded-pill bg-danger">
                {delayLogs?.length ?? 0}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <DelayLogTable jobNumber={job?.number} jobId={job?.jobsId} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="section-actions">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleDemoClearStorage();
                      window.location.href = `https://ckarlosdev.github.io/delay-log/?jobId=${job?.jobsId}&action=new`;
                    }}
                  >
                    New Delay Log
                  </Button>
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
