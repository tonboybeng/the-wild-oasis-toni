import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  // 1. Filter cabins
  let filteredCabins;

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins.length) {
    return <Empty resourceName="cabins" />;
  }

  if (filterValue === "all") {
    filteredCabins = cabins;
  }

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2. Sort filtered cabins
  let sortedCabins;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [sortField, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  sortedCabins = filteredCabins.toSorted((a, b) => (a[sortField] - b[sortField]) * modifier);

  // if (sortBy === "name-asc") {
  //   sortedCabins = filteredCabins.toSorted((a, b) => a.name.localeCompare(b.name));
  // }

  // if (sortBy === "name-desc") {
  //   sortedCabins = filteredCabins.toSorted((a, b) => b.name.localeCompare(a.name));
  // }

  // if (sortBy === "regularPrice-asc") {
  //   sortedCabins = filteredCabins.toSorted((a, b) => a.regularPrice - b.regularPrice);
  // }

  // if (sortBy === "regularPrice-desc") {
  //   sortedCabins = filteredCabins.toSorted((a, b) => b.regularPrice - a.regularPrice);
  // }

  // if (sortBy === "maxCapacity-asc") {
  //   sortedCabins = filteredCabins.toSorted((a, b) => a.maxCapacity - b.maxCapacity);
  // }

  // if (sortBy === "maxCapacity-desc") {
  //   sortedCabins = filteredCabins.toSorted((a, b) => b.maxCapacity - a.maxCapacity);
  // }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  );
}

export default CabinTable;
