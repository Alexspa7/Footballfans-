import matches from "./matches.json";

export default function handler(req, res) {
  res.status(200).json(matches);
}
