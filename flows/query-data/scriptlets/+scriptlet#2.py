from oocana import Context, preview
import json
import pandas as pd
from pathlib import Path

#region generated meta
import typing
class Inputs(typing.TypedDict):
    result: typing.Any
    row: float
    column: float
class Outputs(typing.TypedDict):
    equity_rows: list[typing.Any]
    contrib_rows: list[typing.Any]
    pnl_rows: list[typing.Any]
    greeks_rows: list[typing.Any]
#endregion

def main(params: Inputs, context: Context) -> Outputs:
    row = params.get('row',0)
    column = params.get('column', 0)
    asset_info_list = []
    position_info_list = []
    
    if params['result']['code'] == 'success':
        data = params['result']['data']['data']
        for row_index, item in enumerate(data['scenario_result']):
            for column_index, cell in enumerate(item.get('resource_scenario_result', [])):
                if row_index == row and column_index == column:
                    debug_info = cell.get('debug_info', {})
                    asset_info_list = json.loads(debug_info.get('asset_info', ''))
                    if not asset_info_list:
                        asset_info_list = []
                    position_info_list = json.loads(debug_info.get('position_info', ''))
                    if not position_info_list:
                        position_info_list = []
    
    equity_rows = []
    contrib_rows = []
    
    for item in asset_info_list:
        base_fields = {k: v for k, v in item.items() if k != "contribute_pnl_info"}
        equity_rows.append(base_fields)

        if isinstance(item.get("contribute_pnl_info"), list):
            for contrib in item["contribute_pnl_info"]:
                contrib_rows.append({
                    "underlying": item.get("underlying", ""),
                    "productID": contrib.get("ProductID", ""),
                    "coinUPnl": contrib.get("CoinUPnl", ""),
                    "coinRPnl": contrib.get("CoinRPnl", "")
                })

    pnl_rows = []
    greeks_rows = []

    for pos in position_info_list:
        symbol = pos.get("product_id", "")
        pnl_info = pos.get("pnl_info", {}).get("PnlInfo", {})
        detail_info = pos.get("pnl_info", {}).get("DetailInfo", {})
        greeks_info = pos.get("greeks_info", {})

        # 写入 pnl_info.csv
        row = {"symbol": symbol, **pnl_info, **detail_info, **greeks_info}
        pnl_rows.append(row)

        # 写入 greeks_info.csv
        greek_row = {"symbol": symbol}
        greek_row.update(greeks_info)
        greeks_rows.append(greek_row)

    
    # if equity_rows:
    #     df_equity = pd.DataFrame(equity_rows)
    
    # if contrib_rows:
    #     df_contrib = pd.DataFrame(contrib_rows)

    # if pnl_rows:
    #     df_pnl = pd.DataFrame(pnl_rows)
    
    # if greeks_rows:
    #     df_greek = pd.DataFrame(greeks_rows)
    #     context.preview(df_greek)
    return {
        "equity_rows": equity_rows,
        "contrib_rows": contrib_rows,
        "pnl_rows": pnl_rows,
        "greeks_rows": greeks_rows
    }




