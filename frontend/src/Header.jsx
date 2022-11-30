import { Layout } from "antd";
import { useMemo } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
import { useAppStore } from "./hooks/useAppStore";
import { HorizontalNav } from "./HorizontalNav";
import { VerticalNav } from "./VerticalNav";
const { Header: AntHeader } = Layout;

export const Header = ({ postEditor, setPostEditor }) => {
  const categories = useAppStore((state) => state.categories);
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

  const changeActiveCategory = useAppStore(
    (state) => state.changeActiveCategory
  );
  function handleActiveCategoryChange(key) {
    if (key === "0") {
      changeActiveCategory({
        _id: key,
        name: "All",
      });
    } else {
      const categoryToSet = categories.find((category) => category._id === key);
      changeActiveCategory(categoryToSet);
    }
  }

  // for 'media query'
  const [width, _] = useWindowSize();

  return (
    <AntHeader className="header">
      {width > 768 && categories ? (
        <HorizontalNav
          postEditor={postEditor}
          navItems={navItems}
          handleActiveCategoryChange={handleActiveCategoryChange}
          setPostEditor={setPostEditor}
        />
      ) : (
        <VerticalNav
          postEditor={postEditor}
          navItems={navItems}
          handleActiveCategoryChange={handleActiveCategoryChange}
          setPostEditor={setPostEditor}
        />
      )}
    </AntHeader>
  );
};
