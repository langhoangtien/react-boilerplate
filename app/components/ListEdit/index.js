/**
 *
 * ListEdit
 *
 */

import React from 'react';
import {
  Grid,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@material-ui/core';
// import { Save } from '@material-ui/icons';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ListEdit({ columns, rows, handleChange }) {
  return (
    <Grid container>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(item => (
              <TableCell>{item.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow>
              {columns.map(item => (
                <TableCell>
                  <TextField
                    style={{ padding: '5px' }}
                    onChange={e =>
                      handleChange(item.name, e.target.value, index)
                    }
                    key={item.name}
                    // label={item.title}
                    value={row[item.name]}
                    type={item.type ? item.type : 'text'}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}

ListEdit.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  handleChange: PropTypes.func,
};

export default ListEdit;
