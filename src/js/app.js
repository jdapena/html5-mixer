import Mustache from 'mustache';
import { audiomixer } from 'agl-js-api';
import { setValue } from './sliders';

var template;

function render_sliders(sliders) {
    var sliderContainer = document.getElementById('SliderContainer');
    for( var i=0; i<sliders.length; i++) {
        var node = Mustache.render(template, sliders[i]);
        sliderContainer.innerHTML += node;
    }
}

export function init() {
    template = document.getElementById('slider-template').innerHTML;
    Mustache.parse(template);

    audiomixer.list_controls().then(function(result) {
        var sliders =  [];
       for( var i=0; i<result.length; i++) {
            sliders.push({
                id: result[i].control,
                name: result[i].control,
                value: Math.floor(result[i].volume*100)
            });
        }

        render_sliders(sliders);
    }).catch(function(error) {
        console.error('ERROR loading sliders', error);
    });

    audiomixer.on_volume_changed(function(data){
        setValue(document.getElementById("slider-"+data.control), Math.ceil(data.value*100), true);
    }).then(function(result) {
        console.log("SUBSCRIBED TO VOLUME CHANGED");
    });
}