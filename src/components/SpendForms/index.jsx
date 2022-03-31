import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyExchange } from '../../reducers/wallet';

class SpendForms extends React.Component {
  componentDidMount() {
    const { dispatchFetchCurrencyExchange } = this.props;
    dispatchFetchCurrencyExchange();
  }

  render() {
    const { currencyExchange } = this.props;
    const paymentTypes = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagTypes = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="spend-value">
          Valor:
          <input id="spend-value" type="text" data-testid="value-input" />
        </label>
        <label htmlFor="currency-type">
          Moeda:
          <select id="currency-type">
            {currencyExchange?.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment-type">
          Método de pagamento:
          <select id="payment-type" data-testid="method-input">
            {paymentTypes.map((payment, index) => (
              <option key={ index } value={ payment }>{payment}</option>
            ))}
          </select>
        </label>
        <label htmlFor="tag-type">
          Tag:
          <select id="tag-type" data-testid="tag-input">
            {tagTypes.map((tag, index) => (
              <option key={ index } value={ tag }>{tag}</option>
            ))}
          </select>
        </label>
        <label htmlFor="spend-description">
          Descrição:
          <input id="spend-description" type="text" data-testid="description-input" />
        </label>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencyExchange: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencyExchange: () => dispatch(fetchCurrencyExchange()),
});
SpendForms.propTypes = {
  dispatchFetchCurrencyExchange: PropTypes.func,
  currencyExchange: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(SpendForms);
