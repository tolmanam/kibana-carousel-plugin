import 'plugins/kibana-carousel-plugin/carousel.less';
import 'plugins/kibana-carousel-plugin/carouselController';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import visTemplate from 'plugins/kibana-carousel-plugin/carousel.html';
import optionsTemplate from 'plugins/kibana-carousel-plugin/carouselOptions.html';
import VisSchemasProvider from 'ui/vis/schemas';

require('ui/registry/vis_types').register(CarouselVisProvider);

  function CarouselVisProvider(Private) {
    const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);

    return new TemplateVisType({
      name: 'carousel',
      title: 'Carousel Widget',
      icon: 'fa-circle-o-notch',
      description: 'Display results in a carousel.',
      template: visTemplate,
      params: {
          editor: optionsTemplate,
          defaults: {
              titleField: null,
              descField: null,
              contentField: null,
              contentType: 'video',
              maxSlides: 15 
          },
          contentTypes: ['image', 'video', 'audio']
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Value',
          min: 1,
          max: 1,
          aggFilter: ['count'],
          defaults: [
            { schema: 'metric', type: 'count' }
          ]
        }
      ]),
      requiresSearch: true
    });
  }

export default CarouselVisProvider;
