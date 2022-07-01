const xlsx = require("xlsx");
const fs = require("fs");
const ExcelJS = require('exceljs');
const path = require('path');
const { fileURLToPath } = require("url");

async function matchMaking() {

    var wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile("W2020.xlsx");
    var matrix = wb.getWorksheet("Matrix");
    let low_col = matrix.actualColumnCount + 1;
    let postings_num = 67;

    for (let row = 5; row < matrix.actualRowCount; row++) {
        for (let count = 1; count < postings_num; count++) {

            var col = count * 2 + 1;
            var cell_value = matrix.getRow(row).getCell(col).value;
            var cell_adj_value = matrix.getRow(row).getCell(col + 1).value;
            
            if (cell_adj_value === 1 && cell_value === 1 ){
                await enterResult(matrix.getRow(row).getCell('A').value, 
                matrix.getRow(row).getCell('B').value, 
                matrix.getRow(2).getCell(col).value, 
                matrix.getRow(1).getCell(col).value);

            }
        }
    }
}


async function enterResult(first_name,last_name,position,posting_id){
    var wb_r = new ExcelJS.Workbook();
    await wb_r.xlsx.readFile("W2020.xlsx");
    var result = wb_r.getWorksheet("Results");
    var r = result.actualRowCount + 1 ; 
    result.getRow(r).getCell(1).value = first_name; 
    await wb_r.xlsx.writeFile("W2020.xlsx");
  

}
matchMaking();