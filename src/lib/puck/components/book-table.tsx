import { ComponentConfig } from "@measured/puck";

interface DetailItem {
  label: string;
  value: string | number;
}

interface BookTableProps {
  title: string;
  cells: DetailItem[];
}

function ProductDetailsTable({ title, cells }: BookTableProps) {
  return (
    <div className="overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="border border-gray-200 rounded-md">
        <table className="w-full text-sm">
          <tbody>
            {cells.map((item, index) => (
              <tr key={index} className="flex flex-col sm:table-row border-b last:border-b-0 border-gray-200">
                <td className="bg-gray-100 text-gray-700 py-4 px-3 font-medium w-full sm:w-1/4 break-words">
                  {item.label}
                </td>
                <td className="py-4 px-3 w-full sm:w-3/4 break-words">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const bookTableConfig: ComponentConfig<BookTableProps> = {
  fields: {
    title: {
      type: "text",
    },
    cells: {
      type: "array",
      arrayFields: {
        label: {
          type: "text",
        },
        value: {
          type: "text",
        },
      },
    },
  },
  defaultProps: {
    title: "Product Details",
    cells: [
      { label: "Book Name", value: "Cracking the coding interview" },
      { label: "Book Name", value: "Cracking the coding interview" },
      { label: "Book Name", value: "Cracking the coding interview" },
      { label: "Book Name", value: "Cracking the coding interview" },
      { label: "Book Name", value: "Cracking the coding interview" },
      { label: "Book Name", value: "Cracking the coding interview" },
    ],
  },
  render: ({ cells, title }) => <ProductDetailsTable title={title} cells={cells} />,
};
