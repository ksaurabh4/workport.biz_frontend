import React from 'react';
import { PropTypes } from 'prop-types';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import { useSelector } from 'react-redux';
import Auth from './Auth';
import Application from './Application';
import LandingCorporate from './Landing';
import LandingCreative from './LandingCreative';
import ArticleNews from './ArticleNews';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LandingCorporate} />
          <Route path="/landing-creative" exact component={LandingCreative} />
          <Route path="/blog" component={ArticleNews} />
          {loggedIn ? (
            <>
              <Route path="/app" component={Application} />
              <Route
                path="/login"
                exact
                render={() => <Redirect to={'/app'} />}
              // component={Auth}
              />
            </>
          ) : (
            <>
              <Route
                path="/app"
                exact
                render={() => <Redirect to={'/login'} />}
              // component={Auth}
              />
              <Route path="/login" component={Auth} />
            </>
          )
          }
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
