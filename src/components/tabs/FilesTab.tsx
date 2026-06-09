import { Button } from "react-bootstrap";
import { FaGoogleDrive } from "react-icons/fa";
import { useOthersStore } from "../../stores/useOthersStore";
import { useAuthStore } from "../../hooks/authStore";
import { getFilesbyJobId } from "../../hooks/useWorkSpace";
import type { Job } from "../../types";
import { useEffect } from "react";

type Props = {
  job?: Job;
};

function FilesTab({ job }: Props) {
  const { setShowModal, filesList, setFullData } = useOthersStore();
  const {
    data: storedFiles,
    isLoading,
    error,
  } = getFilesbyJobId(job?.jobsId!!);
  const { user: userAuth } = useAuthStore();

  useEffect(() => {
    if (storedFiles) {
      setFullData(storedFiles);
    }
  }, [storedFiles]);

  const isAuthorized = userAuth?.roles?.some(
    (role) => role.name === "ROLE_OPERATION" || role.name === "ROLE_ADMIN",
  );

  if (isLoading) return <div>...Loading files</div>;
  if (error)
    return (
      <div className="bg-white border border-top-0 rounded-bottom p-4 shadow-sm">
        No files added.
      </div>
    );

  return (
    <div className="bg-white border border-top-0 rounded-bottom p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6
          className="text-secondary fw-bold m-0 text-uppercase tracking-wider"
          style={{ fontSize: "0.75rem" }}
        >
          Attached Files
        </h6>
        <Button
          variant="outline-primary"
          className="fw-semibold btn-sm px-2.5 rounded-pill"
          onClick={() => setShowModal(true)}
          disabled={!isAuthorized}
        >
          + Add Files
        </Button>
      </div>

      {/* Estado Vacío */}
      {filesList.length === 0 ? (
        <div
          className="text-center text-muted small py-2 bg-light rounded border border-dashed"
          style={{ fontSize: "0.8rem" }}
        >
          No files.
        </div>
      ) : (
        /* Contenedor de Chips */
        <div
          className="d-flex flex-wrap gap-2 pe-1"
          style={{ maxHeight: "120px", overflowY: "auto" }}
        >
          {filesList.map((file) => (
            <a
              key={file.temporalId}
              href={file.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="d-flex align-items-center gap-2 px-2.5 py-1.5 bg-light border rounded-pill text-decoration-none text-dark shadow-2xs hover-bg-white transition-all"
              title={`Open ${file.customName}`}
              /* minWidth: 0 es el truco clave para que text-truncate funcione bien en Flexbox */
              style={{ maxWidth: "220px", minWidth: "0" }}
            >
              {/* Icono de Drive - flex-shrink-0 evita que se aplaste */}
              <span
                className="text-success d-flex align-items-center flex-shrink-0"
                style={{ fontSize: "0.62rem", marginLeft: "7px" }}
              >
                <FaGoogleDrive size={14} />
              </span>

              {/* Nombre del archivo - El text-truncate ahora sí respetará el espacio */}
              <span
                className="fw-medium text-truncate small"
                style={{ fontSize: "0.78rem", fontWeight: "bold" }}
              >
                {file.docType}
              </span>

              {/* Tipo de documento - flex-shrink-0 evita que desaparezca */}
              <span
                className="text-muted fw-bold small flex-shrink-0"
                style={{ fontSize: "0.62rem", marginRight: "7px" }}
              >
                • {file.customName || "DOC"}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilesTab;
