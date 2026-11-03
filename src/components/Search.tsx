import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

type Props = {
  onChange: (value: string) => void;
};

function Search({ onChange }: Props) {
  return (
    <div className="app-search">
      <InputGroup>
        <InputGroup.Text className="bg-white" style={{ color: "rgb(165 165 165)" }}>
          <FaSearch size={18} />
        </InputGroup.Text>
        <Form.Control
          type="search"
          id="inputSearch"
          placeholder="Search jobs..."
          aria-label="Search jobs"
          onChange={(e) => onChange(e.target.value)}
          style={{ fontWeight: "bold" }}
        />
      </InputGroup>
    </div>
  );
}

export default Search;
