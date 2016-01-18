$(function () {
    // $('#container1').highcharts({
    //     chart: {borderColor: '#EBBA95',borderRadius: 20,borderWidth: 2,type: 'line'},
    //     title: {text: 'My first Highcharts chart.'},
    //     xAxis: {categories: ['2016-1-16 10:10:50', '2016-1-16 10:11:00']},
    //     yAxis: {},
    //     series: [{data: [29.9, 71.5]}],
    //     credits: {enabled:false},
    //     // exporting: {enabled:true},
    // });
    // $('#container2').highcharts({
    //     chart: {type: 'line'},
    //     title: {text: 'My first Highcharts chart.'},
    //     xAxis: {categories: ['my', 'first', 'chart']},
    //     yAxis: {title:{text:'something'}},
    //     series: [{name:'Jane', data:[1, 0, 4]}, {name: 'John', data:[5, 7, 3]}],
    //     credits: {enabled:false},
    // });
    
    var arraydata = [29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5];
    var arraydate = ["2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00"];
    // function st () {
    //     setInterval("generateData()", 1000);
    // };
    function getdate () {
        var d = new Date();
        var str = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return str;
    };
    function getRandom(n) {
        return Math.floor(Math.random()*n+1)
    };

    var generateData = function () {
        var value = getRandom(100);
        //console.log(value);
        var date = getdate();
        // var arraydata = dynamicInfo["dynamicData"];
        // var arraydate = dynamicInfo["dynamicDate"];
        if (arraydata.length >= 10) {
            arraydata.splice(0, 1);
            arraydate.splice(0, 1);
        } 
        arraydata.push(value);
        //console.log(arraydata);
        arraydate.push(date);
        // dynamicInfo["dynamicData"] = arraydata;
        // dynamicInfo["dynamicDate"] = arraydate;
        // console.log(value + ' ' + date + ' ' + array.length);
        chart.series[0].addPoint([date, value], true, true,true);
        //chart.xAxis[0].setCategories(arraydate);
    };
    
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container1',
            type:'spline',
            marginRight: 10,
            events:{
                load:function () {
                        setInterval(generateData, 1000);
                    }
            },
        },
        title: {text:'My first real-time chart.'},
        xAxis: {categories: arraydate, title: {text:'name'}},
        yAxis: {title:{text:'在线人数'}},
        series: [{name:'人', data:arraydata}],
    });
    // var dynamicInfo = {
    //     "dynamicDate" : ["2016-1-16 10:10:50", "2016-1-16 10:11:00"],
    //     "dynamicData" : [29.9, 71.5]
    // }

    //
    // var data = [
    //     [
    //         "Tiger Nixon",
    //         "System Architect",
    //         "Edinburgh",
    //         "5421",
    //         "2011/04/25",
    //         "$3,120"
    //     ],
    //     [
    //         "Garrett Winters",
    //         "Director",
    //         "Edinburgh",
    //         "8422",
    //         "2011/07/25",
    //         "$5,300"
    //     ]
    // ];
    var data = [
        {
            "name":       "Tiger Nixon",
            "position":   "System Architect",
            "salary":     "$3,120",
            "start_date": "2011/04/25",
            "office":     "Edinburgh",
            "extn":       "5421"
        },
        {
            "name":       "Garrett Winters",
            "position":   "Director",
            "salary":     "$5,300",
            "start_date": "2011/07/25",
            "office":     "Edinburgh",
            "extn":       "8422"
        }
    ];
    $('#example').DataTable({
        data:data,
        columns: [
                { data: 'name' },
                { data: 'position' },
                { data: 'salary' },
                { data: 'office' }
            ],
        paging: false,
        searching: false,
        select: false,
    });

    $(".tabs li").click(function () { 
      if ($(this).hasClass("active")){
                                  
          } else {  
            $(this).siblings().removeClass("active");
              $(this).addClass("active");
              $chooseDataType = $(this).attr("for");
              $(".choosedata").addClass("none");
              $('.'+$chooseDataType).removeClass("none");
          }
      });
  });

