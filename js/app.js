
'use strict';
// data from json-------------------------------------------------------

$.ajax('./data/page-1.json')
  .then(hornsData => {
    //console.log(hornsData);
    hornsData.forEach(val => {
    //console.log(val);
      let newHorn = new Horn (val);
      newHorn.render();
      newHorn.getKeywords();
    });
    renderSelect ();
    $('#photo-template').first().remove();
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

// render ------------------------------------------------------
Horn.prototype.render = function () {

  let hornClone = $('#photo-template').first().clone();


  hornClone.find('h2').text(this.hornTitle);

  hornClone.find('p').text(this.hornDesc);

  hornClone.find('img').attr('src',this.hornImage);

  hornClone.find('h3').text(this.hornKey);

  hornClone.find('h3').hide();

  // console.log('hornClone',hornClone);

  //console.log(this.hornTitle);
  // console.log( hornClone.find('h2').html());

  // console.log( hornClone.find('h2').text());


  $('main').append(hornClone);

};

// get unrepeated array of horns---------------------------------------

Horn.prototype.getKeywords = function ()
{
  let count = 0;

  Horn.keywordsArr.push(this.hornKey);

  for (let i in Horn.keywordsArr)
  {
    if (this.hornKey === Horn.keywordsArr[i])
      count++;

    if (count > 1)
      Horn.keywordsArr.pop();
  }
  // console.log(Horn.keywordsArr);

};

// render select -----------------------------------------

function renderSelect ()
{
  for (let i in Horn.keywordsArr)
  {
    let optionClone = $('#option-template').first().clone();
    optionClone.text(Horn.keywordsArr[i]);
    optionClone.val(Horn.keywordsArr[i]);
    $('select').append(optionClone);
  }

}

// filter -----------------------------------------------

$('select').on('change',function(){

  $('main div').hide();
  $(`div:contains(${$(this).val()})`).show();

}
);



