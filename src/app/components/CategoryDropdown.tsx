'use client';

import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  'Home',
  'Personal',
  'Emi',
  'Sip/Investment',
  'Office',
  'Medical',
  'Travel/Petrol',
];

export default function CategoryDropdown({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded p-2"
      required
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
