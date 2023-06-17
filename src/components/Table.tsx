/* eslint-disable @typescript-eslint/no-explicit-any */
interface Item {
  label: string;
  width: number;
  translated?: string;
}

interface TableProps {
  headers: Item[];
  children?: any;
}

const header = (items: Item[]) => {
  return items.map((item: Item, index: number) => (
    <th className={`px-6 py-4 bg-slate-400 border-2 border-black`} scope="col" key={index}>
      {item.label}
    </th>
  ));
};

export const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="relative justify-center w-full overflow-x-auto ">
      <table className="text-sm min-w-full text-left table-fixed text-blue-700-color ">
        <thead>
          <tr>{header(headers)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
