from oocana import Context
import pandas as pd
from pathlib import Path

#region generated meta
import typing
class Inputs(typing.TypedDict):
    equity_valuation_rows: list[typing.Any]
    save_path: str
    equity_valuation_by_contrib_rows: list[typing.Any]
    pnl_info_rows: list[typing.Any]
    greeks_info_rows: list[typing.Any]
    column: float
    row: float
Outputs = typing.Dict[str, typing.Any]
#endregion

def main(params: Inputs, context: Context) -> Outputs:
    output_dir = Path(params.get('save_path', ''))
    output_dir.mkdir(exist_ok=True)

    equity_valuation_rows = params.get('equity_valuation_rows', [])
    equity_valuation_by_contrib_rows = params.get('equity_valuation_by_contrib_rows', [])
    pnl_info_rows = params.get('pnl_info_rows', [])
    greeks_info_rows = params.get('greeks_info_rows', [])

    print(params.get('row', 0))
    print(params.get('column', 0))

    output_file_name = 'output_' +  str(params.get('row', 0)) + '_' + str(params.get('column', 0)) + '.xlsx'

    df_equity = pd.DataFrame(equity_valuation_rows)
    df_contrib = pd.DataFrame(equity_valuation_by_contrib_rows)
    df_pnl = pd.DataFrame(pnl_info_rows)
    df_greeks = pd.DataFrame(data=greeks_info_rows)

    with pd.ExcelWriter(output_dir / output_file_name, mode='w', engine='openpyxl') as writer:
        df_equity.to_excel(writer, sheet_name='Equity Valuation', index=False)
        df_contrib.to_excel(writer, sheet_name='Equity Valuation By Contrib', index=False)
        df_pnl.to_excel(writer, sheet_name='PnL Info', index=False)
        df_greeks.to_excel(writer, sheet_name='Greeks Info', index=False)






