import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>

              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((spend) => (
              <tr key={ spend.id }>
                <td>{spend.description}</td>
                <td>{spend.tag}</td>
                <td>{spend.method}</td>
                <td>{parseFloat(spend.value).toFixed(2)}</td>
                <td>{spend.exchangeRates[spend.currency].name}</td>
                <td>
                  {parseFloat(spend.exchangeRates[spend.currency].ask)
                    .toFixed(2)}
                </td>
                <td>{(spend.value * spend.exchangeRates[spend.currency].ask)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
export default connect(mapStateToProps)(WalletTable);
