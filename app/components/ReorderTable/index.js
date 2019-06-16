/**
 *
 * ReorderTable
 *
 */

import React, { memo, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ReorderTable({ columnsPr, rows }) {
  const [columns, setColumns] = React.useState([]);
  function allowDrop(ev) {
    ev.preventDefault();
  }
  let data;
  function drop(toItem) {
    const newData = columns.map(item => {
      switch (item.name) {
        case toItem.name:
          return { ...item, order: data.order };
        case data.name:
          return { ...item, order: toItem.order };
        default:
          return item;
      }
    });

    setColumns(newData);
  }

  function drag(fromItem) {
    data = fromItem;
    // ev.dataTransfer.setData('text', ev.target.id);
  }

  useEffect(() => {
    setColumns(columnsPr);
  }, [columnsPr]);

  const newColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {newColumns.map(item => (
            <TableCell
              onDragOver={event => allowDrop(event)}
              onDragStart={() => drag(item)}
              draggable
              onDrop={() => drop(item)}
            >
              {item.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow>
            {newColumns.map(item => (
              <TableCell>{row[item.name]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

ReorderTable.propTypes = {
  columnsPr: PropTypes.array,
  rows: PropTypes.array,
};

export default memo(ReorderTable);
