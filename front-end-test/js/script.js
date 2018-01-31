if (document.documentElement.classList == 'no-touch gr__sphere_ms') {
  console.log("==Touch Device==");
  $('.checkbox input[type=checkbox]').change(function(){
    var selected = $(this).attr('id');
    console.log("selected: ", selected);
    // console.log("selected: ", selected.is(':checked'));
    // selected.prop("checked", false);
    // console.log("selected: ", selected.is(':checked'));
    $("label[for='"+selected+"']").css('background', 'white');
    $('.modal').css('display', 'block');
    $('#submit').on('click', function(){
      $('.modal').css('display', 'none');
      var day = $('#selectDay').val();
      var startT = $('#startTime').val();
      var endT = $('#endTime').val();
      var startValue = day + startT;
      var endValue = day + endT;
      var timeArr1 = ['12am', '1230am', '1am', '130am', '2am', '230am', '3am', '330am', '4am', '430am', '5am', '530am',
        '6am', '630am', '7am', '730am', '8am', '830am', '9am', '930am', '10am', '1030am', '11am', '1130am',
        '12pm', '1230pm', '1pm', '130pm', '2pm', '230pm', '3pm', '330pm', '4pm', '430pm', '5pm', '530pm', '6pm',
        '630pm', '7pm', '730pm', '8pm', '830pm', '9pm', '930pm', '10pm', '1030pm', '11pm', '1130pm'];
      var timeArrS = timeArr1.indexOf(startT);
      var timeArrE = timeArr1.indexOf(endT);
      var timeArr2 = timeArr1.slice(timeArrS, timeArrE);
      console.log("timeArr2: ", timeArr2);
      console.log("startValue: ", startValue);
      console.log("endValue: ", endValue);
      var timeArr3 = [];
      for (var i = 0; i < timeArr2.length; i++) {
        var timeObj = day + timeArr2[i]
        timeArr3.push(timeObj);
      }
      console.log("timeArr3: ", timeArr3);
      for (var i = 0; i < timeArr3.length; i++) {
        $('#'+timeArr3[i]).prop("checked", true);
        if ($("label[for='"+timeArr3[i]+"']").css('background', 'white')) {
          $("label[for='"+timeArr3[i]+"']").css('background', 'blue');
        };
      };
      $('#'+endValue).prop("checked", true);
    });
  });
};
