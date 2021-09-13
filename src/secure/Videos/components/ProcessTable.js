import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import DownloadButton from './DownloadButton';
import Title from './Title';
import { getAllProcesses, getAllProcessTypes } from '../../../utils/video';


function createData(id, filename, hashed_name, status, ptype, createAt, updateAt) {
  return { id, filename, ptype, hashed_name, status, createAt, updateAt };
}

const columns = [
  { field: 'filename', headerName: 'Filename', flex: 1 },
  { field: 'ptype', headerName: 'Process Type', flex: 1 },
  { field: 'hashed_name', headerName: 'Hash', flex: 2 },
  { field: 'status', headerName: 'Status', flex: 1 },
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
  {
    field: 'id',
    headerName: 'Download',
    flex: 0.5,
    renderCell: (params) => {
      return <DownloadButton id={params.value} />;
    }
  }
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ProcessTable() {

  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const processTypes = await getAllProcessTypes();
      if (processTypes) {
        let typeMap = processTypes.reduce((map, obj) => {
          map[obj.id] = obj.name;
          return map;
        }, {});

        const data = await getAllProcesses();

        if (data) {
          let processes = data.map((p) => {
            return createData(p.id, p.filename, p.hashed_name, p.status, typeMap[p.type_id], p.created_at, p.updated_at)
          });
          setRows(processes)
        }
      }
    };
    fetchData()
  }, []);

  const classes = useStyles();

  const onSelectionModelChange = (newSelection) => {
    setSelected(newSelection.selectionModel);
  }

  const handleCreate = () => {
    // history.push('/secure/roles/create');
  }

  const handleDelete = () => {
    // async function fetchData() {
    //   for (let i = 0; i < selected.length; i++) {
    //     await deleteRole(selected[i]);
    //   }

    //   const data = await getRoles();
    //   if (data) {
    //     let roles = data.map((role) => {
    //       return createData(role.name, role.name, role.description, role.created_at, role.updated_at)
    //     });
    //     setRows(roles)
    //   }
    // };
    // fetchData()
  }

  return (
    <React.Fragment>
      <Title>Processes</Title>
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