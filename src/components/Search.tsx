import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

type Props = {
  onChange: (value: string) => void;
};

function Search({ onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px",
        gap: "15px",
      }}
    >
      <FaSearch
        style={{ color: "rgb(165 165 165)", marginTop: "5px" }}
        size={25}
      />
      <Form.Control
        type="text"
        id="inputSearch"
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "300px", fontWeight: "bold" }}
      />
    </div>
  );
}

export default Search;
