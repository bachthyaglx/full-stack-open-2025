import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em>
        </p>
      );

    case "group":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          Group projects: {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Background: <a href={part.backgroundMaterial} target="_blank" rel="noopener noreferrer">{part.backgroundMaterial}</a>
        </p>
      );

    case "special":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Required skills: {part.requirements.join(", ")}
        </p>
      );

    default:
      return null; // TypeScript ensures all cases are handled
  }
};

export default Part;
