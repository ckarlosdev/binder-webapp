import { Col, Modal, Row, Table } from "react-bootstrap";
import { useQViewStore } from "../../stores/useQViewStore";
import { useDailyReportData } from "../../hooks/useDailyReports";
import useEmployees from "../../hooks/useEmployees";
import { calculateHoursDifference } from "../../utils/utilities";

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
    return <div>Cargando reporte...</div>;
  }

  const handleGetName = (employeeId: number) => {
    const employee = employeesData?.find(
      (employee) => employee.employeesId === employeeId
    );
    return employee?.firstName + " " + employee?.lastName;
  };

  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Crew
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row>
              <Col>
                <div
                  style={{
                    backgroundColor: "#f3f3f3",
                    overflowY: "auto",
                    overflowX: "auto",
                  }}
                >
                  <Table striped bordered hover  className="w-100 text-center">
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
                      {drData.employees.map((assignment) => (
                        <tr
                          key={assignment.employeesId}
                          style={{ verticalAlign: "middle" }}
                        >
                          <td>{handleGetName(assignment.employeesId!)}</td>
                          <td>{assignment.inHour?.slice(0, 5)}</td>
                          <td>{assignment.outHour?.slice(0, 5)}</td>
                          <td>
                            {calculateHoursDifference(
                              assignment.inHour,
                              assignment.outHour,
                              assignment.lunch,
                            )}
                          </td>
                          <td>
                            {assignment.lunch ? (
                              <span className="badge text-bg-success">Yes</span>
                            ) : (
                              <span className="badge text-bg-secondary">
                                No
                              </span>
                            )}
                          </td>
                          <td>
                            {assignment.ppe ? (
                              <span className="badge text-bg-success">
                                Completed
                              </span>
                            ) : (
                              <span className="badge text-bg-warning">
                                Incompleted
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default QvCrew;
