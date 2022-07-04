const xlsx = require("xlsx");
const fs = require("fs");
const ExcelJS = require('exceljs');
const path = require('path');
const { fileURLToPath } = require("url");

async function matchMaking() {

    var wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile("W2020.xlsx");
    var matrix = wb.getWorksheet("Matrix");
    var result = wb.getWorksheet("Results");
    let low_col = matrix.actualColumnCount + 1;
    let postings_num = 67;
    var cluster_rank;

    for (let row = 5; row < matrix.actualRowCount; row++) {

        var lowest_sum = 0;
        var posting_id = 0;
        for (let count = 1; count < postings_num; count++) {

            var col = count * 2 + 1;
            var cell_value = matrix.getRow(row).getCell(col).value;
            var cell_adj_value = matrix.getRow(row).getCell(col + 1).value;

            if (cell_value && cell_adj_value) {
                //  console.log("cell value is : " + cell_value + "   adj valu: " + cell_adj_value);
                if (cell_adj_value === 1 && cell_value === 1) {
                    lowest_sum = 0;
                    // await enterResult(matrix.getRow(row).getCell('A').value,
                    //     matrix.getRow(row).getCell('B').value,
                    //     matrix.getRow(2).getCell(col).value,
                    //     matrix.getRow(1).getCell(col).value);
                    let r = result.actualRowCount + 1;
                    result.getRow(r).getCell(1).value = matrix.getRow(row).getCell('A').value;
                    result.getRow(r).getCell(2).value = matrix.getRow(row).getCell('B').value;
                    result.getRow(r).getCell(3).value = matrix.getRow(2).getCell(col).value;
                    result.getRow(r).getCell(4).value = matrix.getRow(1).getCell(col).value;



                    var vacancies = matrix.getRow(4).getCell(col).value
                    if (vacancies > 0)
                        matrix.getRow(4).getCell(col).value = vacancies - 1;
                    
                    if ( vacancies === 0 )
                    {
                        matrix.spliceColumns(col,1);
                        matrix.spliceColumns(col,1);
                    }
                    //  await wb.xlsx.writeFile("W2020.xlsx");
                    // console.log("lowest sum is " + lowest_sum);

                    break;
                    // console.log("THIS SHOULD NOT PRINT");
                    //one-one s are matched and entered. 
                } else if (cell_value > 0 && cell_adj_value != 'NR' && cell_adj_value != 'nr') {
                    //  console.log("inside second if.... and lowest sum is = " + lowest_sum);
                    //   console.log("inside else if" + matrix.getRow(row).getCell('A').value);
                    var rank = cell_adj_value;

                    if (isNaN(cell_adj_value)) {
                        rank = parseInt(cell_adj_value.match(/\d/g));
                        cluster_rank = cell_adj_value.replace(/[0-9]/g, '');
                        //if (cluster_rank) console.log(cluster_rank);
                    }
                    if (lowest_sum > 0) {
                        if (rank + cell_value < lowest_sum) {
                            posting_id = matrix.getRow(1).getCell(col).value;
                            lowest_sum = rank + cell_value;
                        }
                    } else {

                        posting_id = matrix.getRow(1).getCell(col).value;
                        lowest_sum = rank + cell_value;
                        //console.log("    rank is " + rank + "    cell value is " + cell_value + "   lowest sum is " + lowest_sum);
                    }


                }
            }

        }
        // console.log("done with the iterations... lowest sum is "+lowest_sum); 

        if (lowest_sum > 0) {

            matrix.getRow(row).getCell(low_col).value = lowest_sum;
            matrix.getRow(row).getCell(low_col +1).value = posting_id;
        }


    }

    await wb.xlsx.writeFile("W2020.xlsx");
}

// async function enterResult(first_name, last_name, position, posting_id) {
//     var wb_r = new ExcelJS.Workbook();
//     await wb_r.xlsx.readFile("W2020.xlsx");
//     var result = wb_r.getWorksheet("Results");
//     let r = result.actualRowCount + 1;
//     result.getRow(r).getCell(1).value = first_name;
//     result.getRow(r).getCell(2).value = last_name;
//     result.getRow(r).getCell(3).value = position;
//     result.getRow(r).getCell(4).value = posting_id;
//    await wb_r.xlsx.writeFile("W2020.xlsx");
// }

matchMaking();