import React from 'react';
import LocalLawsTable from './LocalLawsTable';
import ScrollToTopButton from './ScrollToTopButton';

function LocalLaws() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">กฎหมายท้องถิ่น</h1>
      <LocalLawsTable />
      <ScrollToTopButton />
    </div>
  );
}

export default LocalLaws; 