import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

// import { useDeleteBooking } from "features/bookings/useDeleteBooking";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
// import { useCheckout } from "features/check-in-out/useCheckout";
import { format, isToday } from "date-fns";
import { HiEye } from "react-icons/hi";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "./../../ui/Modal";
import ConfirmDelete from "./../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

/*eslint-disable*/
function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guest: { email, fullName: guestName },
    cabins: { name: cabinName },
  },
}) {
  const { checkout, isLoading: isCheckingOut } = useCheckout();

  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const navigate = useNavigate();

  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabbled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
/*eslint-disable*/

export default BookingRow;
