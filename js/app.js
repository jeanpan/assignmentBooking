// The object literals module pattern
$(function(){

    var data = [
        { name: "Moscow", count: 12, content: "<p>Moscow is the capital city and the most populous federal subject of <b>Russia</b>. The city is a major political, economic, cultural and scientific center in Russia and in Eurasia.</p>" },
        { name: "Amsterdam", count: 25, content: "<p>Amsterdam is the capital and most populous city of the <b>Netherlands</b>. Its status as the Dutch capital is mandated by the Constitution of the Netherlands though it is not the seat of the Dutch government, which is at the Hague. </p>" },
        { name: "Lisbon", count: 15, content: "<p>Lisbon is the largest city and capital of <b>Portugal</b> with a population of 547,631 within its administrative limits on a land area of 84.8 square kilometers.</p>" },
        { name: "Berlin", count: 19, content: "<p>Berlin is the capital city of <b>Germany</b> and one of the 16 states of Germany. With a population of 3.3 million people, Berlin is Germany's largest city and is the second most populous city proper and the seventh most populous urban area in the European Union.</p>" },
        { name: "Madrid", count: 25, content: "<p>Madrid is the capital of <b>Spain</b> and its largest city. The population of the city is roughly 3.3 million and the entire population of the Madrid metropolitan area is calculated to be around 6.5 million.</p>" },
        { name: "Barcelona", count: 10, content: "<p>Barcelona is a Spanish city, capital of the autonomous community of Catalonia and the second largest city in the country, with a population of 1,620,943 within its administrative limits.</p>" },
        { name: "Zagreb", count: 27, content: "<p>Zagreb is the capital and the largest city of the Republic of <b>Croatia</b>. It is located in the northwest of the country, along the Sava river, at the southern slopes of the Medvednica mountain.</p>" },
        { name: "Singapore", count: 30, content: "<p>Singapore, officially the Republic of Singapore, is a Southeast Asian sovereign city-state off the southern tip of the Malay Peninsula, 137 kilometers north of the equator.</p>" },
        { name: "Beijing", count: 14, content: "<p>Beijing, sometimes romanized as Peking, is the capital of the People's Republic of China and one of the most populous cities in the world. The population as of 2012 was 20,693,000.</p>" },
        { name: "Paris", count: 5, content: "<p>Paris is the capital and most populous city of <b>France</b>. It is situated on the River Seine, in the north of the country, at the heart of the Île- de-France region.</p>" }
    ];

    var controller = {
        getList: function() {
            return data.sort(function(a,b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
        },
        init: function() {
            view.init();
        }
    };

    var view = {
        init: function() {
            this.$countryList = $('.country-list');
            this.countryTemplate = $('script[data-template="country"]').html();

            this.$countryList.on('click', '.show-more', function(e) {
                e.preventDefault();
                var txt = $(this).next().next().text();
                $('.more').html(txt);
            });

            view.render();
        },
        render: function() {
            var $countryList = this.$countryList,
                countryTemplate = this.countryTemplate,
                total = '';

            $countryList.html('');

            controller.getList().forEach(function(obj) {
                var thisTemplate = countryTemplate
                                                .replace(/{{id}}/ig, obj.name.toLowerCase())
                                                .replace(/{{name}}/ig, obj.name)
                                                .replace(/{{count}}/ig, obj.count)
                                                .replace(/{{content}}/ig, obj.content);
                total = total + thisTemplate;
            });

            $countryList.append(total);
        }
    };

    controller.init();

}());

// The revealing module pattern
/*
var countryList = (function() {

  // private data
  var _data = [
      { name: "Moscow", count: 12, content: "<p>Moscow is the capital city and the most populous federal subject of <b>Russia</b>. The city is a major political, economic, cultural and scientific center in Russia and in Eurasia.</p>" },
      { name: "Amsterdam", count: 25, content: "<p>Amsterdam is the capital and most populous city of the <b>Netherlands</b>. Its status as the Dutch capital is mandated by the Constitution of the Netherlands though it is not the seat of the Dutch government, which is at the Hague. </p>" },
      { name: "Lisbon", count: 15, content: "<p>Lisbon is the largest city and capital of <b>Portugal</b> with a population of 547,631 within its administrative limits on a land area of 84.8 square kilometers.</p>" },
      { name: "Berlin", count: 19, content: "<p>Berlin is the capital city of <b>Germany</b> and one of the 16 states of Germany. With a population of 3.3 million people, Berlin is Germany's largest city and is the second most populous city proper and the seventh most populous urban area in the European Union.</p>" },
      { name: "Madrid", count: 25, content: "<p>Madrid is the capital of <b>Spain</b> and its largest city. The population of the city is roughly 3.3 million and the entire population of the Madrid metropolitan area is calculated to be around 6.5 million.</p>" },
      { name: "Barcelona", count: 10, content: "<p>Barcelona is a Spanish city, capital of the autonomous community of Catalonia and the second largest city in the country, with a population of 1,620,943 within its administrative limits.</p>" },
      { name: "Zagreb", count: 27, content: "<p>Zagreb is the capital and the largest city of the Republic of <b>Croatia</b>. It is located in the northwest of the country, along the Sava river, at the southern slopes of the Medvednica mountain.</p>" },
      { name: "Singapore", count: 30, content: "<p>Singapore, officially the Republic of Singapore, is a Southeast Asian sovereign city-state off the southern tip of the Malay Peninsula, 137 kilometers north of the equator.</p>" },
      { name: "Beijing", count: 14, content: "<p>Beijing, sometimes romanized as Peking, is the capital of the People's Republic of China and one of the most populous cities in the world. The population as of 2012 was 20,693,000.</p>" },
      { name: "Paris", count: 5, content: "<p>Paris is the capital and most populous city of <b>France</b>. It is situated on the River Seine, in the north of the country, at the heart of the Île- de-France region.</p>" }
  ];

  // cache DOM
  var $countryList = $('.country-list');
  var template = $('script[data-template="country"]').html();
  var $more = $('.more');

  $countryList.on('click', '.show-more', function() {
    var content = $(this).siblings('.content').text();
    $more.html(content);
  });

  render();

  function render(data) {
    var total = '',
        d = (typeof data === 'object' && data.isArray()) ? data : _data;

    _sortList(_data);

    // clean data
    $countryList.html('');

    d.forEach(function(obj){
      var t = template
                        .replace(/{{id}}/ig, obj.name.toLowerCase())
                        .replace(/{{name}}/ig, obj.name)
                        .replace(/{{count}}/ig, obj.count)
                        .replace(/{{content}}/ig, obj.content)
      total = total + t;
    });

    $countryList.append(total);
  }

  function _sortList(data) {
    return data.sort(function(a,b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
  }

  return {
    render: render
  };

})();
*/
