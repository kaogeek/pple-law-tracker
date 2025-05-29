import "./AppHeader.css";
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className="app-header">
      <div className="flex items-center justify-between w-full px-4">
        <Link to="/">
          <img className="app-header-logo" alt="pple-logo" src="/images/pple-logo.png" />
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-black hover:text-orange-600 text-sm md:text-md">กฎหมายระดับชาติ</Link>
          <Link to="/local" className="text-black hover:text-orange-600 text-sm md:text-md">กฎหมายท้องถิ่น</Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
