import { Col, Modal, Row, Table } from "react-bootstrap";
import { useQViewStore } from "../../stores/useQViewStore";
import { useDailyReportData } from "../../hooks/useDailyReports";
import useEmployees from "../../hooks/useEmployees";
import { calculateHoursDifference } from "../../utils/utilities";
import { MobileCard, MobileCardList, MobileCardStat } from "../MobileCard";

type Props = {};

function QvCrew({}: Props) {
  const { showModal, setShow, dailyReportId } = useQViewStore();
  const { data: employeesData } = useEmployees();

  const { data: drData, isLoading } = useDailyReportData(
    dailyReportId as number,
    {
      enabled: dailyReportId !== null,
    },
  );

  if (isLoading) {
    return <div>Loading report...</div>;
  }

  const handleGetName = (employeeId: number) => {
    const employee = employeesData?.find(
      (employee) => employee.employeesId === employeeId,
    );
    return employee?.firstName + " " + employee?.lastName;
  };

  const crew = (drData?.employees ?? []).map((assignment) => {
    const lunchValue = String(assignment.lunch).toLowerCase() === "true";
    const ppeValue = String(assignment.ppe).toLowerCase() === "true";
    return {
      assignment,
      lunchValue,
      ppeValue,
      name: handleGetName(assignment.employeesId!),
      inHour: assignment.inHour?.slice(0, 5),
      outHour: assignment.outHour?.slice(0, 5),
      hours: calculateHoursDifference(
        assignment.inHour,
        assignment.outHour,
        lunchValue,
      ),
    };
  });

  const lunchBadge = (value: boolean) =>
    value ? (
      <span className="badge text-bg-success">Yes</span>
    ) : (
      <span className="badge text-bg-secondary">No</span>
    );

  const ppeBadge = (value: boolean) =>
    value ? (
      <span className="badge text-bg-success">Completed</span>
    ) : (
      <span className="badge text-bg-warning">Incompleted</span>
    );

  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        fullscreen="sm-down"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Crew{" "}
            {crew.length > 0 && (
              <span className="badge rounded-pill bg-primary fs-6 align-middle">
                {crew.length}
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Tablet y computadora */}
          <Row className="d-none d-md-flex">
            <Col>
              <div
                style={{
                  backgroundColor: "#f3f3f3",
                  overflowY: "auto",
                  overflowX: "auto",
                }}
              >
                <Table striped bordered hover className="w-100 text-center">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>In</th>
                      <th>Out</th>
                      <th>Hours</th>
                      <th>Lunch</th>
                      <th>PPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crew.map((row) => (
                      <tr
                        key={row.assignment.employeesId}
                        style={{ verticalAlign: "middle" }}
                      >
                        <td>{row.name}</td>
                        <td>{row.inHour}</td>
                        <td>{row.outHour}</td>
                        <td>{row.hours}</td>
                        <td>{lunchBadge(row.lunchValue)}</td>
                        <td>{ppeBadge(row.ppeValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {/* Celular */}
          <MobileCardList isEmpty={crew.length === 0} emptyText="No crew.">
            {crew.map((row) => (
              <MobileCard
                key={row.assignment.employeesId}
                title={row.name}
                badge={ppeBadge(row.ppeValue)}
              >
                <div className="m-card__stats" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <MobileCardStat label="In">{row.inHour ?? "—"}</MobileCardStat>
                  <MobileCardStat label="Out">{row.outHour ?? "—"}</MobileCardStat>
                  <MobileCardStat label="Hours">{row.hours}</MobileCardStat>
                </div>
                <div className="m-card__row">
                  <span className="m-card__label">Lunch</span>
                  <span>{lunchBadge(row.lunchValue)}</span>
                </div>
              </MobileCard>
            ))}
          </MobileCardList>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default QvCrew;
