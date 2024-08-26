const CourseTable = ({ columns, tableData }: TCourseTableProp) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right grid">
      <thead className="text-xs text-gray-700 uppercase font-medium">
        <tr className="flex border-b">
          {columns.map((column, id) => (
            <th key={id} scope="col" className={`${column.className}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, id) => (
          <tr key={id} className="border-b last:border-none flex">
            {columns.map((col, idx) => (
              <td key={idx} className={`${col.className}`}>
                {col.formatter !== undefined
                  ? col.formatter(data, id)
                  : data[`${col.accessorKey}`]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type TCourseTableProp = {
  columns: TCoursColumnProp[]
  tableData: any[]
}

type TCoursColumnProp = {
  accessorKey: string
  header: string
  className?: string
  formatter?: (data: any, id?: string | number) => React.ReactNode
}

export default CourseTable
