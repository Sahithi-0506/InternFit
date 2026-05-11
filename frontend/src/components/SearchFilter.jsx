function SearchFilter({ search, setSearch, filter, setFilter }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Search by company, role, or skills"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-3 border rounded-xl"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-4 py-3 border rounded-xl"
      >
        <option value="All">All Internships</option>
        <option value="Verified">Verified</option>
        <option value="Caution">Caution</option>
        <option value="Scam Suspected">Scam Suspected</option>
      </select>
    </div>
  );
}

export default SearchFilter;