import { Helmet, HelmetProvider } from "react-helmet-async";

interface IProps {
  title: string;
}

export default function Head({ title }: IProps) {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} Pathshala</title>
      </Helmet>
    </HelmetProvider>
  );
}
