import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function Excel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setFileData(data);
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {fileData && (
        <table>
          <thead>
            <tr>
              {fileData[0].map((cellData, index) => (
                <th key={index}>{cellData}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileData.slice(1).map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {rowData.map((cellData, cellIndex) => (
                  <td key={cellIndex}>{cellData}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Excel;
