url = "/get_data";
console.log(url)


d3.json(url, function(data){
  // console.log(typeof data);
  console.log(data)



  var tabledatas = data.result;

  console.log(tabledatas);
  
  var tbody = d3.select("tbody");

  
  var filtButton = d3.select("#filter-btn");
  
function buildTable(data) {
//     // First, clear out any existing data
    console.log("inside buildTable");
  
    console.log(data);
  
    tbody.html("");
   
//     // Next, loop through each object in the data
//     // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      var row = tbody.append("tr");
   
//       // Loop through each field in the dataRow and add
//       // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        var cell = row.append("td");
        cell.text(val);
      });
    });
   }
  
//   //main logic execute functions
  
  buildTable(tabledatas);
  
  
  // User clicks the button to filter data
  filtButton.on("click", function() {  
   
    console.log("insde filtButton logic");
    console.log("data", tabledatas)
  // Prevent the whole page from refreshing.
    d3.event.preventDefault();
  
  
//       // Select the input element and get the raw HTML node- by coaster
      var inputRollercoaster = d3.select("#RollerCoaster");
      var inputAmusementpark = d3.select("#AmusementPark");
      var inputType = d3.select("#Type");
      var inputDesign = d3.select("#Design");
      var inputStatus = d3.select("#Status");
      var inputOpened = d3.select("#Opened");
  
      // console.log(inputRollercoaster);
      // console.log(inputAmusementpark);
      // console.log(inputType);
      // console.log(inputDesign);
      // console.log(inputStatus);
      // console.log(inputOpened);
  
  
//       // Get the value property of the input element
      var RollercoasterValue = inputRollercoaster.property("value");
      var AmusementparkValue = inputAmusementpark.property("value");
      var TypeValue = inputType.property("value");
      var DesignValue = inputDesign.property("value");
      var StatusValue = inputStatus.property("value");
      var OpenedValue = inputOpened.property("value");
  
      // console.log("RollercoasterValue " + RollercoasterValue);
      // console.log("AmusementparkValue " + AmusementparkValue);
      // console.log("TypeValue  " + TypeValue);
      // console.log("DesignValue " + DesignValue);
      // console.log("StatusValue " + StatusValue);
  
      var filterData = tabledatas;
      console.log("logging filterData")
      console.log(RollercoasterValue)
  
      filterData = filterData.filter(row => (row["Roller Coaster"] === RollercoasterValue) || (row["Amusement Park"] === AmusementparkValue) || (row["Type"] === TypeValue)
                                     || (row["Design"] === DesignValue) || (row["Status"] === StatusValue || row["Opened"] == OpenedValue ));
      // filterData = filterData.filter(row => row["Roller Coaster"] === RollercoasterValue);                                     
     
  
  
     buildTable(filterData);
  
  });
});

    