import dva from 'dva';
import { browserHistory } from 'dva/router';

const app = dva({
  history: browserHistory,
});

app.use({});

app.model(require('./models/login'));
app.model(require('./models/articles'));
app.model(require('./models/categories'));
app.model(require('./models/tags'));
app.model(require('./models/properties'));
app.model(require('./models/redirections'));

app.router(require('./router'));

app.start('body');
