import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import type { Job } from "../../types";

type Props = {
  job?: Job;
};

function CardJob({ job }: Props) {
  return (
    <>
      <Card style={{ marginBottom: "5px" }}>
        <CardBody>
          <CardTitle
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            JobSelected
          </CardTitle>
          <Container>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingJobNumber"
                  label="Job Number"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    style={{ fontWeight: "bold", textAlign: "center" }}
                    value={job?.number ?? ""}
                    readOnly
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Job Name"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    style={{ fontWeight: "bold", textAlign: "center" }}
                    value={job?.name ?? ""}
                    readOnly
                  />
                </FloatingLabel>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Job Address">
                  <Form.Control
                    type="text"
                    style={{ fontWeight: "bold", textAlign: "center" }}
                    value={"11505 W. County Line Rd. Milwaukee, WI. "}
                  />
                </FloatingLabel>
              </Col>
            </Row> */}
          </Container>
        </CardBody>
      </Card>
    </>
  );
}

export default CardJob;
