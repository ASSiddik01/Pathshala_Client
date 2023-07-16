import { Link } from "react-router-dom";
import banner from "../assets/banner.png";

export default function Banner() {
  return (
    <>
      <Link to={"/books"}>
        <img className="object-contain" src={banner} alt="" />
      </Link>
    </>
  );
}
