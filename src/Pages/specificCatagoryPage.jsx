import { useParams } from 'react-router-dom'

function SpecificCatagoryPage() {
  const { category } = useParams();
  return (
    <div>category: {category}</div>
  )
}

export default SpecificCatagoryPage

//useParams tab use hota hai jab hum ek chaize pe click karenge to uske liye ek specific data fetch karna ho and wahi agar uske jaise hi dusre pe click karenge to uske liye ek specific data fetch karna ho

