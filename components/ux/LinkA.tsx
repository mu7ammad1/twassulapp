import Link from "next/link";

export default function LinkA({ params, id }: any) {
  // Check if params is a string before using replace method
  const formattedText =
    typeof params === "string"
      ? params
          .replace(/(?:\r\n|\r|\n)/g, "<br />")
          .replace(
            /#([a-zA-Z0-9\u0600-\u06FF]+)/g,
            '<a href="/hashtag/$1" class="text-blue-500">$1</a>'
          )
      : params; // If params is not a string, return it as is (or handle accordingly)

  return (
    <div
      className={`line-clamp-3 text-sm font-light text-right`}
      dir="auto"
    >
      <div
        dangerouslySetInnerHTML={{ __html: formattedText }}
        className={`line-clamp-3 text-sm font-light text-right`}
        dir="auto"
      ></div>
    </div>
  );
}
