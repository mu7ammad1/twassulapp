"use client";

import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get("post");
  const values = [1, 2, 3, 4, 5]; // Example values to filter

  // Filter `values` based on `search`
  const filteredValues = values.filter(item => 
    search ? item.toString().includes(search) : true
  );

  return (
    <div>
      <p>Search: {search}</p>
      <div>
        {filteredValues.length > 0 ? (
          filteredValues.map(value => <div key={value}>Value: {value}</div>)
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
