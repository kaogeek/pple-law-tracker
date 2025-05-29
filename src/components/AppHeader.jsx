import "./AppHeader.css";
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className="app-header">
      <div className="flex items-center justify-between w-full px-4">
        <img className="app-header-logo" alt="pple-logo" src="/images/pple-logo.png" />
        <nav className="flex gap-4">
          <Link to="/" className="text-white hover:text-gray-200">กฎหมายทั่วไป</Link>
          <Link to="/local" className="text-white hover:text-gray-200">กฎหมายท้องถิ่น</Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
