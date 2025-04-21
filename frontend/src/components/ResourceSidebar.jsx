import React from "react";

const ResourceSidebar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  categoryOptions,
}) => {
  return (
    <div className="w-full md:w-64 bg-white p-4 border-r border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-seagreen">Filters</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-seagreen focus:border-seagreen text-sm"
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-seagreen focus:border-seagreen text-sm"
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resource Type
        </label>
        <div className="space-y-2 text-sm">
          <div>
            <input
              type="radio"
              id="all"
              name="type"
              value="all"
              checked={selectedType === "all"}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="all">All</label>
          </div>
          <div>
            <input
              type="radio"
              id="free"
              name="type"
              value="FREE"
              checked={selectedType === "FREE"}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="free">Free</label>
          </div>
          <div>
            <input
              type="radio"
              id="paid"
              name="type"
              value="PAID"
              checked={selectedType === "PAID"}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="paid">Paid</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSidebar;
