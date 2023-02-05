const Header = ({course}) => (
  <h2>{course}</h2>
)

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts } ) => (
  parts.map( (part, idx) => 
    <Part key={idx} name={part.name} exercises={part.exercises}/>)
)

const calculateTotal = (parts) => (
  parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b, 0)
)

const Total = ({ total }) => (
  <p><strong>total of {total} exercises</strong></p>
)

const Course = ({ course }) => (
  <>
    <h1>Web development curriculum</h1>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total total={calculateTotal(course.parts)}/>
  </>
)

export default Course
