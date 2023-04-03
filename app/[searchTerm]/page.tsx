type SearchPageProps = {
  params: {
    searchTerm: string;
  };
};

const SearchPage = ({ params: { searchTerm } }: SearchPageProps) => {
  return <div>SearchPage</div>;
};

export default SearchPage;
