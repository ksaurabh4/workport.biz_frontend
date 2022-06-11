import React, { useState } from 'react';
import { MaterialDropZone } from 'dan-components';

function UploadInputImg() {
  const [files] = useState([]);

  return (
    <div>
      <MaterialDropZone
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        files={files}
        showPreviews
        maxSize={5000000}
        filesLimit={5}
        text="Drag and drop image(s) here or click"
      />
    </div>
  );
}

export default UploadInputImg;
