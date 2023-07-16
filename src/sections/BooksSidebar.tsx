import { useAppSelector } from "../redux/hooks";

export default function BooksSidebar() {
  const { books } = useAppSelector((state) => state.book);

  const genres = books ? [...new Set(books.map((book) => book?.genre))] : [];
  const publicationYear = books
    ? [...new Set(books.map((book) => book?.publishedDate))]
    : [];

  return (
    <div>
      <div className="byfilter filter_card bg-white p-[20px] rounded-xl box_shadow">
        <h4 className="filter_title capitalize">Filter Options</h4>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">By Genere Name</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              {genres?.map((genre, i) => (
                <div key={i} className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="link-checkbox" className="ml-2 ">
                    {genre}
                  </label>
                </div>
              ))}
            </li>
          </ul>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">By Published Year</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              {publicationYear?.map((year, i) => (
                <div key={i} className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="link-checkbox" className="ml-2 ">
                    {year.split("-")[0]}
                  </label>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
