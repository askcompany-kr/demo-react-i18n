from pathlib import Path
import pandas as pd

COLUMNS = ['id', 'ko', 'en', 'zh-cn']

EXCEL_PATH = Path("translations.xlsx")

INITIAL_DATA = [
    { 'id': 'hello', 'ko': '안녕하세요', 'en': 'Hello', 'zh-cn': '你好' },
]


def main():
    df = pd.DataFrame(INITIAL_DATA)
    df = df[COLUMNS]
    df.to_excel(EXCEL_PATH, index=False)

    print(f"Created {excel_path}.")


if __name__ == '__main__':
    main()
