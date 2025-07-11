import styles from "./App.module.css";

import React, { useEffect, useMemo, useState } from "react";

import empty from "./empty.svg";
import { BaseTable } from 'ali-react-table'

export interface AppProps {
  contextProps: any;
}

export const App = ({ contextProps }: AppProps) => {
 

  const equityRows = contextProps?.equity_rows || []
  const contribRows = contextProps?.contrib_rows || []
  const pnlRows = contextProps?.pnl_rows || []
  const greeksRows = contextProps?.greeks_rows || []

  const [dataSource, setDataSource] = useState<any[]>(contextProps?.equity_rows || [])

  
  const equityTableCols = useMemo(() => {
    return equityRows.length > 0 ? Object.keys(equityRows[0]).map((cell) => {
      return {
        code: cell, 
        name:  cell, 
        width: 150
      }
    })  : []
  }, [equityRows])

  const contribTableCols = useMemo(() => {
    return contribRows.length > 0 ? Object.keys(contribRows[0]).map((cell) => {
      return {
        code: cell, 
        name:  cell, 
        width: 150
      }
    })  : []
  }, [contribRows])
  

  const pnlTableCols = useMemo(() => {
    return pnlRows.length > 0 ? Object.keys(pnlRows[0]).map((cell) => {
      return {
        code: cell, 
        name:  cell, 
        width: 150
      }
    })  : []
  }, [pnlRows])

  const greeksTableCols = useMemo(() => {
    return greeksRows.length > 0 ? Object.keys(greeksRows[0]).map((cell) => {
      return {
        code: cell, 
        name:  cell, 
        width: 150
      }
    })  : []
  }, [greeksRows])


  const [columns, setColumns] = useState<any[]>((contextProps?.equity_rows || []) > 0 ? Object.keys(contextProps?.equity_rows?.[0]).map((cell) => {
      return {
        code: cell, 
        name:  cell, 
        width: 150
      }
    })  : [])

  const changeToTargetTable = (target: string) => {
    switch(target) {
      case 'Equity':
        setColumns(equityTableCols)
        setDataSource(equityRows)
        break
      case 'Contrib':
        setColumns(contribTableCols)
        setDataSource(contribRows)
        break
      case 'PnL':
        setColumns(pnlTableCols)
        setDataSource(pnlRows)
        break
      case 'Greeks':
        setColumns(greeksTableCols)
        setDataSource(greeksRows)
        break
    }
  }

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

  return (
    <div className={`${styles.container} nowheel`}>
      <div className={styles.tablebtn}>
        <button className={styles.btn} onClick={() => changeToTargetTable('Equity')}>Equity</button>
        <button className={styles.btn} onClick={() => changeToTargetTable('Contrib')}>Contrib</button>
        <button className={styles.btn} onClick={() => changeToTargetTable('PnL')}>PnL</button>
        <button className={styles.btn} onClick={() => changeToTargetTable('Greeks')}>Greeks</button>
      </div>
      <BaseTable dataSource={dataSource} columns={columns} style={{ maxWidth: '100%', height: 385, overflow: 'auto' }} />
    </div>
  );
};
