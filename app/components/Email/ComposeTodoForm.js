import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Attachment from '@material-ui/icons/Attachment';
import FileIcon from '@material-ui/icons/Description';
import ActionDelete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import css from 'dan-styles/Form.scss';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import isImage from '../Forms/helpers/helpers.js';
import styles from './email-jss';

function ComposeTodoForm(props) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState([]);

  const {
    classes,
    closeForm,
    date,
    content,
    inputChange,
  } = props;

  const handleRequestCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleSend = (
    paramsDate,
    paramsContent,
  ) => {
    props.addTodo(paramsDate, paramsContent,);
  };

  const handleRemove = (file, fileIndex) => {
    const thisFiles = files;
    // This is to prevent memory leaks.
    window.URL.revokeObjectURL(file.preview);

    thisFiles.splice(fileIndex, 1);
    setFiles(thisFiles);
  };

  let dropzoneRef;
  const deleteBtn = (file, index) => (
    <div className="middle">
      <IconButton onClick={() => handleRemove(file, index)}>
        <ActionDelete className="removeBtn" />
      </IconButton>
    </div>
  );
  const previews = filesArray => filesArray.map((file, index) => {
    if (isImage(file)) {
      const base64Img = URL.createObjectURL(file);
      return (
        <div key={index.toString()} className={classes.item}>
          <div className="imageContainer col fileIconImg">
            <figure className="imgWrap"><img className="smallPreviewImg" src={base64Img} alt="preview" /></figure>
            {deleteBtn(file, index)}
          </div>
          <Typography noWrap variant="caption">{file.name}</Typography>
        </div>
      );
    }
    return (
      <div key={index.toString()} className={classes.item}>
        <div className="imageContainer col fileIconImg">
          <div className="fileWrap">
            <FileIcon className="smallPreviewImg" alt="preview" />
            {deleteBtn(file, index)}
          </div>
        </div>
        <Typography noWrap variant="caption">{file.name}</Typography>
      </div>
    );
  });
  const fileSizeLimit = 3000000;
  return (
    <div>
      <form>
        <section className={css.bodyForm}>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              id="todoDueDate"
              label="Due Date"
              className={classes.field}
              InputLabelProps={{ shrink: true, required: true }}
              type="datetime-local"
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(event) => inputChange(event, 'date')}
              margin="normal"
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              id="todoContent"
              label="Content"
              className={classes.field}
              InputLabelProps={{ shrink: true, required: true }}
              value={content}
              onChange={(event) => inputChange(event, 'content')}
              margin="normal"
            />
          </div>
        </section>
        <div className={css.buttonArea}>
          <Button type="button" onClick={() => closeForm()}>
            Discard
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            disabled={!date || !content.trim()}
            onClick={() => handleSend(date, content)}
          >
            Send&nbsp;
            <Send className={classes.sendIcon} />
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSnackBar}
        message={errorMessage}
        autoHideDuration={4000}
        onClose={handleRequestCloseSnackBar}
      />
    </div>
  );
}

ComposeTodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ComposeTodoForm);
