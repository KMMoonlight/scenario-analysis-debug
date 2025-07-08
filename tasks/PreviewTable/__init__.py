from oocana import Context
import pandas as pd
#region generated meta
import typing
class Inputs(typing.TypedDict):
    rows: list[typing.Any]
class Outputs(typing.TypedDict):
    rows: list[list[typing.Any]]
#endregion

def main(params: Inputs, context: Context) -> Outputs:
    rows = params.get('rows', [])
    df = pd.DataFrame(rows)
    context.preview(df)
    return { "rows": rows }
