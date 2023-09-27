import React, { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import ImageUpload from "../components/ImageUpload.js";

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageUpload />
    </main>
  );
}
