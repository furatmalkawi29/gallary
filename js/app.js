
'use strict';

let Page1keywordsArr =[];
let Page2keywordsArr =[];

let lastRenderArr = [];


// constructor function -------------------------------------------------------

function Horn (oneHorn) {
  this.hornImage = oneHorn.image_url;
  this.hornTitle = oneHorn.title;
  this.hornDesc = oneHorn.description;
  this.hornNum = oneHorn.horns;
  this.hornKey = oneHorn.keyword;
  this.hornHorns = oneHorn.horns;
}
Horn.page2Arr =[];
Horn.page1Arr=[];



// data from json-------------------------------------------------------

// page 1 ----------------
$.ajax('./data/page-1.json')
  .then(hornDataSet => {
  //console.log(hornDataSet); // array of objects
    hornDataSet.forEach(hornsObject => {
      //console.log(hornsObject); // object
      let newHorn = new Horn (hornsObject);
      Horn.page1Arr.push(newHorn);
      newHorn.getKeywords(Page1keywordsArr);
    });
    render(Horn.page1Arr);
    renderSelect(Page1keywordsArr);
  });


// // page 2 ----------------

$.ajax('./data/page-2.json')
  .then(hornDataSet => {
    //console.log(hornDataSet); // array of objects
    hornDataSet.forEach(hornsObject => {
    //console.log(hornsObject); // object
      let newHorn = new Horn (hornsObject);
      Horn.page2Arr.push(newHorn);
      newHorn.getKeywords(Page2keywordsArr);
    });

  });


// get unrepeated array of horns---------------------------------------

Horn.prototype.getKeywords = function (keywordsArr)
{
  let count = 0;

  keywordsArr.push(this);

  for (let i in keywordsArr)
  {
    if (this.hornKey === keywordsArr[i].hornKey)
      count++;

    if (count > 1)
      keywordsArr.pop();
  }
  //console.log(keywordsArr);
};

//-----------------------------------
function renderSelect (keywordsArr)
{
  for (let i in keywordsArr)
  {
    let template = $('#optionTemplete').html();
    let dataSet = Mustache.render(template,keywordsArr[i]);

    //console.log(Horn.keywordsArr[i]);
    $('select:first').append(dataSet);
  }

}


//----------------------------------------

function renderOptSelect ()
{
  {
    $('#sortSelect').empty();
    let template = $('#sortTemplete').html();

    $('#sortSelect').append(template);

  }

}

//---------------------------------------------
function render (pageArr)
{
  lastRenderArr = pageArr;

  for (let i in pageArr)
  {
    let template = $('#hornTemplete').html();
    // console.log( template);
    let dataSet = Mustache.render(template,pageArr[i]);

    $('main').append(dataSet);

    $('main div p:last-child').hide();
  }
}


//-----------------------

function hideOtherPage (pageArr)
{
  $('main').empty();
  render(pageArr);
}


//------------------------

function hornSort (pageArr)
{
  // pageArr.sort(function(b,a){return a.hornHorns - b.hornHorns;});
  pageArr.sort((a,b) => {
    if (a.hornTitle.toUpperCase() < b.hornTitle.toUpperCase()){
      return -1;
    }
    else if (a.hornTitle.toUpperCase() > b.hornTitle.toUpperCase()) return 1;
    else return 0;
  });
  console.log(pageArr);

  render(pageArr);

}

//---------------------------

function hornNumSort (pageArr)
{
  pageArr.sort((a,b) => {
    if (a.hornHorns < b.hornHorns) {
      return -1;
    }
    else if (a.hornHorns > b.hornHorns ) return 1;
    else return 0;
  });
  console.log('ok');

  render(pageArr);
}
//event handlers -------------------------------
// filter -----------------------------------------------

$('select:first').on('change',function(){

  $('main div').hide();
  $(`div:contains(${$(this).val()})`).show();
  // selects the div that contains hornKey text that's equal option value
  // using the hidden <p>{{hornKey}}</p> in the div

}
);

// paging -------------------------------------
$('#page1').on('click', function (){

  $('select:first option').hide();
  renderSelect (Page1keywordsArr);
  //  hideOtherPage(Horn.page2Arr);
  hideOtherPage(Horn.page1Arr);
  renderOptSelect();

  //console.log(Page1keywordsArr);
});




$('#page2').on('click', function (){
  $('select:first option').hide();
  renderSelect (Page2keywordsArr);
  hideOtherPage(Horn.page2Arr);
  // hideOtherPage(Horn.page1Arr);
  renderOptSelect();

  // console.log(Horn.page2Arr);
  // console.log(Horn.page1Arr);
  //console.log(Page2keywordsArr);
});


// sort -----------------------------------------------

$('#sortSelect').on('change',function(){
  console.log(lastRenderArr);
  if ($(this).val() === 'title')
  {
    $('main').empty();
    hornSort(lastRenderArr);
  }
  else { $('main').empty();
    hornNumSort(lastRenderArr);}
  renderOptSelect();
}
);

//-------------------------------

renderOptSelect();
