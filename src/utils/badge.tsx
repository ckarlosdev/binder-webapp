import { Badge } from "react-bootstrap";

export const renderStatusBadge = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "DRAFT":
      return (
        <Badge
          bg="warning"
          text="dark"
          className="px-2 py-1 rounded-pill fw-semibold"
        >
          Draft
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge bg="info" className="px-2 py-1 rounded-pill fw-semibold">
          Approved
        </Badge>
      );
    case "FINALIZED":
      return (
        <Badge bg="success" className="px-2 py-1 rounded-pill fw-semibold">
          Finalized
        </Badge>
      );
    default:
      return (
        <Badge bg="secondary" className="px-2 py-1 rounded-pill fw-semibold">
          {status || "Unknown"}
        </Badge>
      );
  }
};
