import React from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { downloadVideo } from '../../../utils/video';

export default function DownloadButton(props) {

  const onClickButton = async() => {
    let video = await downloadVideo(props.id);
    const url = window.URL.createObjectURL(new Blob([video]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'output.mp4');
    document.body.appendChild(link);
    link.click();
  }

  return (
    <CloudDownloadIcon onClick={onClickButton} />
  );
}