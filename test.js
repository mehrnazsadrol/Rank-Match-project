const xlsx = require("xlsx");
const fs = require("fs");
const ExcelJS = require('exceljs');
const path = require('path');

async function students() {

    var wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile("S22.xlsx");
    var ws = wb.getWorksheet("Matrix");

    // var wb_t = new ExcelJS.Workbook(); 
    // await wb_t.xlsx.readFile("S2.xlsx");
    // var ws_t = wb_t.getWorksheet("Matrix");
    // var lastRow = ws.actualRowCount + 1; 
    // ws.getRow(lastRow).values = ws_t.getRow(4).values; 

    var students_dir = "students/";
    let s_filename = fs.readdirSync(students_dir);

    for (const file of s_filename) {
        var fileExtension = path.parse(file).ext;
        if (fileExtension === ".xlsx" && file[0] !== "~") {
            //var fullpath = path.join(__dirname, "students", file);
            const _file = path.resolve(students_dir, file);
            let wb_t = new ExcelJS.Workbook();
            var lastRow = ws.actualRowCount + 1;
            await wb_t.xlsx.readFile(_file).then(() => {
                var ws_t = wb_t.getWorksheet("Matrix");
                ws.getRow(lastRow).values = ws_t.getRow(4).values;
            });
        }
    }
    await wb.xlsx.writeFile("final.xlsx");
}
async function employers(){
    
}
students();

