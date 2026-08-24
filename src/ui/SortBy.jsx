import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchparams] = useSearchParams();
  const sortBy = searchParams.get("SORTbY") || "";

  function handleChange(e) {
    searchParams.set("SORTbY", e.target.value);
    setSearchparams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
