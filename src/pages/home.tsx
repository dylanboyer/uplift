import { Link } from "react-router-dom";
export default function Home() {

  return (
    <div>This is home!
      <h1><Link to="/login">LOGIN</Link></h1>
      <h1><Link to="/signup">SIGN UP</Link></h1>
    </div>
  )
}
