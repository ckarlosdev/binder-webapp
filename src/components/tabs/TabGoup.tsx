import { Tabs, Tab, Card, Button } from "react-bootstrap";
import { RiAlarmWarningFill } from "react-icons/ri";
import FilesTab from "./FilesTab";
import { ImFilesEmpty } from "react-icons/im";
import { useOthersStore } from "../../stores/useOthersStore";
import IncidentsTab from "./IncidentsTab";
import type { Job } from "../../types";
import { useIncidentStore } from "../../stores/useIndicentsStore";
import { CiReceipt } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  job?: Job;
};

function TabGoup({ job }: Props) {
  const { filesList } = useOthersStore();
  const { incidentList } = useIncidentStore();

  return (
    <Tabs
      defaultActiveKey="files"
      id="justify-tab-example"
      className=""
      justify
    >
      <Tab
        eventKey="files"
        title={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ImFilesEmpty />
            <span style={{ fontWeight: "bold" }}>Files</span>
            <span className="badge rounded-pill bg-danger" id="pill-HazardList">
              {filesList.length}
            </span>
          </div>
        }
      >
        <FilesTab job={job} />
      </Tab>
      <Tab
        eventKey="incidents"
        title={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <RiAlarmWarningFill />
            <span style={{ fontWeight: "bold" }}>Incidents</span> {/* Texto */}
            <span className="badge rounded-pill bg-danger" id="pill-HazardList">
              {incidentList.length}
            </span>
          </div>
        }
      >
        <IncidentsTab job={job} />
      </Tab>

      <Tab
        eventKey="receipts"
        title={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <CiReceipt />
            <span style={{ fontWeight: "bold" }}>Receipts</span>
          </div>
        }
      >
        <div className="py-5 d-flex justify-content-center align-items-center">
          <Card
            className="text-center p-4 border-0 shadow-sm"
            style={{ maxWidth: "480px", borderRadius: "16px" }}
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle"
              style={{
                width: "64px",
                height: "64px",
                fontSize: "32px",
                color: "#0d6efd",
              }}
            >
              <CiReceipt />
            </div>

            <Card.Title className="fw-bold mb-2">
              Sending and Registering Receipts
            </Card.Title>

            <Card.Text
              className="text-muted mb-4"
              style={{ fontSize: "0.95rem" }}
            >
              Complete the official form to register or view your receipts
              quickly and securely.
            </Card.Text>

            <Button
              variant="primary"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeTsNhwy_kW85rKrgioGwQQM_RnIx2nozB8Wn_JEy6YkMQtSA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center gap-2 py-2 px-4 shadow-sm"
              style={{ borderRadius: "10px", fontWeight: "600" }}
            >
              <span>Open Form</span>
              <FiExternalLink />
            </Button>
          </Card>
        </div>
      </Tab>
      {/* <Tab
        eventKey="accidents"
        title={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <IoIosWarning />
            <span style={{ fontWeight: "bold" }}>Accidents</span> 
          </div>
        }
      >
        <div className="bg-white border border-top-0 rounded-bottom p-4 shadow-sm"></div>
      </Tab> */}
      {/* <Tab
        eventKey="tickets"
        title={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <FaFileInvoiceDollar />
            <span style={{ fontWeight: "bold" }}>Tickets</span>
          </div>
        }
      >
        <div className="bg-white border border-top-0 rounded-bottom p-4 shadow-sm"></div>
      </Tab> */}
    </Tabs>
  );
}

export default TabGoup;
