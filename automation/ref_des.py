import pandas as pd

# Read the Excel file
df = pd.read_excel('REF DES Listing.xlsx')  # Replace with your file path

# Begin the HTML table
html_table = '<table>\n'

# Add the header row
html_table += '  <tr>\n'
for col in df.columns:
    html_table += f'    <th class="center-text">{col}</th>\n'
html_table += '  </tr>\n'

# Add the data rows
for index, row in df.iterrows():
    html_table += '  <tr>\n'
    for col in df.columns:
        # Check if the cell is empty or not
        cell_value = row[col] if not pd.isnull(row[col]) else ''
        # Apply center-text class to each cell
        html_table += f'    <td class="center-text">{cell_value}</td>\n'
    html_table += '  </tr>\n'

# Close the table tag
html_table += '</table>'

# Print or save the HTML table
print(html_table)
# Or save to a file
# with open('output.html', 'w') as file:
#     file.write(html_table)
