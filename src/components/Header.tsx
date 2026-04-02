import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <h1>header</h1>
      <Link to="/transacoes">Transações</Link>
    </div>
  )
}

export default Header;