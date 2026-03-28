import {
  registerWidgets,
  setWidgetUrlBuilder,
  type WidgetMetadata,
} from 'widget-atlas';
import 'widget-atlas/elements';
import { setWidgetUsageData } from 'widget-atlas/usage-data';

const widgets: WidgetMetadata[] = [
  {
    tag: 'scratch-button',
    name: 'Scratch Button',
    description: 'Smoke-test widget registered from an external consumer.',
    category: 'atoms',
    useCase: 'buttons',
    level: 'atom',
    status: 'stable',
    properties: [],
    events: [],
    slots: [],
    cssProperties: [],
    parts: [],
    examples: [
      {
        id: 'default',
        title: 'Default',
        code: '<scratch-button>Click</scratch-button>',
      },
    ],
  },
];

registerWidgets(widgets, { duplicatePolicy: 'overwrite' });
setWidgetUrlBuilder(({ tag }) => `#/${tag}`);
setWidgetUsageData({
  'scratch-button': ['scratch-consumer/index.html'],
});
