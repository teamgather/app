'use client';

import Link from 'next/link';
import cogoToast from '@dsdeepak17/cogo-toast';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProjectModel } from '@teamgather/common';
import { axios, AxiosError } from '@/services/axios.service';
import { COMMON_ERROR_FETCH_MESSAGE_CONSTANT } from '@/constants/message.constant';
import { nl2br } from 'react-js-nl2br';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from '@bprogress/next';

/**
 * ANCHOR Props
 * @date 09/05/2025 - 15:15:27
 *
 * @typedef {Props}
 */
type Props = {
  pageTitle: string;
  pagePath: string;
  apiPath: string;
};

/**
 * ANCHOR List
 * @date 09/05/2025 - 15:15:40
 *
 * @param {Props} props
 * @returns {*}
 */
const List = (props: Props) => {
  const { pageTitle, pagePath, apiPath } = props;

  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const router = useRouter();

  /**
   * ANCHOR Fetch
   * @date 09/05/2025 - 15:19:48
   *
   * @async
   * @returns {*}
   */
  const _fetch = async () => {
    try {
      const { data } = await axios.get(`${apiPath}/list`);

      setProjects(data.projects);
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response &&
        e.response.data &&
        e.response.data.eMessage
      ) {
        cogoToast.error(nl2br(e.response.data.eMessage));
      } else {
        cogoToast.error(COMMON_ERROR_FETCH_MESSAGE_CONSTANT);
      }
    }
  };

  /**
   * ANCHOR View
   * @date 09/05/2025 - 16:17:09
   *
   * @param {*} params
   */
  const _view: GridEventListener<'rowClick'> = (params) => {
    router.push(`/${pagePath}/${params.id}`);
  };

  useEffect(() => {
    _fetch();
  }, []);

  // columns
  const columns: GridColDef<(typeof projects)[number]>[] = [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'description',
      headerName: 'Description',
    },
  ];

  // ANCHOR Render
  return (
    <>
      <div className="border border-red-500 flex flex-row items-center">
        <h1 className="flex-1 mb-6">
          {pageTitle} ({projects.length})
        </h1>
        <Button
          href="/projects/create"
          LinkComponent={Link}
          variant="contained"
          disableElevation={true}>
          Create Project
        </Button>
      </div>
      <div>
        <DataGrid<ProjectModel>
          rows={projects}
          columns={columns}
          rowSelection={false}
          onRowClick={_view}
          sx={{
            '.MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </div>
    </>
  );
};

export default List;
