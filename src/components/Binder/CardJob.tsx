import { Card, Col, Form, Row } from "react-bootstrap";
import type { Job } from "../../types";

type Props = {
  job?: Job;
};

function CardJob({ job }: Props) {
  return (
    <>
      <Card className="shadow-sm border-0 mb-2 bg-light">
        {/* Reducimos el padding interno a p-2 para que sea súper compacto */}
        <Card.Body className="p-3 px-3">
          <Row className="align-items-center">
            <Col
              md={2}
              xs={12}
              className="text-md-start text-center mb-2 mb-md-0"
            >
              <span
                className="fw-bold text-secondary text-uppercase small"
                style={{ fontSize: "12px", letterSpacing: "0.05em" }}
              >
                Job Selected:
              </span>
            </Col>

            {/* Inputs en formato compacto */}
            <Col md={10} xs={12}>
              <Row className="g-2">
                {" "}
                {/* g-2 reduce el espacio entre las columnas de los inputs */}
                {/* No. de Trabajo */}
                <Col sm={4} xs={12}>
                  <div className="input-group input-group-sm">
                    {" "}
                    {/* Tamaño 'sm' para menos altura */}
                    <span
                      className="input-group-text bg-white border-secondary-subtle text-muted fw-semibold"
                      style={{ fontSize: "12px" }}
                    >
                      No.
                    </span>
                    <Form.Control
                      type="text"
                      className="bg-white fw-bold border-secondary-subtle text-dark"
                      value={job?.number ?? "—"}
                      readOnly
                      disabled
                    />
                  </div>
                </Col>
                {/* Nombre del Trabajo */}
                <Col sm={8} xs={12}>
                  <div className="input-group input-group-sm">
                    <span
                      className="input-group-text bg-white border-secondary-subtle text-muted fw-semibold"
                      style={{ fontSize: "12px" }}
                    >
                      Name
                    </span>
                    <Form.Control
                      type="text"
                      className="bg-white fw-semibold border-secondary-subtle text-dark"
                      value={job?.name ?? "No asignado"}
                      readOnly
                      disabled
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardJob;
