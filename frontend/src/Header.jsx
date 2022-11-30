import { Layout } from "antd";
import { useEffect, useMemo } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
import { useAppStore } from "./hooks/useAppStore";
import { HorizontalNav } from "./HorizontalNav";
import { VerticalNav } from "./VerticalNav";
const { Header: AntHeader } = Layout;

export const Header = () => {
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  useEffect(() => {
    fetchCategories();
  }, []);
  const navItems = useMemo(() => {
    if (categories) {
      return [
        {
          label: "All",
          key: "0",
        },
        ...categories.map((category) => ({
          label: category.name,
          key: category._id,
        })),
      ];
    }
  }, [categories]);

  const setActiveCategory = useAppStore((state) => state.setActiveCategory);
  function handleActiveCategoryChange(key) {
    if (key === "0") {
      setActiveCategory({
        _id: key,
        name: "All",
      });
    } else {
      const categoryToSet = categories.find((category) => category._id === key);
      setActiveCategory(categoryToSet);
    }
  }

  const [width, _] = useWindowSize();

  return (
    <AntHeader className="header">
      {width > 768 && categories ? (
        <HorizontalNav
          navItems={navItems}
          handleActiveCategoryChange={handleActiveCategoryChange}
        />
      ) : (
        <VerticalNav
          navItems={navItems}
          handleActiveCategoryChange={handleActiveCategoryChange}
        />
      )}
    </AntHeader>
  );
};
