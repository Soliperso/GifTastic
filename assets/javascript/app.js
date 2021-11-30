const animals = ['Lion', 'Tiger', 'Monkey'];

function displayAnimalInfo() {
  let animal = $(this).attr('data-name');
  let limit = 10;
  let queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    animal +
    '&api_key=FJj8POCZ4gSBtik9E546BCkk98fSnJ7d&' +
    limit;

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    for (let i = 0; i < limit; i++) {
      let divContainer = $('<div>');
      divContainer.addClass('divContainer');
      let img = $('<img>').attr('src', response.data[i].images.original_still.url);
      img.attr('data-animate', response.data[i].images.original.url);
      img.attr('data-still', response.data[i].images.original_still.url);
      img.attr('data-state', 'still');
      img.attr('class', 'gif');
      divContainer.prepend(img);

      let rating = response.data[i].rating;
      let ratingP = $('<p>').text('Rating: ' + rating);
      divContainer.prepend(ratingP);
      console.log($('#animals-view').prepend(divContainer));
    }
  });
}

function createBtn() {
  $('#button-display').empty();

  for (let i = 0; i < animals.length; i++) {
    let btn = $('<button>');
    btn.addClass('animal');
    btn.attr('data-name', animals[i]);
    btn.text(animals[i]);
    $('#button-display').prepend(btn);
  }
}

$('#add-animal').on('click', function (event) {
  event.preventDefault();

  if (animals.indexOf($('#animal-input').val()) > -1) {
    $('#animal-input').val('');
    return;
  }

  if ($('#animal-input').val() !== '') {
    let animal = $('#animal-input').val().trim();
    animals.push(animal);
    $('#animal-input').val('');
  }
  createBtn();
});

function changeImageState() {
  let state = $(this).attr('data-state');
  let animateImage = $(this).attr('data-animate');
  let stillImage = $(this).attr('data-still');

  if (state === 'still') {
    $(this).attr('src', animateImage);
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', stillImage);
    $(this).attr('data-state', 'still');
  }
}

$(document).on('click', '.animal', displayAnimalInfo);
$(document).on('click', '.gif', changeImageState);

createBtn();
