import React from "react";
import { categories, Category } from "../data/ideaCategory";

const CategoryTabs = ({
  setCategoryType,
  categoryType
}: {
  setCategoryType: (category: Category) => void;
  categoryType: Category;
}) => {
  return (
    <div className="bg-white shadow-sm py-2 my-2">
      <div className="content">
        <nav className="mt-2">
          <ul className="flex gap-x-4 items-center">
            <li className="bg-blue-300 text-white py-2 px-4 rounded-md">
              Filter By:
            </li>
            {categories?.map((category, index) => (
              <li
                onClick={() => setCategoryType(category.value)}
                key={index}
                className={
                  categoryType === category?.value
                    ? `bg-blue-300 text-white py-2 px-4 rounded-md cursor-pointer`
                    : `py-2 px-4 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white`
                }
              >
                {category.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CategoryTabs;
