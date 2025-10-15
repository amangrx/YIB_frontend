import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import Dropdown from "./Dropdown";

const FilterSidebar = ({
  isFilterOpen,
  setIsFilterOpen,
  workingFilters,
  setWorkingFilters,
  handleApplyFilters,
  handleResetFilters,
  categoryOptions,
}) => {
  const categoryDropdownOptions = categoryOptions.map((cat) => ({
    value: cat.value,
    label: cat.label,
  }));

  const typeOptions = [
    { value: "", label: "All Types" },
    { value: "FREE", label: "Free" },
    { value: "PAID", label: "Paid" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title-asc", label: "Title: A-Z" },
    { value: "title-desc", label: "Title: Z-A" },
  ];

  const handleCategorySelect = (option) => {
    setWorkingFilters({ ...workingFilters, category: option.value });
  };

  const handleTypeSelect = (option) => {
    setWorkingFilters({ ...workingFilters, type: option.value });
  };

  const handleSortSelect = (option) => {
    setWorkingFilters({ ...workingFilters, sortBy: option.value });
  };

  return (
    <div className={`${isFilterOpen ? "block" : "hidden"} lg:block lg:w-1/4`}>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 sticky top-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          {/* Category filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Dropdown
              options={[
                { value: "", label: "All Categories" },
                ...categoryDropdownOptions,
              ]}
              placeholder="Select Category"
              onSelect={handleCategorySelect}
            />
          </div>

          {/* Resource type filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resource Type
            </label>
            <Dropdown
              options={typeOptions}
              placeholder="Select Type"
              onSelect={handleTypeSelect}
            />
          </div>

          {/* Price range filter */}
          {(workingFilters.type === "PAID" || workingFilters.type === "") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  id="minPrice"
                  placeholder="Min"
                  value={workingFilters.minPrice}
                  onChange={(e) =>
                    setWorkingFilters({
                      ...workingFilters,
                      minPrice: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  id="maxPrice"
                  placeholder="Max"
                  value={workingFilters.maxPrice}
                  onChange={(e) =>
                    setWorkingFilters({
                      ...workingFilters,
                      maxPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Sort by */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <Dropdown
              options={sortOptions}
              placeholder="Select Sort Option"
              onSelect={handleSortSelect}
              selectedValue={workingFilters.sortBy}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="flex-1 w-full bg-seagreen hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded transition duration-150"
          >
            Filter
          </button>
          <button
            onClick={handleResetFilters}
            className="flex-1 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition duration-150"
          >
            <FaTimes />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
