import { Button } from "react-bootstrap";
import useChangeOrder from "../../hooks/useChangeOrder";
import { useAuthStore } from "../../hooks/authStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { MdOutlineAddAPhoto } from "react-icons/md";
import type { ChangeOrder } from "../../types";
import useEmployees from "../../hooks/useEmployees";
import { renderStatusBadge } from "../../utils/badge";
import "../../styles/tables.css";
import Pager from "../Pager";
import { MobileCard, MobileCardList, MobileCardRow } from "../MobileCard";

type Props = { jobNumber?: string; jobId?: number };

function ChangeOrderTable({ jobNumber, jobId }: Props) {
  const [ordersDetail, setOrdersDetail] = useState<ChangeOrder[]>();
  const { data: changeOrders, isLoading, error } = useChangeOrder(jobId!!);
  const { data: employees } = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userAuth } = useAuthStore();

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersDetail?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((ordersDetail ?? []).length / itemsPerPage);

  useEffect(() => {
    if (changeOrders) {
      const data = changeOrders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
      );
      setOrdersDetail(data);
    }
  }, [changeOrders]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getDateFormat = (dateString: string) => {
    const parts = dateString.split("T")[0].split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const localDateObject = new Date(year, month, day);

    const formattedDate = format(localDateObject, "MM/dd/yyyy");
    return formattedDate;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading change orders.</div>;
  }

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  const getForemanName = (order: ChangeOrder) => {
    const employee = employees?.find(
      (emp) => emp.employeesId === order.employeeId,
    );
    return employee?.firstName + " " + employee?.lastName;
  };

  const photosUrl = (order: ChangeOrder) =>
    `https://script.google.com/a/macros/hmbrandt.com/s/AKfycbyAEL6qmN19RBHgWQMIKSKRZo4yrRYgxoHH4QC6XykO5xTmdtfBGrE7FmLtQL-6sD39/exec?jobNumber=${jobNumber}&reportType=Change-Order&date=${order.orderDate}&drId=${order.id}`;

  const orderUrl = (order: ChangeOrder) =>
    `https://ckarlosdev.github.io/change-order/?jobId=${jobId}&changeOrderId=${order.id}`;

  return (
    <div>
      {/* Tablet y computadora */}
      <div className="d-none d-md-block custom-table-container table-responsive">
        <table className="table table-hover table-striped table-sm align-middle">
          <thead className="table-primary" style={{ textAlign: "center" }}>
            <tr>
              <th style={{ color: "#0c63e4" }}>ID</th>
              <th style={{ color: "#0c63e4" }}>Status</th>
              <th style={{ color: "#0c63e4" }}>Date</th>
              <th style={{ color: "#0c63e4" }}>Foreman</th>
              <th style={{ color: "#0c63e4" }}>Photos</th>
              <th style={{ color: "#0c63e4" }}>Update</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentItems?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{renderStatusBadge(order.orderStatus)}</td>
                <td>{getDateFormat(order.orderDate)}</td>
                <td>{getForemanName(order)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    as="a"
                    style={{ fontWeight: "bold" }}
                    href={photosUrl(order)}
                    target="_self"
                  >
                    <MdOutlineAddAPhoto />
                  </Button>
                </td>
                <td>
                  <a href={orderUrl(order)} target="_self">
                    <Button
                      variant="outline-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      {isAuthorized ? "Update" : "View"}
                    </Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Celular */}
      <MobileCardList
        isEmpty={!currentItems?.length}
        emptyText="No change orders yet."
      >
        {currentItems?.map((order) => (
          <MobileCard
            key={order.id}
            title={<>Change Order #{order.id}</>}
            badge={renderStatusBadge(order.orderStatus)}
            actions={
              <>
                <Button
                  variant="outline-primary"
                  as="a"
                  href={photosUrl(order)}
                  target="_self"
                >
                  <MdOutlineAddAPhoto /> Photos
                </Button>
                <Button
                  variant="primary"
                  as="a"
                  href={orderUrl(order)}
                  target="_self"
                >
                  {isAuthorized ? "Update" : "View"}
                </Button>
              </>
            }
          >
            <MobileCardRow label="Date">
              {getDateFormat(order.orderDate)}
            </MobileCardRow>
            <MobileCardRow label="Foreman">{getForemanName(order)}</MobileCardRow>
          </MobileCard>
        ))}
      </MobileCardList>

      <Pager
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ChangeOrderTable;
