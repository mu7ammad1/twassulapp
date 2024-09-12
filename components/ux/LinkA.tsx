export default function LinkA({ params }: any) {
  // Check if params is a string before using replace method
  const formattedText =
    typeof params === "string"
      ? params
          .replace(/(?:\r\n|\r|\n)/g, "<br />")
          .replace(
            /#([a-zA-Z0-9\u0600-\u06FF]+)/g,
            '<a href=`/hashtag/$1` class="text-blue-500">$1</a>'
          )
      : ""; // Return empty string if params is not a string
  const markup = { __html: formattedText };

  return (
    <div
      dangerouslySetInnerHTML={markup} // Correctly set the __html property
      className="line-clamp-3 text-sm font-light text-right"
      dir="auto"
    />
  );
}
