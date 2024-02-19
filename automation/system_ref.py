import pandas as pd

# Load the Excel file
df = pd.read_excel('your_file.xlsx')

# Function to check if the REF DES indicates a section header
def is_section_header(ref_des):
    return isinstance(ref_des, int) and ref_des % 100 == 0

# Function to process each row and generate HTML
def process_row(row):
    html = ''
    # Check if this row is a section header
    if is_section_header(row['REF DES']):
        # Create a section header row with REF DES number and header spanning 12 columns
        html += '<tr>\n'
        html += f'    <td>{row["REF DES"]}</td>\n'
        html += '    <td class="section-header" colspan="12">{}</td>\n'.format(row['Item/System'])
        html += '</tr>\n'
    else:
        # Start a normal row
        html += '<tr>\n'
        for index, item in row.iteritems():
            # Skip 'REF DES' if it's a section header
            if index == 'REF DES' and is_section_header(item):
                continue
            # Add class for center-text for all but 'Item/System' and 'Notes'
            class_attr = '' if index in ['Item/System', 'Notes'] else ' class="center-text"'
            value = item if pd.notnull(item) else ""
            html += f'    <td{class_attr}>{value}</td>\n'
        html += '</tr>\n'
    return html

# Generate the HTML for each row
html_rows = [process_row(row) for index, row in df.iterrows()]

# Combine all rows into a single string
complete_html = ''.join(html_rows)

print(complete_html)
