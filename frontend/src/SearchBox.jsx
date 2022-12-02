import { AutoComplete, Input } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useAppStore } from "./hooks/useAppStore";

const SearchBox = () => {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const handleSearch = useAppStore((state) => state.handlePostsSearch);
  const posts = useAppStore((state) => state.posts);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = posts.filter((p) => {
        const title = p.title.toString().toLowerCase();
        const body = p.body.toString().toLowerCase();
        return (
          body.includes(searchQuery.toLowerCase()) ||
          title.includes(searchQuery.toLowerCase())
        );
      });
      const mapped = filtered.map((p) => ({ key: p._id, value: p.title }));
      setOptions(mapped);
    }
  }, [searchQuery]);

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      options={options}
    >
      <Input.Search
        style={{ width: "clamp(300px, 50vw, 600px)" }}
        onSearch={(value) => handleSearch(value)}
        disabled={searchQuery.length !== 0}
        enterButton="Search"
        placeholder="Start typing to search"
        value={searchQuery}
        onChange={(e) => {
          if (e.target.value.length === 0) {
            setOptions([]);
          }
          setSearchQuery(e.target.value);
        }}
      />
    </AutoComplete>
  );
};

export { SearchBox };
