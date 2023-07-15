import { useAppSelector } from "../redux/hooks";

export default function BookList() {
  const { books } = useAppSelector((state) => state.book);
  console.log(books);
  return (
    <section className="">
      <div className="container md:py-[30px] pb-[30px]  mx-auto">
        <div className="flex flex-wrap -m-4">
          {books?.map((book, i) => (
            <div key={i} className="p-4 w-full md:w-1/2">
              <div className="card md:min-h-[300px] md:items-center lg:card-side bg-base-100 box_shadow p-2">
                <figure className="md:w-[40%]">
                  <img
                    className="object-contain m-auto h-[200px] w-[200px]  "
                    src={book?.bookImgUrl}
                    alt="Album"
                  />
                </figure>
                <div className="md:w-[60%] card-body md:flex justify-center">
                  <h2 className="card-title capitalize ">{book?.title}</h2>
                  <ul className="info_list">
                    <li className="info">
                      {" "}
                      <span className="font-bold">Genre: </span>
                      {book?.genre}
                    </li>
                    <li className="info">
                      <span className="font-bold">Author: </span>
                      {book?.genre} {book?.author}
                    </li>
                    <li className="info">
                      <span className="font-bold">Published At: </span>
                      {book?.publishedDate}
                    </li>
                  </ul>
                  <div className="card-actions">
                    <button className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium ">
                      Show Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
