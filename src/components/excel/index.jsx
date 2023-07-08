import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function FileUpload() {
  const [choosenFile, setChoosenFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [fileData, setFileData] = useState(null);
  // const [fileData, setFileData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleFileChange = (event) => {
    setChoosenFile(event.target.files[0])
    console.log((event.target.files[0]))

  }

  const handleFileUpload = () => {
    if (choosenFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(data);
        setFileData(data);
      }
      reader.readAsBinaryString(choosenFile);
    }
  };

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const updatedData = [...fileData];
    updatedData[rowIndex][columnIndex] = value;
    setFileData(updatedData);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(fileData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'uploaded_file.xlsx');
  }

  return (
    <div className="p-4 ">
      <div className='flex gap-10'>
        {/* 1st upload */}
        <div className='flex items-center'>
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
        {/* 2nd upload */}
        <div className='flex items-center'>
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
        {/* create new buttton */}
        <div className='flex items-center ml-10'>
          <button
            className="bg-blue-500 text-white px-4 py-2  rounded"
            onClick={handleFileUpload}
          >
            Create New file
          </button>
        </div>

      </div>

      {!fileData && (
        <div className="flex justify-center items-center h-80">
          <h1 className="text-4xl font-bold underline">Choose an excel file & click upload to view it</h1>
        </div>
      )}

      {fileData && (
        <div>
          <table className="border-collapse border border-gray-400 mt-4 mx-auto">
            <thead>
              <tr>
                {fileData[0].map((cellData, index) => (
                  <th key={index} className="border border-gray-400 px-4 py-2">
                    {cellData}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.slice(1).map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {rowData.map((cellData, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-400 px-4 py-2"
                    >
                      {editMode ? (
                        <input
                          type="text"
                          className="w-full bg-gray-100 border border-gray-400 px-2 py-1 rounded"
                          value={cellData}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex + 1,
                              cellIndex,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        cellData
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              className={`bg-${editMode ? 'green' : 'blue'}-500 text-white px-4 py-2 rounded mr-2`}
              onClick={handleToggleEditMode}
            >
              {editMode ? 'Save' : 'Edit'}
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleDownload}
            >
              Download File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
