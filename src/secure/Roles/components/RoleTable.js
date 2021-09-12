import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { getRoles, deleteRole } from '../../../utils/auth';

// Generate Order Data
function createData(id, name, desc, createAt, updateAt) {
  return { id, name, desc, createAt, updateAt };
}

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'desc', headerName: 'Description', flex: 2 },
  {
    field: 'createAt',
    headerName: 'Created At',
    sortable: true,
    flex: 1,
  },
  {
    field: 'updateAt',
    headerName: 'Updated At',
    sortable: true,
    flex: 1
  },
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RoleTable() {

  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRoles();
      if (data) {
        let roles = data.map((role) => {
          return createData(role.name, role.name, role.description, role.created_at, role.updated_at)
        });
        setRows(roles)
      }
    };
    fetchData()
  }, []);

  const classes = useStyles();

  const onSelectionModelChange = (newSelection) => {
    setSelected(newSelection.selectionModel);
  }

  const handleCreate = () => {
    history.push('/secure/roles/create');
  }

  const handleDelete = () => {
    async function fetchData() {
      for (let i = 0; i < selected.length; i++) {
        await deleteRole(selected[i]);
      }

      const data = await getRoles();
      if (data) {
        let roles = data.map((role) => {
          return createData(role.name, role.name, role.description, role.created_at, role.updated_at)
        });
        setRows(roles)
      }
    };
    fetchData()
  }

  return (
    <React.Fragment>
      <Title>Roles</Title>
      <div style={{ height: '70vh', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionModelChange={onSelectionModelChange} />
      </div>
      <div className={classes.seeMore}>
        <Button onClick={handleCreate} color="primary">Create</Button>
        <Button onClick={handleDelete} color="secondary">Delete</Button>
      </div>
    </React.Fragment>
  );
}