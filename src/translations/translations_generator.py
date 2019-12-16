import json
import pandas as pd
from pathlib import Path
from translations_init import COLUMNS, EXCEL_PATH


def main():
    df = pd.read_excel(EXCEL_PATH, index_col='id')
    for column_name in df.columns:
        obj = df[column_name].to_dict()
        json_string = json.dumps(obj, ensure_ascii=False, indent=4)
        json_path = Path(f'{column_name}.json')
        print(f'Creating {json_path} ...')
        json_path.write_text(json_string)


if __name__ == '__main__':
    main()
