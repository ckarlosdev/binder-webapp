import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { FaEdit, FaPlus, FaRegCommentDots, FaTrashAlt } from "react-icons/fa";
import { useIncidentStore } from "../../stores/useIndicentsStore";
import useEmployees from "../../hooks/useEmployees";
import { useDeleteIncident, useSaveIncident } from "../../hooks/useWorkSpace";
import type { Incident, Job } from "../../types";

type Props = {
  job?: Job;
};

function IncidentsModal({ job }: Props) {
  const { mutate: saveIncident, isPending: isSavingIncident } =
    useSaveIncident();
  const { mutate: deleteIncident, isPending: isDeletingIncident } =
    useDeleteIncident();
  const {
    showModal,
    setShowModal,
    incidentData,
    setIncidentData,
    incidentList,
    setIncidentList,
    removeIncident,
    resetIncidentData,
    incidentToUpdate,
  } = useIncidentStore();

  const { data: employees } = useEmployees();

  const employeesOptions = employees?.filter(
    (emp) =>
      (emp.title === "Supervisor" || emp.title === "Labor") &&
      emp.status === "Active",
  );

  const employeesSorted = employeesOptions?.sort((a, b) =>
    a.firstName.localeCompare(b.firstName),
  );

  const handleEdit = (temporalId: string) => {
    const incidentToEdit = incidentList.find(
      (inc) => inc.temporalId === temporalId,
    );
    if (!incidentToEdit) return;
    incidentToUpdate(incidentToEdit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Incident = {
      ...incidentData,
      jobId: job?.jobsId ?? null,
    };

    saveIncident(
      { data: payload },
      {
        onSuccess: (response) => {
          const savedIncident = response.data;
          console.log("Incident saved successfully.");
          setIncidentData({ id: savedIncident.id });
          setIncidentList();
          resetIncidentData();
        },
        onError: (error) => {
          console.log("Error saving order", error);
          alert("Error saving file");
        },
      },
    );
  };

  const handleDelete = (incident: Incident) => {
    if (incident.id) {
      if (window.confirm(`Are you sure you want to delete it?`)) {
        deleteIncident(incident.id, {
          onSuccess: () => {
            // Una vez que el servidor confirma la eliminación, limpiamos el estado local
            if (incidentData.temporalId === incident.temporalId) {
              resetIncidentData();
            }
            removeIncident(incident.temporalId);
          },
        });
      }
    }
    // ESCENARIO B: El archivo es nuevo en la lista y solo existe localmente (id es null)
    else {
      if (incidentData.temporalId === incident.temporalId) {
        resetIncidentData();
      }
      removeIncident(incident.temporalId);
    }
  };

  const isEditing = !!incidentData.temporalId;
  const isBusy = isSavingIncident || isDeletingIncident;

  const closeModal = () => {
    if (isBusy) return;
    resetIncidentData();
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={!isBusy}>
        <Modal.Title>
          {isEditing ? "Edit Incident" : "New Incident"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3 mb-2">
            <Col md={6} xs={12}>
              <Form.Group controlId="formDocType">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1">
                  type
                </Form.Label>
                <Form.Select
                  value={incidentData.incType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setIncidentData({
                      incType: val,
                      customName:
                        val !== "Other" ? "" : incidentData.customName,
                    });
                  }}
                  className="form-select-sm border-secondary-subtle fw-semibold text-dark"
                  disabled={isBusy}
                  required
                >
                  <option value="">Select type...</option>
                  <option value="Blueprint">Hard Hat</option>
                  <option value="Safety Glasses">Safety Glasses</option>
                  <option value="High-Visibility Vest">
                    High-Visibility Vest
                  </option>
                  <option value="Steel-Toe Boots">Steel-Toe Boots</option>
                  <option value="Gloves">Gloves</option>
                  <option value="Ear Plugs">Ear Plugs</option>
                  <option value="Face Mask">Face Mask</option>
                  <option value="Fall Protection Harness">
                    Fall Protection Harness
                  </option>
                  <option value="Electrical Tester">Electrical Tester</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} xs={12}>
              <Form.Group controlId="formCustomName">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1">
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="e.g.: Face Shield"
                  value={incidentData.customName}
                  onChange={(e) =>
                    setIncidentData({ customName: e.target.value })
                  }
                  className="border-secondary-subtle"
                  required={incidentData.incType === "Other"}
                  disabled={incidentData.incType !== "Other" || isBusy}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3 mb-2">
            <Col md={6} xs={12}>
              <Form.Group controlId="formDate">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1">
                  Date
                </Form.Label>
                <Form.Control
                  type="date"
                  size="sm"
                  value={incidentData.date}
                  onChange={(e) => setIncidentData({ date: e.target.value })}
                  className="border-secondary-subtle fw-semibold"
                  disabled={isBusy}
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={12}>
              <Form.Group controlId="formLabor">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1">
                  Labor
                </Form.Label>
                <Form.Select
                  value={incidentData.employeeId ?? ""}
                  onChange={(e) =>
                    setIncidentData({
                      employeeId: e.target.value
                        ? Number(e.target.value)
                        : null,
                    })
                  }
                  className="form-select-sm border-secondary-subtle fw-semibold text-dark"
                  required
                  disabled={isBusy}
                >
                  <option value="">Select employee...</option>
                  {employeesSorted?.map((emp) => {
                    const fullName = `${emp.firstName} ${emp.lastName}`;
                    return (
                      <option key={emp.employeesId} value={emp.employeesId}>
                        {fullName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formComment">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-2 d-flex align-items-center gap-1">
                  <FaRegCommentDots className="text-secondary" /> Comment
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write details of the incident..."
                  value={incidentData.comment}
                  onChange={(e) => setIncidentData({ comment: e.target.value })}
                  className="border-secondary-subtle mb-2 shadow-sm"
                  maxLength={500}
                  disabled={isBusy}
                />

                {/* Contenedor del botón alineado a la derecha */}
                <div className="d-flex justify-content-end gap-2">
                  {isEditing && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={resetIncidentData}
                    >
                      Cancel Edit
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant={isEditing ? "warning" : "primary"}
                    className="fw-bold d-flex align-items-center gap-2 px-4 shadow-sm btn-sm"
                    disabled={isBusy}
                  >
                    {isSavingIncident ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaPlus />
                    )}
                    <span>
                      {isSavingIncident
                        ? "Saving..."
                        : isEditing
                          ? "Save Changes"
                          : "Add File"}
                    </span>
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* Listado inferior */}
        <div className="pt-3 border-top">
          <div className="fw-bold text-secondary small text-uppercase mb-2">
            Incidents added ({incidentList.length})
          </div>

          {incidentList.length === 0 ? (
            <div className="text-center text-muted small py-3 bg-light rounded border border-dashed">
              No incidents added yet.
            </div>
          ) : (
            <div
              className="d-flex flex-column gap-2"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {incidentList.map((item) => (
                // CORREGIDO: key ahora usa un id real único
                <div
                  key={item.temporalId}
                  className="d-flex align-items-center justify-content-between p-2 bg-white border rounded shadow-sm"
                >
                  <div className="d-flex align-items-center gap-2 text-truncate me-2">
                    <span className="badge bg-secondary-subtle text-secondary small">
                      {item.incType}
                    </span>
                    {item.incType === "Other" && (
                      <span
                        className="fw-semibold text-dark small text-truncate"
                        title={item.customName}
                      >
                        {item.customName}
                      </span>
                    )}
                    {/* Renderizado opcional del comentario para verificar datos */}
                    {item.comment && (
                      <span className="text-muted small text-truncate style-italic">
                        - "{item.comment}"
                      </span>
                    )}
                  </div>

                  <div className="d-flex gap-1">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="p-1 px-2 border-0"
                      onClick={() => handleEdit(item.temporalId)}
                      disabled={isBusy}
                      title="Edit"
                    >
                      <FaEdit size={13} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="p-1 px-2 border-0"
                      onClick={() => handleDelete(item)}
                      disabled={isBusy}
                      title="Delete"
                    >
                      <FaTrashAlt size={13} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default IncidentsModal;
