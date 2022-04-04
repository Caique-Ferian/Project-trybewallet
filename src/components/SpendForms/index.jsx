import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyExchange } from '../../reducers/wallet';
import { addSpendAction } from '../../actions';

class SpendForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spendValue: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatchFetchCurrencyExchange } = this.props;
    dispatchFetchCurrencyExchange('key');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { spendValue, currency, payment, tag, description } = this.state;
    const { dispatchFetchCurrencyExchange } = this.props;
    await dispatchFetchCurrencyExchange();
    const { exchangeRates, dispatchSpend, expenses } = this.props;
    const object = {
      id: expenses.length,
      value: spendValue,
      description,
      currency,
      method: payment,
      tag,
      exchangeRates,
    };
    dispatchSpend(object);
    this.setState({ spendValue: '' });
  }

  render() {
    const { currencyExchange } = this.props;
    const paymentTypes = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagTypes = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { spendValue, currency, payment, tag, description } = this.state;
    return (
      <form onSubmit={ (e) => e.preventDefault() }>
        <label htmlFor="spend-value">
          Valor:
          <input
            id="spend-value"
            name="spendValue"
            onChange={ this.handleChange }
            type="number"
            data-testid="value-input"
            value={ spendValue }
          />
        </label>
        <label htmlFor="currency-type">
          Moeda:
          <select
            id="currency-type"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencyExchange?.map((element, index) => (
              <option
                key={ index }
              >
                {element}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payment-type">
          Método de pagamento:
          <select
            id="payment-type"
            data-testid="method-input"
            value={ payment }
            name="payment"
            onChange={ this.handleChange }

          >
            {paymentTypes.map((types, index) => (
              <option
                key={ index }
              >
                {types}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag-type">
          Tag:
          <select
            id="tag-type"
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            {tagTypes.map((tagType, index) => (
              <option
                key={ index }
              >
                {tagType}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="spend-description">
          Descrição:
          <input
            id="spend-description"
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencyExchange: state.wallet.currencies,
  exchangeRates: state.wallet.apiResult,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencyExchange: (type = 'all') => dispatch(fetchCurrencyExchange(type)),
  dispatchSpend: (spend) => dispatch(addSpendAction(spend)),
});
SpendForms.propTypes = {
  dispatchFetchCurrencyExchange: PropTypes.func,
  currencyExchange: PropTypes.arrayOf(PropTypes.string),
  exchangeRates: PropTypes.object,
  dispatchSpend: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(SpendForms);
