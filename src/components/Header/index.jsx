import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header(props) {
  const { email } = props;
  const ZERO = 0;
  return (
    <div>
      <h4 data-testid="email-field">{email}</h4>
      <span data-testid="total-field">{`Despesa total: ${ZERO} `}</span>
      <span data-testid="header-currency-field">BRL</span>
    </div>
  );
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});
Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
