import React from "react";

type Reference = {
  author: string;
  date: string;
  title: string;
  link?: string;
  editor?: string;
};

const Reference: React.FC<Reference> = ({
  author,
  date,
  title,
  editor,
  link,
}) => {
  console.log(editor);
  return (
    <li className="p-2">
      {author}({date}). <em>{title}.</em>{" "}
      {editor !== undefined && editor !== "" ? `${editor}.` : ""}
      {link !== undefined && link !== "" ? (
        <a
          href={`${link}`}
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          {link}
        </a>
      ) : null}
    </li>
  );
};

export default Reference;
