exports.getPrimeInRange = getPrimeInRange;
function getPrimeInRange(r1,r2)
{
    var dataArray = [];
    console.log(" getPrimeInRange " + r1 + " : " + r2);
    var start=0;
    var end = 0;
    var process_start=process.hrtime();
    process_start = (process_start[0]*1000000000 + process_start[1])/1000000;
    
    for(var i = r1; i <= r2; i++)
    {
        var flag = 1;
        console.log(" i :" + i);
        
        start = process.hrtime();
        start = (start[0]*1000000000 + start[1])/1000000;
        if (i == 1 || i == 0)
        {
            console.log("Neither prime nor composite");
        }

        for(var j = 2 ; j < i/2 ;j++)
        {
            if(i % j == 0)
            {
                console.log(i + " is not a prime number");
                flag = 0;
                end = process.hrtime();
                end = (end[0]*1000000000 + end[1])/1000000;
                var objData = Object();
                objData.number = i;
                objData.isPrime = "No";
                objData.start = start;
                objData.end = end;
                objData.type = "Number";
                dataArray.push(objData);
                break;
            }
        }
        if(flag == 1)
        {             
            console.log(i + " is a prime number");
            end = process.hrtime();
            end = (end[0]*1000000000 + end[1])/1000000;
            
            var objData = Object();
            objData.number = i;
            objData.isPrime = "Yes";
            objData.start = start;
            objData.end = end;
            objData.type = "Number";
            dataArray.push(objData);
        }
        if(i >= r2)
        {

            var process_end=process.hrtime();
            process_end = (process_end[0]*1000000000 + process_end[1])/1000000;

            var objData = Object();
            objData.number = "NA";
            objData.isPrime = "NA";
            objData.start = process_start;
            objData.end = process_end;
            objData.type = "Process";
            dataArray.push(objData);

            console.log("@ End Value of I " + i);

            return dataArray;
        }
    }

}