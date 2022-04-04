import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header(props) {
  const { email, expenses } = props;
  const ZERO = 0;
  const totalSpendValue = expenses
    .reduce((acc, { value, currency, exchangeRates }) => acc
    + (parseInt(value, 10) * exchangeRates[currency].ask), 0);
  return (
    <div>
      <h4 data-testid="email-field">{email}</h4>
      <span>Despesa total: </span>
      <span
        data-testid="total-field"
      >
        {totalSpendValue ? totalSpendValue?.toFixed(2) : ZERO}

      </span>
      <span data-testid="header-currency-field">BRL</span>
    </div>
  );
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Header);
