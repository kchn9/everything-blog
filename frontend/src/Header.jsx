import { Layout } from "antd";
import { useMemo } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
import { HorizontalNav } from "./HorizontalNav";
import { VerticalNav } from "./VerticalNav";
const { Header: AntHeader } = Layout;

export const Header = ({
  categories,
  activeCategory,
  setActiveCategory,
  postEditor,
  setPostEditor,
}) => {
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

  // for 'media query'
  const [width, _] = useWindowSize();

  return (
    <AntHeader className="header">
      {width > 768 && categories ? (
        <HorizontalNav
          postEditor={postEditor}
          activeCategory={activeCategory}
          navItems={navItems}
          handleActiveCategoryChange={handleActiveCategoryChange}
          setPostEditor={setPostEditor}
        />
      ) : (
        <VerticalNav
          postEditor={postEditor}
          activeCategory={activeCategory}
          navItems={navItems}
          handleActiveCategoryChange={handleActiveCategoryChange}
          setPostEditor={setPostEditor}
        />
      )}
    </AntHeader>
  );
};
