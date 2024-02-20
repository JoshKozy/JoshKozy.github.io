import pandas as pd

# Load the Excel file
excel_file_path = 'REF DES Listing.xlsx'
df_excel = pd.read_excel(excel_file_path)

# Convert to JSON
json_file_path_excel = 'excel_data.json'
df_excel.to_json(json_file_path_excel, orient='records')

print(f"Excel data has been converted to JSON and saved to {json_file_path_excel}")
