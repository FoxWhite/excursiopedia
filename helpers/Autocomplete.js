import $ from 'jquery';

export function getAllCountries(callback) {
    $.ajax({
      url: '//api.vk.com/method/database.getCountries',
      data: {
        need_all: 1,
        count: 300,
      },
      dataType: 'jsonp'
    }).done(function(data) {
      callback(data.response)
    });
};

export function getAllCities(callback, countryId = 1, searchQuery = "") {
    $.ajax({
      url: '//api.vk.com/method/database.getCities',
      data: {
        need_all: 1,
        count: 30,
        country_id: countryId,
        q: searchQuery
      },
      dataType: 'jsonp'
    }).done(function(data) {
      callback(data.response)
    });
};
