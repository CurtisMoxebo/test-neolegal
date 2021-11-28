import { useParams } from "react-router-dom";
import { useState } from "react";

const Merci = () => {
  const { name: nameParams } = useParams();
  const [ name, setName ] = useState(nameParams);

  return (
    <div>
      { name }
    </div>
  );
}

export default Merci;