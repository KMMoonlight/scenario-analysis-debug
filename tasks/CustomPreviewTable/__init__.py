from oocana import Context

#region generated meta
import typing
class Inputs(typing.TypedDict):
    equity_rows: list[typing.Any]
    contrib_rows: list[typing.Any]
    pnl_rows: list[typing.Any]
    greeks_rows: list[typing.Any]
    column: float
    row: float
class Outputs(typing.TypedDict):
    equity_rows: list[typing.Any]
    contrib_rows: list[typing.Any]
    pnl_rows: list[typing.Any]
    greeks_rows: list[typing.Any]
    column: float
    row: float
#endregion

def main(params: Inputs, context: Context) -> Outputs:

    equity_rows = params.get('equity_rows', [])
    contrib_rows = params.get('contrib_rows', [])
    pnl_rows = params.get('pnl_rows', [])
    greeks_rows = params.get('greeks_rows', [])
    row = params.get('row', 0)
    column = params.get('column', 0)

    context.send_message({
        "equity_rows": equity_rows,
        "contrib_rows": contrib_rows,
        "pnl_rows": pnl_rows,
        "greeks_rows": greeks_rows
    })

    return { 
        "equity_rows": equity_rows,
        "contrib_rows": contrib_rows,
        "pnl_rows": pnl_rows,
        "greeks_rows": greeks_rows,
        "column": column,
        "row": row
     }
