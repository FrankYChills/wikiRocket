import getWikiResults from "@/lib/getWikiResults";

type SearchPageProps = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({
  params: { searchTerm },
}: SearchPageProps) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const displayTerm = searchTerm.replaceAll("%20", " ");
  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found!`,
    };
  }
  return {
    title: displayTerm,
    description: `Search result for ${displayTerm}`,
  };
}

const SearchPage = async ({ params: { searchTerm } }: SearchPageProps) => {
  // dedups req
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => {
          return <p>{JSON.stringify(result)}</p>;
        })
      ) : (
        <h2 className="p-2 text-xl">`${searchTerm} Not Found`</h2>
      )}
    </main>
  );

  return content;
};

export default SearchPage;
