import 'ui/angular-bootstrap';
import 'plugins/kibana-carousel-plugin/lib/angular-bootstrap/css/bootstrap-theme.css';
import 'plugins/kibana-carousel-plugin/lib/angular-bootstrap/css/carousel.css';
import 'plugins/kibana-carousel-plugin/lib/angular-bootstrap/js/carousel.js';
import 'plugins/kibana-carousel-plugin/lib/bootstrap-addons/dist/css/bootstrap-addons.css';
import 'plugins/kibana-carousel-plugin/lib/bootstrap-addons/dist/js/bootstrap-addons.js';
import 'plugins/kibana-carousel-plugin/carousel.less';
import 'plugins/kibana-carousel-plugin/carouselController';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import visTemplate from 'plugins/kibana-carousel-plugin/carousel.html';
import optionsTemplate from 'plugins/kibana-carousel-plugin/carouselOptions.html';

require('ui/registry/vis_types').register(CarouselVisProvider);

  function CarouselVisProvider(Private) {
    const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    
    return new TemplateVisType({
      name: 'carousel',
      title: 'Carousel Widget',
      icon: 'fa-circle-o-notch',
      description: 'Display results in a carousel.',
      template: visTemplate,
      params: {
          editor: optionsTemplate,
          defaults: {
              enable_quick: true,
              enable_relative: true,
              enable_absolut: true,
              enable_animation: true,
          }
      },
      requiresSearch: false
    });
  }

export default CarouselVisProvider;
