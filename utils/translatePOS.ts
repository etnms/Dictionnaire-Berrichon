export default function translatePOS(input: string) {
  switch (input) {
    case "noun":
      return "nom";
    case "verb":
      return "verbe";
    default:
      return null;
  }
}
