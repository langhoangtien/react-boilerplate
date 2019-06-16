/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import List from 'components/ListEdit';
import ReorderTable from 'components/ReorderTable';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername, changeName } from './actions';
import { makeSelectUsername, makeSelectHome } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
  home,
  handleChangeName,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [rows, setRows] = React.useState([
    {
      email: 'phuong@gmail.com',
      phone: '098766633',
      name: 'Phuong',
      cost: '5200',
    },
    {
      email: 'thanhphuong@gmail.com',
      phone: '0987666433',
      name: 'PhuongPt',
      cost: '8200',
    },
  ]);
  const columns = React.useState([
    { title: 'Email', name: 'email', order: 3 },
    { title: 'Phone', name: 'phone', order: 2, type: 'number' },
    { title: 'Name', name: 'name', order: 1 },
    { title: 'Cost', name: 'cost', order: 4, type: 'number' },
  ])[0];
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  function handleChange(name, value, id) {
    const newRow = [...rows];
    newRow[id] = { ...rows[id], [name]: value };
    setRows(newRow);
  }

  function addRow() {
    const row = {
      email: '',
      phone: '',
      name: '',
      cost: '',
    };
    const newRow = rows.concat(row);
    setRows(newRow);
  }
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
            <div>
              <label htmlFor="name">Name:</label>
              <Input
                onChange={handleChangeName('name')}
                value={home.name}
                name="name"
              />
            </div>
            <div>
              {' '}
              <label htmlFor="name">
                Email:
                <Input
                  onChange={handleChangeName('email')}
                  value={home.email}
                  name="email"
                />
              </label>
            </div>
            <button type="submit">Get github repositories</button>

            <Fab onClick={addRow} color="primary" size="small">
              <Add />
            </Fab>

            <List handleChange={handleChange} columns={columns} rows={rows} />
            <ReorderTable rows={rows} columnsPr={columns} />
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  home: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  handleChangeName: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  home: makeSelectHome(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    handleChangeName: name => event =>
      dispatch(changeName({ name, value: event.target.value })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
