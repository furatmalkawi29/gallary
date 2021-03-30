
'use strict';
// data from json-------------------------------------------------------

$.ajax('./data/page-1.json')
  .then(hornDataSet => {
    //console.log(hornDataSet); // array of objects
    hornDataSet.forEach(hornsObject => {
    //console.log(hornsObject); // object
      let newHorn = new Horn (hornsObject);
      newHorn.renderHorn();
      newHorn.getKeywords();
    });
    renderSelect ();
    // $('#photo-template').first().remove();
  });


// constructor function -------------------------------------------------------

function Horn (oneHorn) {
  this.hornImage = oneHorn.image_url;
  this.hornTitle = oneHorn.title;
  this.hornDesc = oneHorn.description;
  this.hornNum = oneHorn.horns;
  this.hornKey = oneHorn.keyword;
}

Horn.keywordsArr =[];

// renderHorn ------------------------------------------------------
Horn.prototype.renderHorn = function () {

  $('main').append(this.createTemplate());
  //console.log(this.createTemplate());
  $('main div p:last-child').hide();// hides <p>{{hornKey}}</p>


};


// mergeTemplate --------------------------

Horn.prototype.createTemplate = function ()
{

  // gets string // html tags inside mustache <script>
  let template = $('#hornTemplete').html();
  // console.log('my mustache templete' , template);

  //merges Horn object properties with html
  // console.log(this);
  let dataSet = Mustache.render(template,this);
  // console.log(this);
  return dataSet;

};

// get unrepeated array of horns---------------------------------------

Horn.prototype.getKeywords = function ()
{
  let count = 0;

  Horn.keywordsArr.push(this);

  for (let i in Horn.keywordsArr)
  {
    if (this.hornKey === Horn.keywordsArr[i].hornKey)
      count++;

    if (count > 1)
      Horn.keywordsArr.pop();
  }
  //console.log(Horn.keywordsArr);
};
// render select -----------------------------------------

function renderSelect ()
{
  for (let i in Horn.keywordsArr)
  {

    let template = $('#optionTemplete').html();
    let dataSet = Mustache.render(template,Horn.keywordsArr[i]);
    
    //console.log(Horn.keywordsArr[i]);
    $('select').append(dataSet);
  }

}

// filter -----------------------------------------------

$('select').on('change',function(){

  $('main div').hide();
  $(`div:contains(${$(this).val()})`).show();
  // selects the div that contains hornKey text that's equal option value
  // using the hidden <p>{{hornKey}}</p> in the div 

}
);





