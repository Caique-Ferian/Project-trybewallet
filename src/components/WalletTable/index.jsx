import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSpendToEditAction, removeSpendAction } from '../../actions';

class WalletTable extends Component {
  handleClickRemove = (id) => {
    const { dispatchRemoveSpend } = this.props;
    dispatchRemoveSpend(id);
  }

  handleClickEdit = (id) => {
    const { dispatchSpendToEdit } = this.props;
    dispatchSpendToEdit(id);
  }

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
                <td>
                  {
                    (spend.value * spend.exchangeRates[spend.currency].ask).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(spend.id) }
                    type="button"
                  >
                    Editar

                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickRemove(spend.id) }
                    type="button"
                  >
                    Excluir

                  </button>
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
const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveSpend: (spendId) => dispatch(removeSpendAction(spendId)),
  dispatchSpendToEdit: (spendId) => dispatch(addSpendToEditAction(spendId)),
});
WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  dispatchRemoveSpend: PropTypes.func,
  dispatchSpendToEdit: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
