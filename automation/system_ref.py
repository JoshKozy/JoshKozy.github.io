import pandas as pd

# Load the Excel file
df = pd.read_excel('your_file.xlsx')

# Function to check if the REF DES indicates a section header
def is_section_header(ref_des):
    return isinstance(ref_des, int) and ref_des % 100 == 0

# Function to process each row and generate HTML
def process_row(row):
    html = '<tr>\n'
    # Check if this row is a section header
    if is_section_header(row['REF DES']):
        # The section header spans 12 columns, adjust as needed
        html += '    <td class="section-header" colspan="12">{}</td>\n'.format(row['Item/System'])
    else:
        # Normal cells
        for index, item in row.iteritems():
            # Add class for center-text where needed, and handle missing data
            class_attr = ' class="center-text"' if pd.notnull(item) and index in ["Installed", "HSD", "ERD", "REQ FULL SYSTEM LIST (FSL)"] else ""
            value = item if pd.notnull(item) else ""
            html += f'    <td{class_attr}>{value}</td>\n'
    html += '</tr>\n'
    return html

# Generate the HTML for each row
html_rows = df.apply(process_row, axis=1)

# Combine all rows into a single string
complete_html = ''.join(html_rows)

print(complete_html)
