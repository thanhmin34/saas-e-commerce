import React from "react";
import styles from "./styles.module.scss";
import { SubCategory } from "@interfaces/sub-category";
import SubCategoryList from "./SubCategoryList";
import ImageSubCategory from "./ImageSubCategory";

type PropsType = {
  className: string | undefined;
  sub_category: SubCategory[];
  image: string | undefined;
};

const SubCategory = ({ className, sub_category, image }: PropsType) => {
  return (
    <div className={`${className ? className : ""} ${styles.subCategoryItem}`}>
      <div className={`main-container ${styles.subCategoryBlock}`}>
        <SubCategoryList sub_category={sub_category} />
        <ImageSubCategory image_url={image} />
      </div>
    </div>
  );
};

export default SubCategory;
