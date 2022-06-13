const xlsx = require("xlsx");
const fs = require("fs");
const ExcelJS = require('exceljs');
const path = require('path');

async function matchMaking(){

    var wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile("W2020.xlsx");
    var matrix = wb.getWorksheet("Matrix");
var results = wb.getWorksheet("Results");

 for ( let row = 3; row < matrix.actualRowCount;row++){
     console.log(matrix.getRow(row).values);
 }

    

}

matchMaking();