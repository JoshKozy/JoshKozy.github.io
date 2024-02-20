import json

# Function to load JSON data from a file
def load_json(filename):
    with open(filename, 'r') as file:
        return json.load(file)

# Load data from all files
hyd_data = load_json('Hyd.json')
ref_des_data = load_json('Ref_Des.json')
mesl_data = load_json('MESL.json')  # Load MESL data

# Initialize an empty list for the combined index
combined_index = []

# Process Hyd.json data
for item in hyd_data:
    if item['System']:
        keywords = [item['System']]
        combined_index.append({
            "keywords": keywords,
            "info": f"{item['System']}",
            "page": "Hyd_Sys.html"  # Assuming a specific page for hydraulic systems
        })

# Process Ref_Des.json data
for item in ref_des_data:
    keywords = [item['Nomenclature']]
    if item['REF DES #']:
        keywords.append(item['REF DES #'])
    combined_index.append({
        "keywords": keywords,
        "info": f"{item['Nomenclature']}, REF DES #{item['REF DES #']}",
        "page": "Ref_Des.html"  # Assuming a specific page for reference designations
    })

# Process MESL.json data
for item in mesl_data:
    if item['Item/System']:
        keywords = [item['Item/System']]
        if item['REF DES']:
            keywords.append(str(item['REF DES']))
        combined_index.append({
            "keywords": keywords,
            "info": f"{item['Item/System']}, REF DES {item.get('REF DES', 'N/A')}",
            "page": "MESL.html"  # Assuming a specific page for MESL items
        })

# Save the combined index to a new JSON file
with open('combined_index.json', 'w') as file:
    json.dump({"index": combined_index}, file, indent=2)

print("Combined index generated successfully.")
