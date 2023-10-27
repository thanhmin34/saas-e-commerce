"use client";
import { map } from "lodash";
import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

const sliderData = [
  {
    url: "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_01_Desktop_EN-min_1696228503435.jpg",
    alt: "img",
    href: "/product/1",
  },
  {
    alt: "img",
    href: "/",
    url: "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_02_Desktop_EN-min_1696228529234.jpg",
  },
  {
    alt: "img",
    href: "/",
    url: "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_03_Desktop_EN-min_1696510563175.jpg",
  },
];

const SliderBlock = () => {
  const renderUi = map(sliderData.slice(0, 1), (item, index) => (
    <Link href={item.href} key={index} className={styles.sliderItem}>
      <img src={item.url} alt={item.alt} width={"100"} height={100} />
    </Link>
  ));

  return <div className={styles.slider}>{renderUi}</div>;
};

export default SliderBlock;
