import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { getUsers, activateUser, deactivateUser } from '../../../utils/auth';

// Generate Order Data
function createData(id, name, email, activate, createAt, lastLogin) {
  return { id, name, email, activate, createAt, lastLogin };
}

const columns = [
  {
    field: 'name',
    headerName: 'Username',
    flex: 1,
    renderCell: (params) => {
      let url = "/secure/users/" + params.value;
      return <Link to={url}>{params.value}</Link>
    },
  },
  { field: 'email', headerName: 'Email', flex: 2 },
  { field: 'activate', headerName: 'Activate', flex: 1 },
  {
    field: 'createAt',
    headerName: 'Created At',
    sortable: true,
    flex: 1
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    sortable: true,
    flex: 1
  },
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function UserTable() {

  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
      if (data) {
        let users = data.map((user) => {
          let is_active = user.is_active === 1 ? true : false;
          return createData(user.username, user.username, user.email, is_active, user.created_at, user.last_login)
        });
        setRows(users)
      }
    };
    fetchData()
  }, []);

  const classes = useStyles();

  const onSelectionModelChange = (newSelection) => {
    setSelected(newSelection.selectionModel);
  }

  const handleActivate = () => {
    async function fetchData() {
      for (let i = 0; i < selected.length; i++) {
        await activateUser(selected[i]);
      }

      const data = await getUsers();
      if (data) {
        let users = data.map((user) => {
          let is_active = user.is_active === 1 ? true : false;
          return createData(user.username, user.username, user.email, is_active, user.created_at, user.last_login)
        });
        setRows(users)
      }
    };
    fetchData()
  }

  const handleDeactivate = () => {
    async function fetchData() {
      for (let i = 0; i < selected.length; i++) {
        await deactivateUser(selected[i]);
      }

      const data = await getUsers();
      if (data) {
        let users = data.map((user) => {
          let is_active = user.is_active === 1 ? true : false;
          return createData(user.username, user.username, user.email, is_active, user.created_at, user.last_login)
        });
        setRows(users)
      }
    };
    fetchData();
    setRows([])
  }

  return (
    <React.Fragment>
      <Title>Users</Title>
      <div style={{ height: '70vh', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionModelChange={onSelectionModelChange} />
      </div>
      <div className={classes.seeMore}>
        <Button onClick={handleActivate} color="primary">Activate</Button>
        <Button onClick={handleDeactivate} color="secondary">Deactivate</Button>
      </div>
    </React.Fragment>
  );
}