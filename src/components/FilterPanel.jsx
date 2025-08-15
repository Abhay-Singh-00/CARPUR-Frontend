import React from 'react';
import Select from 'react-select';
import { FaCar, FaGasPump, FaUsers, FaRupeeSign, FaSortAmountDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const brandOptions = [
  { value: '', label: 'All Brands' },
  { value: 'Tata', label: 'Tata' },
  { value: 'Maruti', label: 'Maruti' },
  { value: 'Hyundai', label: 'Hyundai' },
  { value: 'Mahindra', label: 'Mahindra' },
  { value: 'Kia', label: 'Kia' },
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Honda', label: 'Honda' },
];

const fuelOptions = [
  { value: '', label: 'All Fuels' },
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
];

const sortOptions = [
  { value: '', label: 'None' },
  { value: 'low', label: 'Low to High' },
  { value: 'high', label: 'High to Low' },
];

const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-color)',
    borderColor: 'var(--card-border)',
    borderRadius: '0.5rem',
    boxShadow: 'none',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-color)',
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--card-color)' : 'var(--input-bg)',
    color: 'var(--text-color)',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--text-color)',
  }),
  input: (base) => ({
    ...base,
    color: 'var(--text-color)',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--text-color)',
  }),
};

function FilterPanel({ filters, setFilters, setSort }) {
  const handleSelectChange = (selected, { name }) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selected ? selected.value : '',
    }));
  };

  const handleInputChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-1/4 p-4 rounded-2xl shadow-md space-y-6 relative z-50"
      style={{
        backgroundColor: 'var(--card-color)',
        color: 'var(--text-color)',
        border: '1px solid var(--card-border)',
      }}
    >
      
      <div>
        <label className="flex items-center gap-2 font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
          <FaCar /> Brand
        </label>
        <Select
          name="brand"
          value={brandOptions.find((opt) => opt.value === filters.brand)}
          onChange={handleSelectChange}
          options={brandOptions}
          styles={customSelectStyles}
          isClearable={true}
        />
      </div>

      
      <div>
        <label className="flex items-center gap-2 font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
          <FaGasPump /> Fuel Type
        </label>
        <Select
          name="fuel"
          value={fuelOptions.find((opt) => opt.value === filters.fuel)}
          onChange={handleSelectChange}
          options={fuelOptions}
          styles={customSelectStyles}
          isClearable={true}
        />
      </div>

      
      <div>
        <label className="flex items-center gap-2 font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
          <FaUsers /> Seating Capacity
        </label>
        <select
          name="seating"
          value={filters.seating}
          onChange={handleInputChange}
          className="w-full p-2 rounded-lg border"
          style={{
            backgroundColor: 'var(--input-bg)',
            color: 'var(--text-color)',
            borderColor: 'var(--card-border)',
          }}
        >
          <option value="">Any</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="7">7</option>
        </select>
      </div>

      
      <div>
        <label className="flex items-center gap-2 font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
          <FaRupeeSign /> Price Range
        </label>
        <input
          type="range"
          name="price"
          min="100000"
          max="5000000"
          step="50000"
          value={filters.price}
          onChange={handleInputChange}
          className="w-full accent-blue-500"
        />
        <p className="text-sm mt-1" style={{ color: 'var(--text-color)' }}>
          Price under: <span className="font-semibold">₹{filters.price || 'Any'}</span>
        </p>
      </div>

      
      <div>
        <label className="flex items-center gap-2 font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
          <FaSortAmountDown /> Sort by Price
        </label>
        <Select
          name="sort"
          onChange={(selected) => setSort(selected ? selected.value : '')}
          options={sortOptions}
          styles={customSelectStyles}
          isClearable={true}
        />
      </div>
    </motion.div>
  );
}

export default FilterPanel;