import Select from "./Select";
import { useSearchParams } from "react-router-dom";

/*eslint-disable*/

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortedValue = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      onChange={handleChange}
      value={sortedValue}
      options={options}
      type="white"
    />
  );
}

/*eslint-disable*/

export default SortBy;
