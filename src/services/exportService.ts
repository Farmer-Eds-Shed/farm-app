// Desc: Export services for exporting data to CSV
export const handleExportCSV = (selectedRows: any[], selectedTable: string) => {
    if (selectedRows.length > 0) {
      const csvRows = [];
      const headers = Object.keys(selectedRows[0]);
      csvRows.push(headers.join(','));
  
      for (const row of selectedRows) {
        const values = headers.map(header => {
          const escaped = ('' + row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }
  
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${selectedTable}-selected.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No rows selected for export.');
    }
  };