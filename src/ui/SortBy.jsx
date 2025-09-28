import { useSearchParams } from "react-router-dom";
import Select from "./Select";

// eslint-disable-next-line react/prop-types
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line react/prop-types
  const currentSortBy = searchParams.get("sortBy") || options.at(0).value;

  function handleChange(e) {
    const value = e.target.value;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return <Select options={options} value={currentSortBy} onChange={handleChange} type="white" />;
}

export default SortBy;
