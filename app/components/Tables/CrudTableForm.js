import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Form from './tableParts/Form';
import MainTableForm from './tableParts/MainTableForm';
import FloatingPanel from '../Panel/FloatingPanel';

function CrudTableForm(props) {
  const {
    title,
    formTitle,
    dataTable,
    openForm,
    closeForm,
    additionalIcon,
    removeRow,
    selectRow,
    addNew,
    editRow,
    anchor,
    children,
    branch,
    initValues,
    fetchData,
    dataInit,
    submit
  } = props;
  useEffect(() => {
    fetchData(dataInit, branch);
  }, [dataInit]);

  // const sendValues = useCallback((values) => {
  //   submit(values);
  // }, [submit]);
  // console.log(children);
  return (
    <div>
      <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} title={formTitle}>
        <Form onSubmit={submit} initValues={initValues} branch={branch}>
          {children}
        </Form>
      </FloatingPanel>
      <MainTableForm
        title={title}
        addNew={addNew}
        items={dataTable}
        removeRow={removeRow}
        selectRow={selectRow}
        editRow={editRow}
        anchor={anchor}
        branch={branch}
        additionalIcon={additionalIcon}
      />
    </div>
  );
}

CrudTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataInit: PropTypes.array.isRequired,
  dataTable: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  selectRow: PropTypes.func,
  children: PropTypes.node.isRequired,
  initValues: PropTypes.object.isRequired,
  branch: PropTypes.string.isRequired,
};

export default CrudTableForm;
