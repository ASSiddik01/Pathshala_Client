export default function BooksSidebar() {
  return (
    <div>
      <div className="byfilter filter_card bg-white p-[20px] rounded-xl box_shadow">
        <h4 className="filter_title capitalize">Filter By</h4>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Filter Name</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="link-checkbox" className="ml-2 ">
                  option
                </label>
              </div>
            </li>
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="link-checkbox" className="ml-2 ">
                  option
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
