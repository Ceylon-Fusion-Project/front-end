import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';

interface GridListViewProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

const GridListView: React.FC<GridListViewProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-sm ${
          viewMode === 'grid' ? 'bg-[#11221d] text-white' : 'bg-[#cde0e0] text-gray-700 hover:bg-[#81b3b3]'
        }`}
        aria-label="Grid view"
      >
        <FiGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-sm ${
          viewMode === 'list' ? 'bg-[#11221d] text-white' : 'bg-[#cde0e0] text-gray-700 hover:bg-[#81b3b3]'
        }`}
        aria-label="List view"
      >
        <FiList className="w-5 h-5" />
      </button>
    </div>
  );
};

export default GridListView;