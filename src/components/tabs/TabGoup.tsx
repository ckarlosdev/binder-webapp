import { Tabs, Tab } from "react-bootstrap";
import { RiAlarmWarningFill } from "react-icons/ri";
import FilesTab from "./FilesTab";
import { ImFilesEmpty } from "react-icons/im";
import { useOthersStore } from "../../stores/useOthersStore";
import IncidentsTab from "./IncidentsTab";
import type { Job } from "../../types";

type Props = {
  job?: Job;
};

function TabGoup({ job }: Props) {
  const { filesList } = useOthersStore();

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
              {0}
            </span>
          </div>
        }
      >
        <IncidentsTab job={job} />
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
