import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function FileUpload() {
  // choosenFile is used when user inputs a file, for uploading purposes
  const [choosenFile, setChoosenFile] = useState(null);
  // selectedFile is used to display the file to user in tables,after uploading
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData1, setFileData1] = useState(null); //1st excel sheet
  const [fileData2, setFileData2] = useState(null); //2nd excel sheet
  const [editMode, setEditMode] = useState(false);

  const handleFileChange = (event) => {
    setChoosenFile(event.target.files[0])
  }

  const handleFileUpload = (params) => {
    if (!choosenFile) return alert("choose a file to upload")
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log("uploaded file: " + data);
        setSelectedFile(data);
        if (params === 1) setFileData1(data);
        else setFileData2(data)
      } catch (error) {
        alert("Sorry we seem to encounter some kind of error check console for further information")
        console.error("Error processing the file:", error);
      }
    }
    reader.readAsBinaryString(choosenFile);
  }

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const updatedData = [...selectedFile];
    updatedData[rowIndex][columnIndex] = value;
    setSelectedFile(updatedData);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleCreate = () => {
    if (!fileData1) return alert("insert file 1")
    if (!fileData2) return alert("insert file 2")
    let index = []
    fileData1[0].forEach((data, i) => {
      fileData2[0].forEach((data2, j) => {
        if (data === data2) {
          index.push(i)
        }
      })
    })
    console.log(index)

    let arr3 = []
    fileData1.forEach((data, i) => {
      arr3.push(data.filter((sub, i) => index.includes(i)))
    })
    console.log("new array: " + arr3)
    setSelectedFile(arr3)
  }

  const handleDownload = () => {
    if (!selectedFile) return alert("select a file to download")
    const worksheet = XLSX.utils.aoa_to_sheet(selectedFile);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'uploaded_file.xlsx');
  }

  return (
    <div className="p-4 ">
      <div className='flex justify-evenly'>
        {/* 1st upload */}
        <div className='flex items-center'>
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleFileUpload(1)}
          >
            Upload 1st file
          </button>
        </div>
        {/* 2nd upload */}
        <div className='flex items-center'>
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleFileUpload(2)}
          >
            Upload 2nd file
          </button>
        </div>
        {/* create new buttton */}
        <div className='flex items-center ml-10'>
          <button
            className="bg-blue-500 text-white px-4 py-2  rounded"
            onClick={handleCreate}
          >
            Create New file
          </button>
        </div>

      </div>

      {!selectedFile && (
        <div className="flex flex-col gap-10 justify-center items-center h-80">
          <h1 className="text-4xl font-bold underline">Choose an excel file & click upload to view it</h1>
          <p className='text-lg font-normal'>While creating new file Note that the 2nd file is the one with only the heading of the content needed from 1st file</p>
        </div>
      )}

      {selectedFile && (
        <div>
          <table className="border-collapse border border-gray-400 mt-4 mx-auto">
            <thead>
              <tr>
                {selectedFile[0].map((cellData, index) => (
                  <th key={index} className="border border-gray-400 px-4 py-2">
                    {cellData}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedFile.slice(1).map((rowData, rowIndex) => (
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
