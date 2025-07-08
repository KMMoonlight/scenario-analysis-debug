from oocana import Context
import requests
#region generated meta
import typing
class Inputs(typing.TypedDict):
    Cookie: str
    use_upload_file: bool
    upload_file_path: str
class Outputs(typing.TypedDict):
    result: typing.Any
#endregion

def main(params: Inputs, context: Context) -> Outputs:

    use_local_file = params.get('use_upload_file', False)
    local_file_path = params.get('upload_file_path', '')
    if use_local_file:
        with open(local_file_path, 'r') as f:
            data = f.read()
            result = {
                "code": "success",
                "data": data
            }

        

    Headers = {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        "Cookie": params.get('Cookie', '')
    }

    r = requests.get('https://cam.cammaster.org/api/v1/eodrisk/scenario-analysis/generate-indicators', headers=Headers)

    result = None
    if r.status_code == 200:
        result = {
            "code": "success",
            "data": r.json()
        }
    else:
        result = {
            "code": "error",
            "message": "Request Error"
        }

    return { "result": result }
