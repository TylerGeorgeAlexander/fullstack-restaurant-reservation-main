export default function TablesTable({ tables }) {
  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Table ID #</th>
          <th scope="col">Table Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Free?</th>
          <th scope="col">Button</th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => {
          return (
            <tr>
              <th scope="row">{table.table_id}</th>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td>{table.reservation_id || "Free"}</td>
              <td>
                {!table.reservation_id || (
                  <button>
                    Finish
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
