export const Books = () => {
  return (
    <div className="p-[20px]">
      {/* Section Header */}
      <div className="section_header text-center">
        <p className="text capitalize italic mb--1">Recently added books</p>
        <h1 className="sction_title  font-bold text-5xl capitalize mb-2">
          New Arrivels
        </h1>
        <div className="w-[200px] h-[5px] bg-[#131921] mx-auto mb-2 rounded-full"></div>
      </div>
      {/* Section Body */}
      <section className="">
        <div className="container p-[30px] mx-auto">
          <div className="flex flex-wrap -m-4">
            {[1, 2, 3, 4, 5].map((item, i) => (
              <div key={i} className="p-4 md:w-1/2">
                <div className="card lg:card-side bg-base-100 box_shadow p-2">
                  <figure>
                    <img
                      className="object-contain m-auto h-[200px] w-[300px]  "
                      src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                      alt="Album"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Listen</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
