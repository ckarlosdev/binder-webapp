import { Badge, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import type { Job } from "../types";
import { MobileCard, MobileCardList, MobileCardRow } from "./MobileCard";

type Props = {
  items: Job[];
  loading: boolean;
  setBinder: (jobsId: number) => void;
};

function JobTable({ items, loading, setBinder }: Props) {
  return (
    <>
      {/* Tablet y computadora */}
      <div className="d-none d-md-block table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Number</th>
              <th>Type</th>
              <th>Name</th>
              <th>Address</th>
              <th className="d-none d-lg-table-cell">Contractor</th>
              <th>Binder</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {items.map((job) => (
              <tr key={job.jobsId}>
                <td>{job.number}</td>
                <td>{job.type}</td>
                <td>{job.name}</td>
                <td>{job.address}</td>
                <td className="d-none d-lg-table-cell">{job.contractor}</td>
                <td>
                  <Button
                    disabled={loading}
                    onClick={() => setBinder(job.jobsId)}
                  >
                    Binder
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Celular */}
      <MobileCardList isEmpty={items.length === 0} emptyText="No jobs found.">
        {items.map((job) => (
          <MobileCard
            key={job.jobsId}
            title={<>#{job.number}</>}
            badge={
              job.type ? (
                <Badge bg="secondary" pill>
                  {job.type}
                </Badge>
              ) : undefined
            }
            actions={
              <Button
                size="lg"
                disabled={loading}
                onClick={() => setBinder(job.jobsId)}
              >
                Open Binder
              </Button>
            }
          >
            <div className="fw-semibold mb-1">{job.name}</div>
            {job.address && (
              <div className="text-muted small mb-1">{job.address}</div>
            )}
            {job.contractor && (
              <MobileCardRow label="Contractor">{job.contractor}</MobileCardRow>
            )}
          </MobileCard>
        ))}
      </MobileCardList>
    </>
  );
}

export default JobTable;
