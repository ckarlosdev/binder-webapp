import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useOthersStore } from "../../stores/useOthersStore";
import {
  FaEdit,
  FaGoogleDrive,
  FaLink,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { useDeleteFile, useSaveFile } from "../../hooks/useWorkSpace";
import type { DriveFile, Job } from "../../types";

type Props = {
  job?: Job;
};

function FilesModal({ job }: Props) {
  const { mutate: saveFile, isPending: isSavingFile } = useSaveFile();
  const { mutate: deleteFile, isPending: isDeletingFile } = useDeleteFile();

  const {
    showModal,
    setShowModal,
    fileData,
    setFileData,
    resetFileData,
    filesList,
    setFileList,
    fileToUpdate,
    removeFile,
  } = useOthersStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: DriveFile = {
      ...fileData,
      jobId: job?.jobsId ?? null,
    };

    saveFile(
      { data: payload },
      {
        onSuccess: (response) => {
          const savedFile = response.data;
          console.log("File saved successfully.");
          setFileData("id", savedFile.id);
          setFileList();
          resetFileData();
        },
        onError: (error) => {
          console.log("Error saving order", error);
          alert("Error saving file");
        },
      },
    );
  };

  const handleEdit = (temporalId: string) => {
    const fileToEdit = filesList.find((file) => file.temporalId === temporalId);
    if (!fileToEdit) return;
    fileToUpdate(fileToEdit);
  };

  const handleDelete = (file: DriveFile) => {
    // ESCENARIO A: El archivo ya está guardado en la Base de Datos (Tiene ID real)
    if (file.id) {
      if (
        window.confirm(
          `Are you sure you want to delete ${file.customName}?`,
        )
      ) {
        deleteFile(file.id, {
          onSuccess: () => {
            // Una vez que el servidor confirma la eliminación, limpiamos el estado local
            if (fileData.temporalId === file.temporalId) {
              resetFileData();
            }
            removeFile(file.temporalId);
          },
        });
      }
    }
    // ESCENARIO B: El archivo es nuevo en la lista y solo existe localmente (id es null)
    else {
      if (fileData.temporalId === file.temporalId) {
        resetFileData();
      }
      removeFile(file.temporalId);
    }
  };

  const isEditing = !!fileData.temporalId;
  const isBusy = isSavingFile || isDeletingFile;

  const closeModal = () => {
    if (isBusy) return;
    resetFileData();
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
        <Modal.Title>{isEditing ? "Edit File" : "New File"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form onSubmit={handleSubmit}>
          {/* FILA 1: Tipo de Documento y Nombre en paralelo */}
          <Row className="g-3 mb-3">
            {/* 1. Categoría / Tipo de Documento */}
            <Col md={6} xs={12}>
              <Form.Group controlId="formDocType">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1">
                  type
                </Form.Label>
                <Form.Select
                  value={fileData.docType}
                  onChange={(e) => setFileData("docType", e.target.value)}
                  className="form-select-sm border-secondary-subtle fw-semibold text-dark"
                  disabled={isBusy}
                  required
                >
                  <option value="">Select type...</option>
                  <option value="Blueprint">Blueprint</option>
                  <option value="Permit">Permit</option>
                  <option value="Asbestos">Asbestos</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* 2. Descripción / Nombre */}
            <Col md={6} xs={12}>
              <Form.Group controlId="formCustomName">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1">
                  Description / Name
                </Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="e.g.: City permit"
                  value={fileData.customName}
                  onChange={(e) => setFileData("customName", e.target.value)}
                  className="border-secondary-subtle"
                  disabled={isBusy}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* FILA 2: URL e InputGroup con Botón Acoplado */}
          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formDriveUrl">
                <Form.Label className="fw-bold text-secondary small text-uppercase mb-1 d-flex align-items-center gap-1">
                  <FaGoogleDrive className="text-success" /> Google drive link
                  Drive
                </Form.Label>

                <InputGroup size="sm">
                  <InputGroup.Text className="bg-light border-secondary-subtle text-muted">
                    <FaLink />
                  </InputGroup.Text>
                  <Form.Control
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={fileData.driveUrl}
                    onChange={(e) => setFileData("driveUrl", e.target.value)}
                    className="border-secondary-subtle"
                    pattern="https://.*"
                    disabled={isBusy}
                    required
                  />
                  {isEditing && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={resetFileData}
                      disabled={isBusy}
                    >
                      Cancel Edit
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant={isEditing ? "warning" : "primary"}
                    className="fw-bold d-flex align-items-center gap-1 px-3"
                    disabled={isBusy}
                  >
                    {isSavingFile ? (
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
                      {isSavingFile
                        ? "Saving..."
                        : isEditing
                          ? "Save Changes"
                          : "Add File"}
                    </span>
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* FILA 3: Lista de Documentos Agregados */}
        <div className="pt-3 border-top">
          <div className="fw-bold text-secondary small text-uppercase mb-2">
            Files added ({filesList.length})
          </div>

          {filesList.length === 0 ? (
            <div className="text-center text-muted small py-3 bg-light rounded border border-dashed">
              Not files added yet.
            </div>
          ) : (
            <div
              className="d-flex flex-column gap-2"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {filesList.map((file) => (
                <div
                  key={file.temporalId}
                  className="d-flex align-items-center justify-content-between p-2 bg-white border rounded shadow-sm"
                >
                  {/* Información del archivo */}
                  <div className="d-flex align-items-center gap-2 text-truncate me-2">
                    <span className="badge bg-secondary-subtle text-secondary small">
                      {file.docType}
                    </span>
                    <span
                      className="fw-semibold text-dark small text-truncate"
                      title={file.customName}
                    >
                      {file.customName}
                    </span>
                    <a
                      href={file.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-success d-flex align-items-center"
                      title="Open Google Drive file"
                    >
                      <FaGoogleDrive size={14} />
                    </a>
                  </div>

                  {/* Botones de Acción (Modificar / Eliminar) */}
                  <div className="d-flex gap-1">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="p-1 px-2 border-0"
                      onClick={() => handleEdit(file.temporalId)}
                      disabled={isBusy}
                      title="Edit"
                    >
                      <FaEdit size={13} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="p-1 px-2 border-0"
                      onClick={() => handleDelete(file)}
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

export default FilesModal;
