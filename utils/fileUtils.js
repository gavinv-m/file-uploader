export default function getFileIconPath(fileExtension) {
  const fileType = {
    csv: '/public/svgs/csv.svg',
    xls: '/public/svgs/excel.svg',
    xlsx: '/public/svgs/excel.svg',
    jpeg: '/public/svgs/img.svg',
    jpg: '/public/svgs/img.svg',
    png: '/public/svgs/img.svg',
    pdf: '/public/svgs/pdf.svg',
    txt: '/public/svgs/txt.svg',
    doc: '/public/svgs/word.svg',
    docx: '/public/svgs/word.svg',
    default: '/public/svgs/default.svg',
  };

  return fileType[fileExtension];
}
