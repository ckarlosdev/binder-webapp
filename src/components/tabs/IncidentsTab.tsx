import { Button } from "react-bootstrap";
import { useIncidentStore } from "../../stores/useIndicentsStore";
import useEmployees from "../../hooks/useEmployees";
import { FaExclamationCircle } from "react-icons/fa";
import type { Job } from "../../types";
import { getIncidentsbyJobId } from "../../hooks/useWorkSpace";
import { useEffect } from "react";
import { format } from "date-fns";

type Props = { job?: Job };

function IncidentsTab({ job }: Props) {
  const { setShowModal, incidentList, setFullData } = useIncidentStore();
  const { data: employees } = useEmployees();
  const {
    data: incidents,
    isLoading,
    error,
  } = getIncidentsbyJobId(job?.jobsId!!);

  useEffect(() => {
    if (incidents) {
      setFullData(incidents);
    }
  }, [incidents]);

  const getDateFormat = (dateString: string) => {
    const parts = dateString.split("T")[0].split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const localDateObject = new Date(year, month, day);

    const formattedDate = format(localDateObject, "MM/dd/yyyy");
    return formattedDate;
  };

  if (isLoading) return <div>...Loading files</div>;
  if (error) return <div className="bg-white border border-top-0 rounded-bottom p-4 shadow-sm">No incidents added.</div>;

  return (
    <div className="bg-white border border-top-0 rounded-bottom p-4 shadow-sm">
      {/* Cabecera Minimalista */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6
          className="text-secondary fw-bold m-0 text-uppercase tracking-wider"
          style={{ fontSize: "0.7rem" }}
        >
          Incident Added
        </h6>
        <Button
          variant="outline-primary"
          className="fw-semibold btn-sm px-3 rounded-pill d-flex align-items-center gap-1"
          onClick={() => setShowModal(true)}
        >
          <span>+ Add incident</span>
        </Button>
      </div>

      {/* Lista */}
      {incidentList.length === 0 ? (
        <div className="text-center text-muted small py-4 bg-light rounded border border-dashed">
          No incidents recorded.
        </div>
      ) : (
        <div
          className="d-flex flex-column gap-2"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {incidentList.map((incident) => {
            const emp = employees?.find(
              (e) => e.employeesId === incident.employeeId,
            );
            const employeeName = emp
              ? `${emp.firstName} ${emp.lastName}`
              : `Employee #${incident.employeeId}`;
            const isOther = incident.incType === "Other";

            return (
              <div
                key={incident.temporalId}
                className="d-flex align-items-start gap-3 p-3 bg-white border rounded hover-bg-light transition-all"
                style={{ fontSize: "0.85rem" }}
              >
                {/* Icono de estado decorativo y minimalista */}
                <div className="text-danger mt-0.5flex-shrink-0">
                  <FaExclamationCircle size={15} />
                </div>

                {/* Contenido Principal */}
                <div className="d-flex flex-column flex-grow-1 min-w-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-1">
                    {/* Tipo de incidente + Empleado */}
                    <span className="text-dark">
                      <strong className="fw-semibold text-dark">
                        {isOther ? incident.customName : incident.incType}
                      </strong>
                      <span className="text-secondary"> added to </span>
                      <span className="fw-medium text-dark">
                        {employeeName}
                      </span>
                    </span>

                    {/* Fecha compacta estilo Badge neutro */}
                    <span
                      className="badge bg-light text-secondary border fw-normal px-2 py-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {getDateFormat(incident.date)}
                    </span>
                  </div>

                  {/* Comentario en bloque separado, simulando una cita o nota sutil */}
                  {incident.comment && (
                    <div
                      className="text-muted border-start ps-2 mt-1 text-truncate"
                      style={{
                        fontSize: "0.8rem",
                        borderColor: "#dee2e6 !important",
                      }}
                    >
                      {incident.comment}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default IncidentsTab;
