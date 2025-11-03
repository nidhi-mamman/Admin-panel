import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
        <Link to='/admin'>Admin</Link>
        <Link to='/staff'>Staff</Link>
        <Link to='/student'>Students</Link>
      </div>
    </>
  );
}
