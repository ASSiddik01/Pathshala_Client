import { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import {
  useGetUserQuery,
  useMarkFinishedMutation,
} from "../redux/features/user/userApi";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";

export default function ReadList() {
  const { data } = useGetUserQuery(undefined);
  const books = data?.data?.readlist;
  const [markFinished, { isSuccess, data: markData, isError, error, reset }] =
    useMarkFinishedMutation();
  console.log(books);
  console.log(isSuccess, isError, markData, error);
  useEffect(() => {
    if (isSuccess) {
      toast(`${markData?.message}`);
      reset();
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
  }, [markData, error, isError, isSuccess, reset]);
  return (
    <>
      <Head title="Read Book List ||" />
      <BreadCrumb title="Read Book List " />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="container md:py-[30px] pb-[30px]  mx-auto">
            <div className="p-4">
              <h3 className="font-bold text-xl my-2">Total Listed Book</h3>
              <hr />
              {books?.map(
                (book: {
                  _id: string | undefined;
                  bookId: {
                    _id: string | undefined;
                    bookImgUrl: string | undefined;
                    title: string | undefined;
                  };
                  status: string | undefined;
                }) => (
                  <div
                    key={book._id}
                    className="flex gap-5 items-center mb-4 border-b my-2"
                  >
                    <div className="user_photo md:w-1/12 w-[80px]">
                      <img
                        className="rounded-full"
                        src={book?.bookId?.bookImgUrl}
                        alt=""
                      />
                    </div>
                    <div className="review_info w-9/12 border-x-2 px-2">
                      <h4 className="text-lg font-bold capitalize">
                        {book?.bookId?.title}
                      </h4>
                      <p className="italic text-gray-500">
                        Status : {book?.status}
                      </p>
                    </div>
                    <div className="status flex items-center justify-start">
                      {book.status !== "Finished" ? (
                        <button
                          onClick={() =>
                            markFinished({
                              data: {
                                bookId: book?.bookId?._id,
                                status: "Finished",
                              },
                            })
                          }
                          className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                        >
                          Mark as Finished
                        </button>
                      ) : (
                        <h2 className="text-green-700">Read Finished</h2>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
