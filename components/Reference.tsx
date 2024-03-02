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
    <li>
      {author}({date}). <em>{title}.</em>{" "}
      {editor !== undefined && editor !== "" ? `${editor}.` : ""}
      {link !== undefined && link !== "" ? (
        <a href={`${link}`}>{link}</a>
      ) : null}
    </li>
  );
};

export default Reference;
