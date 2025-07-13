import styles from "./App.module.css";

import React, { useEffect, useMemo, useState } from "react";

import empty from "./empty.svg";
import { BaseTable } from 'ali-react-table'

export interface AppProps {
  contextProps: any;
  title: string
}

export const App = ({ contextProps, title }: AppProps) => {

  if (contextProps === "Empty") {
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <img className={styles.empty} src={empty} />
        </div>
      </div>
    );
  }

  if (contextProps.type === "image") {
    return (
      <div className={styles.container}>
        <img src={contextProps.data} className={styles.image} />
      </div>
    );
  }

  const dataSource = contextProps || []
  const columns = (contextProps || []).length > 0 ? Object.keys(contextProps?.[0]).map((cell) => {
    return {
      code: cell, 
      name:  cell, 
      width: 150
    }
  }) : []

  return (
    <div className={`${styles.container} nowheel`}>
      <div className={styles.title}>
        { title }
      </div>
      <BaseTable dataSource={dataSource} columns={columns} style={{ maxWidth: '100%', maxHeight: 385, overflow: 'auto', marginBottom: '10px' }} />
    </div>
  );
};
