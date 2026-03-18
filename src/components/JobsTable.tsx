import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import type { Job } from "../types";

type Props = {
  items: Job[];
  loading: boolean;
  setBinder: (jobsId: number) => void;
};

function JobTable({ items, loading, setBinder }: Props) {
  // console.log(items);
  return (
    <>
      <Table striped bordered hover>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contractor</th>
            {/* <th>Contact</th>
            <th>Status</th> */}
            <th>Binder</th>
            {/* <th>Update</th> */}
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {items.map((job) => (
            <tr key={job.jobsId}>
              <td>{job.number}</td>
              <td>{job.type}</td>
              <td>{job.name}</td>
              <td>{job.address}</td>
              <td>{job.contractor}</td>
              <td>
                <Button
                  disabled={!loading ? false : true}
                  onClick={() => {
                    setBinder(job.jobsId);

                  }}
                >
                  Binder
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default JobTable;
