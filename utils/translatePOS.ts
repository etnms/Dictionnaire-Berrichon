export default function translatePOS(input: string) {
  switch (input) {
    case "noun":
      return "nom";
    case "verb":
      return "verbe";
    case "pronoun":
      return "pronom";
    case "adjective":
      return "adjectif";
    case "adverb":
      return "adverbe";
    case "interjection":
      return "interjection";
    case "preposition":
      return "préposition";
    case "conjuction":
      return "conjonction";
    default:
      return null;
  }
}
