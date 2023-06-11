/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptive extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescriptive {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescriptive {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescriptive {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface HeaderProps {
  courseName: string
}

const Header = ({ courseName }: HeaderProps) => (
  <h1>{ courseName }</h1>
);

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps) => (
  <>
    {
      parts.map((part, i) => <Part key={i} part={part} />)
    }
  </>
);

interface PartProps {
  part: CoursePart
}

const Part = ( { part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return <p>
        <b>{part.name} {part.exerciseCount} <br/></b>
        <i>{part.description} <br/></i>
      </p>
    case "group":
      return <p>
        <b>{part.name} {part.exerciseCount} <br/></b>
        project exercises {part.groupProjectCount} <br/>
      </p>
    case "background":
      return <p>
        <b>{part.name} {part.exerciseCount} <br/></b>
        <i>{part.description} <br/></i>
        {part.backgroundMaterial} <br/>
      </p>
    case "special":
      return <p>
        <b>{part.name} {part.exerciseCount} <br/></b>
        <i>{part.description} <br/></i>
        required skills: {part.requirements.join(", ")} <br/>
      </p>
    default:
      return assertNever(part);
  }
}

interface TotalProps {
  totalExericses: number
}

const Total = ({ totalExericses }: TotalProps) => (
  <p>
    Number of exercises{" "}
    {totalExericses}
  </p>
);


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total totalExericses={courseParts.reduce((s, part) => s + part.exerciseCount, 0)}/>
    </div>
  );
};

export default App;