import React, { useState } from 'react';
import { MaterialDropZone } from 'dan-components';

function UploadInputBtn() {
  const [files] = useState([]);

  return (
    <div>
      <MaterialDropZone
        files={files}
        showPreviews
        maxSize={5000000}
        filesLimit={5}
        text="Drag and drop file(s) here or click button bellow"
        showButton
      />
    </div>
  );
}

export default UploadInputBtn;
