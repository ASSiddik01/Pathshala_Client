import { useParams } from "react-router-dom";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { useGetBookQuery } from "../redux/features/book/bookApi";
import Loading from "../components/Loading";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  const book = data?.data;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head title="Books ||" />
      <div className="">
        <BreadCrumb title="All Books" />
        <div className="body_wrapper ">
          <div className="flex gap-[20px] layout p-[20px]">
            <div className="p-4 w-full">
              <div className="card md:min-h-[300px] md:items-start lg:card-side bg-base-100 box_shadow p-2">
                <figure className="md:w-[40%]">
                  <img
                    className="object-contain m-auto h-[400px] w-[400px]  "
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
                    <li className="info">
                      <span className="font-bold">About Book: </span>
                      {book?.desc}
                    </li>
                  </ul>
                  <div className="card-actions">
                    <button
                      //   onClick={() => navigate(`/books/${book?._id}`)}
                      className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                    >
                      Show Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
